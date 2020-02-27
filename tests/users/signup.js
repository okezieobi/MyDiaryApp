import {
  Test,
  expect,
  chai,
  chaiHttp,
  app,
} from '../index';

const {
  deleteData, createEmailVarChar, createVarChars, returnRandomValue,
} = Test;

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/auth/signup" to create a User with POST', () => {
  before('Delete data before tests', async () => {
    await deleteData();
  });

  after('Delete data after tests', async () => {
    await deleteData();
  });

  it('Should create a User at "/api/v1/auth/signup" with POST if all request inputs are valid', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('string');
    expect(response.body.data).to.have.property('fullName').to.be.a('string').to.equal(testData.fullName);
    expect(response.body.data).to.have.property('userName').to.be.a('string').to.equal(testData.username);
    expect(response.body.data).to.have.property('email').to.be.a('string').to.equal(testData.email);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Client');
    expect(response.body.data).to.have.property('createdOn').to.be.a('string');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.header).to.have.property('token').to.be.a('string');
  }).timeout(5000);

  it('Should NOT create a User at "/api/v1/auth/signup" if username is a falsy value', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = returnRandomValue(undefined, '', null, NaN, 0);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is not sent', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.username;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is more than 128 characters', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = createVarChars(200);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username must be less than 128 characters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user full name is a falsy value', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.fullName = returnRandomValue(undefined, '', null, NaN, 0);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user full name does not exist', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.fullName;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user full name is more than 128 chars', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.fullName = createVarChars(200);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name must be less than 128 characters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is a falsy value', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = returnRandomValue(undefined, '', null, NaN, 0);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email does not exist', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.email;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email format is wrong', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = returnRandomValue('haha@com', createEmailVarChar(200, 8));
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email format is wrong OR is more than 128 characters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email has already been registered', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = 'mama@mail.com';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User exists, please sign in with email or username');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is a falsy value', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = returnRandomValue(undefined, '', null, NaN, 0);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not exist', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.password;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not 128 characters maximum', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = returnRandomValue(createVarChars(200), 'ddd');
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, 128 characters maximum');
  });
});
