import {
  Model, DataTypes, Sequelize, Op,
} from 'sequelize';
import validator from 'validator';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from '../configs/env';
import CustomErrs from '../errors/custom';

const { herokuPostgresURL, postgresURL, jwtSecret } = env;
const sequelize = new Sequelize(herokuPostgresURL || postgresURL, { dialect: 'postgres' });

class User extends Model {
  static async hashString(password = '') {
    try {
      const salt = await bcrypt.genSalt(12);
      const encrypted = await bcrypt.hash(password, salt);
      return encrypted;
    } catch (error) {
      return error;
    }
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

  static authUser() {
    return Joi.object({
      token: Joi.string().required().empty().custom(this.checkToken, 'Validate token')
        .messages({
          'string.base': 'Token must be string type',
          'string.empty': 'Please include a valid token with this request',
          'any.required': 'Token is required',
        }),
      user: Joi.string().required().empty().max(256)
        .messages({
          'string.base': 'Username or email must be string type',
          'string.empty': 'Username or email provided is empty, lease signin or signup',
          'any.required': 'Username or email is required',
          'string.max': 'Username or email must be at most {#limit} characters long',
        }),
      password: Joi.string().required().empty().max(256)
        .messages({
          'string.base': 'Password or email must be string type',
          'string.empty': 'Please enter your password',
          'any.required': 'Username or email is required',
        }),
    }).without('token', ['user', 'password'])
      .messages({ 'object.without': 'Sending request with both token and signin credentials is not allowed' });
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
      checkLength(val) {
        if (!validator.isLength(val, { max: 256 })) throw new Error(`Full name at ${val} must not exceed 256`);
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
      checkLength(val) {
        if (!validator.isLength(val, { max: 256 })) throw new Error(`Username at ${val} must not exceed 256`);
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
      checkLength(val) {
        if (!validator.isLength(val, { max: 256 })) throw new Error(`Email at ${val} must not exceed 256`);
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
    type: DataTypes.STRING,
    defaultValue: 'Client',
    validate: {
      isIn: {
        args: [['Client', 'Admin']],
        msg: 'User type must be Client or Admin',
      },
    },
  },
},
{
  hooks: {
    beforeCreate: async (user, options) => {
      const placeholder = user;
      const userExists = await User.findOne({
        where: {
          [Op.or]: [{ email: user.email }, { username: user.username }],
        },
        transaction: options.transaction,
      });
      if (userExists) throw new CustomErrs(404, 'User with provided email or username already exists, please signin or signup with another email/username');
      placeholder.password = await User.hashString(user.password);
    },
    afterCreate: (user) => {
      const placeholder = user;
      placeholder.token = User.generate(user);
      placeholder.createdOn = Date(user.createdAt);
    },
  },
  sequelize,
  modelName: 'User',
});

(async () => { await User.sync({ force: true, match: /mydiary/ }); })();

export default User;
