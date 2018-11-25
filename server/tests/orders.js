import chai, { should } from 'chai';
import chaihttp from 'chai-http';
import server from '../src';

chai.use(chaihttp);

describe('end points', () => {
  describe('POST/parcel', () => {
    chai.request(server)
      .post('/api/v1/parcels/')
      .send({
        descr: 'kigali',
        location: 'kigali',
        destination: 'Muhanga',
        quantity: 3,
        senderId: 1,
        status: 'in transit',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('desc');
      });
  });
  describe('GET/parcel', () => {
    chai.request(server)
      .get('/api/v1/parcels/')
      .end((err, res) => {
        res.should.has.status(200);
        res.should.be.a('object');
        res.body.should.have.property('id');
      });
  });
  describe('PUT/parcel', () => {
    chai.request(server)
      .put('/api/v1/parcels/:id')
      .send({
        descr: 'kigali',
        location: 'kigali',
        destination: 'Muhanga',
        quantity: 3,
        senderId: 1,
        status: 'in transit',
      })
      .end((err, res) => {
        res.should.has.status(200);
        res.should.be.a('object');
        res.body.should.have.property('id');
      });
  });
  describe('DELETE/parcel', () => {
    chai.request(server)
      .delete('/api/v1/parcels/:id')
      .end((err, res) => {
        res.should.has.status(200);
        res.should.be.a('object');
        res.body.should.have.property('id');
      });
  });
});
