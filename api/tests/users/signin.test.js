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

  /*
  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email or username is a falsy value', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: '456789Lovely',
    };
    testData.user = returnRandomValue(undefined, '', null, NaN, 0);
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email or username is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email or username over 128 characters', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: '456789Lovely!',
    };
    testData.user = returnRandomValue(createEmailVarChar(200, 10), createVarChars(200));
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email or username must be less than 128 characters');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email or username is not sent in request', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: '456789Lovely',
    };
    delete testData.user;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email or username is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email or username has not been registered', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: '456789Lovely',
    };
    testData.user = returnRandomValue(createEmailVarChar(20, 10), createVarChars(10));
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User does not exist, user should please sign up');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is a falsy value', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: '456789Lovely',
    };
    testData.password = returnRandomValue(undefined, '', null, NaN, 0);
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is not sent in request', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: '456789Lovely',
    };
    delete testData.password;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is not a minimum of 8 characters and a maximum of 128', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: '456789Lovely',
    };
    testData.password = returnRandomValue(createVarChars(3), createVarChars(300));
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, 128 characters maximum');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not not match with input password', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: '456789Lovely',
    };
    testData.password = createVarChars(34);
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password does not match user');
  });
  */
});
