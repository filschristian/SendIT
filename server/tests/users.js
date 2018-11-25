import chai, { should } from 'chai';
import chaihttp from 'chai-http';
import server from '../src';

chai.use(chaihttp);

describe('end points', () => {
  describe('POST/user', () => {
    chai.request(server)
      .post('/api/v1/users/')
      .send({
        firstname: 'fred',
        lastname: 'kalisa',
        username: 'kfred',
        password: 'jumia',
        usertype: 'user',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
      });
  });
  describe('GET/users', () => {
    chai.request(server)
      .get('/api/v1/users/')
      .end((err, res) => {
        res.should.has.status(200);
        res.should.be.a('object');
        res.body.should.have.property('id');
      });
  });
});
