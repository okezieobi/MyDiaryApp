import Test from '../utils';

const {
  createEmailVarChar,
  createVarChars, returnRandomValue,
} = Test;
const { request, app, userSeeds } = new Test();

describe('Test endpoints at "/api/v1/auth/signup" to create a User with POST', () => {
  // jest.setTimeout(45000);
  /*
  afterAll(async () => {
    await deleteData();
    // setImmediate();
    // await new Promise((resolve) => setTimeout(() => resolve(), 2000));
  });
*/

  it('Should create a User at "/api/v1/auth/signup" with POST if all request inputs are valid', (done) => {
    const testData = {
      fullName: userSeeds[1].fullName,
      email: userSeeds[1].email,
      password: userSeeds[1].password,
      username: userSeeds[1].username,
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(testData)
      .then(({ header: { token }, body: { data }, status }) => {
        expect(status).toBeNumber().toEqual(201);
        expect(token).toBeString();
        expect(data).toBeObject().toContainKeys(['id', 'fullName', 'username', 'email', 'type', 'createdOn', 'token']);
        expect(data.id).toBeString();
        expect(data.fullName).toBeString().toEqual(testData.fullName);
        expect(data.username).toBeString().toEqual(testData.username);
        expect(data.email).toBeString().toEqual(testData.email);
        expect(data.token).toBeString();
        expect(data.type).toBeString().toEqual('Client');
        expect(data.createdOn).toBeString();
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username, fullName, email and password are empty', (done) => {
    const testData = {
      fullName: '',
      email: '',
      password: '',
      username: '',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeArray().toIncludeAnyMembers(['Please enter your full name', 'Please enter a username', 'Please enter an email', 'Please enter a password']);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username, fullName, email and password are null or undefined or NaN', (done) => {
    const testData = {
      fullName: returnRandomValue(null, undefined),
      email: returnRandomValue(null, undefined),
      password: returnRandomValue(null, undefined),
      username: returnRandomValue(null, undefined),
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeArray().toIncludeAnyMembers(['Full name is required', 'Username is required', 'Email is required', 'Password is required']);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username, fullName, email and password is not sent', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeArray().toIncludeAnyMembers(['Full name is required', 'Username is required', 'Email is required', 'Password is required']);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username, fullName and email are less 2 or more than 256 characters ', (done) => {
    const testData = {
      fullName: returnRandomValue(createVarChars(500), 'h'),
      email: returnRandomValue(createEmailVarChar(500, 5), 'h'),
      password: createVarChars(10),
      username: returnRandomValue(createVarChars(500), 'h'),
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeArray().toIncludeAnyMembers(['Length of full name must be between 1 and 256 characters', 'Length of username must be between 1 and 256 characters', 'Length of email must be between 1 and 256 characters']);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username, fullName, email and password are not string type', (done) => {
    const testData = {
      fullName: returnRandomValue(904),
      email: returnRandomValue(4499),
      password: returnRandomValue(9848484),
      username: returnRandomValue(40940494),
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeArray().toIncludeAnyMembers(['Full name provided must be string data type', 'Username provided must be string data type', 'Email provided must be string data type', 'Password provided must be string data type']);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username and email are already registered', (done) => {
    const testData = {
      fullName: 'Full name one',
      email: userSeeds[0].email,
      password: 'password one',
      username: userSeeds[0].username,
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeString().toEqual(`User(s) with ${testData.email} and ${testData.username} already exists, please signup with another email and username`);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if email are already registered', (done) => {
    const testData = {
      fullName: 'Full name one',
      email: userSeeds[0].email,
      password: 'password one',
      username: 'username one',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeString().toEqual(`User with ${testData.email} already exists, please signup with another email`);
        done();
      });
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is already registered', (done) => {
    const testData = {
      fullName: 'Full name one',
      email: 'email@email.com',
      password: 'password one',
      username: userSeeds[0].username,
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeString().toEqual(`User with ${testData.username} already exists, please signup with another username`);
        done();
      });
  });
});
