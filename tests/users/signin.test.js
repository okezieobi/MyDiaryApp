import {
  Test,
  expect,
  chai,
  chaiHttp,
  app,
} from '../index';

const {
  deleteData, addUsers, createEmailVarChar, createVarChars, returnRandomValue,
} = Test;

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/auth/signin" to sign in a User with POST', () => {
  before(async () => {
    await deleteData();
  });

  before(async () => {
    await addUsers();
  });

  after(async () => {
    await deleteData();
  });

  it('Should signin in a User at "/api/v1/auth/signin" with POST if all request inputs are valid', async () => {
    const data = { username: 'Obiedere', email: 'foobar@mail.com' };
    const testData = {
      user: returnRandomValue(data.email, data.username),
      password: '456789Lovely',
    };
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('string');
    expect(response.body.data).to.have.property('fullName').to.be.a('string');
    expect(response.body.data).to.have.property('username').to.be.a('string').to.equal(data.username);
    expect(response.body.data).to.have.property('email').to.be.a('string').to.equal(data.email);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Client');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.header).to.have.property('token').to.be.a('string');
  }).timeout(3000);

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
});
