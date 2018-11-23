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
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('desc');
      });
  });
});
