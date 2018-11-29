import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../src';

chai.use(chaihttp);

describe('/Create users', () => {
  it('it should create a new user', done => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'kigali',
        lastname: 'kigali',
        username: 'Muhanga@gmail.com',
        password: 'kigali',
        usertype: 'user',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        done();
      });
  });
  it('it should sign in a user', done => {
    chai
      .request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'Muhanga@gmail.com',
        password: 'kigali',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        done();
      });
  });
});
