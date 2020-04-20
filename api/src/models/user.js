import {
  Model, DataTypes, Sequelize,
} from 'sequelize';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Joi from '@hapi/joi';
import env from '../configs/env';
import CustomErrs from '../errors/custom';

const { herokuPostgresURL, postgresURL, jwtSecret } = env;
const sequelize = new Sequelize(herokuPostgresURL || postgresURL, { dialect: 'postgres' });

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
    }, jwtSecret, {
      expiresIn: 24 * 60 * 60,
    });
  }

  static verify(headers, next) {
    return jwt.verify(headers.token, jwtSecret,
      (err, { userId }) => {
        if (err) next(err);
        else {
          const headerPlaceholder = headers;
          headerPlaceholder.userId = userId;
        }
      });
  }

  static checkToken(value) {
    if (!validator.isJWT(value)) throw new Error('Token provided does not match Json Web Token format');
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
      if (emailExists) throw new CustomErrs(400, `User with ${user.email} already exists, please signup with another email`);
      const usernameExists = await User.findOne({
        where: {
          username: user.username,
        },
        transaction: options.transaction,
      });
      if (usernameExists) throw new CustomErrs(400, `User with ${user.username} already exists, please signup with another email`);
      const placeholder = user;
      placeholder.password = await User.hashString(user.password);
    },
    afterCreate: (user) => {
      const placeholder = user;
      placeholder.token = User.generate(user);
    },
  },
  sequelize,
  modelName: 'User',
});

const authSchema = Joi.object({
  user: Joi.string().required().empty().max(256)
    .messages({
      'string.base': 'Username or email must be string type',
      'string.empty': 'Username or email provided is empty, please signin or signup',
      'any.required': 'Username or email is required',
      'string.max': 'Username or email must be at most {#limit} characters long',
    }),
  password: Joi.string().required().empty()
    .messages({
      'string.base': 'Password must be string type',
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

(async () => { await User.sync({ force: true, match: /mydiary/ }); })();

export {
  User, authSchema, authToken,
};
