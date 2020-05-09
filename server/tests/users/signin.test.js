import Test from '../utils';

const {
  createEmailVarChar,
  createVarChars, returnRandomValue,
} = Test;
const { request, app, userSeeds } = new Test();

describe('Test endpoints at "/api/v1/auth/signin" to sign in a User with POST', () => {
  it('Should signin in a User at "/api/v1/auth/signin" with POST if all request inputs are valid', (done) => {
    const testData = {
      user: returnRandomValue(userSeeds[0].email, userSeeds[0].username),
      password: 'password one',
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(testData)
      .then(({ header: { token }, body: { data }, status }) => {
        expect(status).toBeNumber().toEqual(200);
        expect(token).toBeString();
        expect(data).toBeObject().toContainKeys(['id', 'fullName', 'username', 'email', 'type', 'createdOn', 'token']);
        expect(data.id).toBeString();
        expect(data.fullName).toBeString();
        expect(data.username).toBeString();
        expect(data.email).toBeString();
        expect(data.token).toBeString();
        expect(data.type).toBeString().toEqual('Client');
        expect(data.createdOn).toBeString();
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signin" if user and password are empty strings', (done) => {
    const testData = {
      user: '',
      password: '',
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeArray().toIncludeAnyMembers(['Please enter your username or email', 'Please enter your password']);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signin" if user and password are falsy values', (done) => {
    const testData = {
      user: returnRandomValue(undefined, null),
      password: returnRandomValue(undefined, null),
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeArray().toIncludeAnyMembers(['Username or email is required', 'Password is required']);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signin" if user and password are not strings', (done) => {
    const testData = {
      user: returnRandomValue(878, NaN),
      password: returnRandomValue(444, NaN),
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeArray().toIncludeAnyMembers(['Username or email must be data type', 'Password must be string data type']);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signin" if username or email is more than 256 characters long', (done) => {
    const testData = {
      user: createVarChars(300),
      password: userSeeds[0].password,
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeArray().toIncludeAnyMembers(['Username or email must be at most 256 characters long']);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signin" if username or email has not been registered ', (done) => {
    const testData = {
      user: returnRandomValue(createVarChars(10), createEmailVarChar(10, 5)),
      password: userSeeds[0].password,
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(404);
        expect(error).toBeString().toEqual('User not registered, please signup');
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signin" if password does not match user', (done) => {
    const testData = {
      user: returnRandomValue(userSeeds[0].username, userSeeds[0].email),
      password: createVarChars(10),
    };
    request(app)
      .post('/api/v1/auth/signin')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeString().toEqual('Password does not match user');
        done();
      });
  });
});
