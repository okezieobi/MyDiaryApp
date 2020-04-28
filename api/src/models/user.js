import {
  Model, DataTypes,
} from 'sequelize';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Joi from '@hapi/joi';
import sequelize from '../db/connect';
import CustomErrs from '../errors/custom';
import env from '../configs/env';

class User extends Model {
  static async hashString(password = '') {
    const salt = await bcrypt.genSalt(16);
    const encrypted = await bcrypt.hash(password, salt);
    return encrypted;
  }

  static async compareString(hashedPassword = '', password = '') {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  static generate(user) {
    return jwt.sign({
      userId: user.id,
    }, env.jwtSecret, {
      expiresIn: 24 * 60 * 60,
    });
  }

  static verify(token) {
    return jwt.verify(token, env.jwtSecret);
  }

  static checkToken(value) {
    if (!validator.isJWT(value)) throw new CustomErrs(400, 'Token provided does not match Json Web Token format');
    const { userId } = User.verify(value);
    if (!validator.isUUID(userId, 4)) throw new CustomErrs(400, 'Id from token does not match UUIDv4');
  }

  static prepareResponse({
    id, fullName, username, email, type, createdAt,
  }) {
    return {
      id,
      fullName,
      username,
      email,
      type,
      status: 200,
      createdOn: Date(createdAt),
      token: this.generate(id),
    };
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING(256),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Full name is required',
      },
      len: {
        args: [1, 256],
        msg: 'Length of full name must be between 1 and 256 characters',
      },
      notEmpty: {
        msg: 'Please enter your full name',
      },
    },
  },
  username: {
    type: DataTypes.STRING(256),
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Username is required',
      },
      len: {
        args: [1, 256],
        msg: 'Length of username must be between 1 and 256 characters',
      },
      notEmpty: {
        msg: 'Please enter a username',
      },
    },
  },
  email: {
    type: DataTypes.STRING(256),
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Email is required',
      },
      len: {
        args: [1, 256],
        msg: 'Length of email must be between 1 and 256 characters',
      },
      isEmail: {
        msg: 'Input does not match email format',
      },
      notEmpty: {
        msg: 'Please enter an email',
      },
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password is required',
      },
      notEmpty: {
        msg: 'Please enter a password',
      },
    },
  },
  type: {
    type: DataTypes.TEXT,
    defaultValue: 'Client',
    validate: {
      isIn: {
        args: [['Client', 'Admin']],
        msg: 'User type must be Client or Admin',
      },
    },
  },
  createdOn: {
    type: DataTypes.VIRTUAL,
    get() {
      return Date(this.createdAt);
    },
  },
},
{
  hooks: {
    beforeCreate: async (user, options) => {
      const emailExists = await User.findOne({
        where: {
          email: user.email,
        },
        transaction: options.transaction,
      });
      const usernameExists = await User.findOne({
        where: {
          username: user.username,
        },
        transaction: options.transaction,
      });
      if (emailExists && !usernameExists) throw new CustomErrs(400, `User with ${user.email} already exists, please signup with another email`);
      else if (usernameExists && !emailExists) throw new CustomErrs(400, `User with ${user.username} already exists, please signup with another username`);
      else if (emailExists && usernameExists) throw new CustomErrs(400, `User(s) with ${user.email} and ${user.username} already exists, please signup with another email and username`);
      else {
        const placeholder = user;
        placeholder.password = await User.hashString(user.password);
      }
    },
    afterCreate: (user) => {
      const placeholder = user;
      placeholder.token = User.generate(user);
      placeholder.status = 201;
    },
  },
  sequelize,
  modelName: 'User',
  validate: {
    attributesAreString() {
      if (typeof this.fullName !== 'string') throw new Error('Full name provided must be string data type');
      else if (typeof this.username !== 'string') throw new Error('Username provided must be string data type');
      else if (typeof this.email !== 'string') throw new Error('Email provided must be string data type');
      else if (typeof this.password !== 'string') throw new Error('Password provided must be string data type');
    },
  },
});

const authSchema = Joi.object({
  user: Joi.string().required().empty().max(256)
    .messages({
      'string.base': 'Username or email must be string data type',
      'string.empty': 'Username or email provided is empty, please signin or signup',
      'any.required': 'Username or email is required',
      'string.max': 'Username or email must be at most {#limit} characters long',
    }),
  password: Joi.string().required().empty()
    .messages({
      'string.base': 'Password must be string data type',
      'string.empty': 'Please enter your password',
      'any.required': 'Password is required',
    }),
});

const authToken = Joi.object({
  token: Joi.string().required().empty().custom(User.checkToken, 'Validate token')
    .messages({
      'string.base': 'Token must be string type',
      'string.empty': 'Please include a valid token with this request',
      'any.required': 'Token is required',
    }),
});


export {
  User, authSchema, authToken,
};
