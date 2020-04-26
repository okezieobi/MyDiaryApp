import Test from '../utils';

const {
  deleteData, createEmailVarChar,
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
      fullName: returnRandomValue(null, undefined, NaN),
      email: returnRandomValue(null, undefined, NaN),
      password: returnRandomValue(null, undefined, NaN),
      username: returnRandomValue(null, undefined, NaN),
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
      fullName: 904,
      email: 4499,
      password: 9848484,
      username: 40940494,
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(testData)
      .then(({ body: { error }, status }) => {
        expect(status).toBeNumber().toEqual(400);
        expect(error).toBeArray().toIncludeAnyMembers(['Full name provided must be string type', 'Username provided must be string type', 'Email provided must be string type', 'Password provided must be string type']);
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
        expect(error).toBeString().toEqual(`User(s) with ${userSeeds[0].email} and ${userSeeds[0].username} already exists, please signup with another email and username`);
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
        expect(error).toBeString().toEqual(`User with ${userSeeds[0].email} already exists, please signup with another email`);
        done();
      });
  });

  /*
  it('Should NOT create a User at "/api/v1/auth/signup" if username is not sent in request', async () => {
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

  it('Should NOT create a User at "/api/v1/auth/signup" if user full name is not sent in request', async () => {
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

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is not sent in request', async () => {
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
      username: 'Okezieobi',
    };
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User exists, user should please sign in with email or username');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user username has already been registered', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mamapapa@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User exists, user should please sign in with email or username');
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

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not sent in request', async () => {
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
    testData.password = returnRandomValue(createVarChars(200), createVarChars(4));
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, 128 characters maximum');
  });
  */
});
