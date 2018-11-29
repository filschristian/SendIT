import chai from 'chai';
import should from 'chai';
import chaihttp from 'chai-http';
import server from '../src';

// const should = chai.should();
chai.use(chaihttp);

describe('/Parcel delivery orders', () => {
  it('it should create a new parcel', done => {
    chai
      .request(server)
      .post('/api/v1/parcels/')
      .send({
        descr: 'kigali',
        location: 'kigali',
        destination: 'Muhanga',
        quantity: 3,
        senderId: 38,
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        done();
      });
  });

  it('should return all parcels, STATUS [201]', done => {
    chai.request(server)
      .get('/api/v1/parcels/')
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('orders');
        done();
      });
  });

  it('should change status', done => {
    chai.request(server)
      .put('/api/v1/parcels/4/status')
      .send({
        status: 'delivered',
        usertype: 'admin',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        done();
      });
  });

  it('should change location', done => {
    chai.request(server)
      .put('/api/v1/parcels/4/presentLocation')
      .send({
        location: 'kacyiru',
        usertype: 'admin',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        done();
      });
  });
});
