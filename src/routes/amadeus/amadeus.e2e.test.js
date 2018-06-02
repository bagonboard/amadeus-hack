const chai       = require('chai');
const chaiHttp   = require('chai-http');
const { expect } = require('chai');
const config = require('../../../config');
const server = require('../../server');

// const { hostname, port } = config.server;
const URL = config.localURL;

chai.use(chaiHttp);

const checkTimeout = () => new Promise((resolve, reject) => setTimeout(resolve, 2000));

describe('[e2e] /iberia', () => {
  before(async () => {
    await server(config);
  });

  describe('/test', () => {
    it.skip('it should POST a city business logic', async () => {
      const endpoint = 'amadeus/test';
      const query = {}
      try {
        const res = await chai
          .request(URL)
          .post(endpoint)
          .send(query);
        const { body } = res;
        console.log('::> result <::\n', JSON.stringify(body, null, 2));
        // const keys = ['paxs', 'flightData', 'flightClass', 'ib_id'];
        // expect(body).to.be.instanceof(Object);
        // expect(body).to.contain.keys(keys);
        // const paxKeys = ['ticketNumber', 'bagsAllowed'];
        // const { paxs, flightData, ib_id, flightClass } = body;
        // expect(paxs).to.be.instanceof(Array);
        // expect(paxs).to.have.length.above(0);
        // expect(paxs[0]).to.contain.keys(paxKeys);
        // const flightDataKeys = ['flight', 'flightNumber', 'airline', 'origin', 'destination'];
        // expect(flightData).to.be.instanceof(Object);
        // expect(flightData).to.contain.keys(flightDataKeys);
        // const { origin, destination } = flightData;
        // const destinyKeys = ['name', 'airport', 'city', 'date', 'terminalNumber'];
        // expect(origin).to.be.instanceof(Object);
        // expect(origin).to.contain.keys(destinyKeys);
        // expect(destination).to.be.instanceof(Object);
        // expect(destination).to.contain.keys(destinyKeys);

      } catch (error) {
        console.error('ERROR', error);
        expect(error).to.not.exist();
      }
    });
  });
  describe('/checkin', () => {
    it.skip('it should POST a ', async () => {
      const endpoint = 'amadeus/chekin';
      const query = {}
      try {
        const res = await chai
          .request(URL)
          .post(endpoint)
          .send(query);
        const { body } = res;
        // console.log('::> checkin <::\n', JSON.stringify(body, null, 2));
        console.log('::> checkin <::\n', body);

      } catch (error) {
        console.error('ERROR', error);
        expect(error).to.not.exist();
      }
    });
  });

  describe('/mostTraveled', () => {
    it('it should POST a ', async () => {
      const endpoint = 'amadeus/mostTraveled';
      const query = {}
      try {
        const res = await chai
          .request(URL)
          .post(endpoint)
          .send(query);
        const { body } = res;
        // console.log('::> mostTraveled <::\n', JSON.stringify(body, null, 2));
        console.log('::> mostTraveled <::\n', body);

      } catch (error) {
        console.error('ERROR', error);
        expect(error).to.not.exist();
      }
    }).timeout(50000);
  });
  // describe('/validateIberia', () => {
  //   it('it should POST to /validateIberia and return a success response', async () => {
  //     const endpoint = 'iberia/validateIberia';
  //     expect(auxObject).to.be.instanceof(Object);
  //     const res = await chai
  //       .request(URL)
  //       .post(endpoint)
  //       .send(auxObject);

  //     const { code, data } = res.body;
  //     expect(data).to.be.eq(true);
  //   });
  //   it('it should POST to /validateIberia and return a failure response', async () => {
  //     const endpoint = 'iberia/validateIberia';
  //     expect(auxObject).to.be.instanceof(Object);
  //     const mockBody = {
  //       ...auxObject,
  //       ticketNumber: '00000000000001',
  //     };
  //     const res = await chai
  //       .request(URL)
  //       .post(endpoint)
  //       .send(mockBody);

  //     const { code, data, error } = res.body;
  //     expect(data).to.be.eq(false);
  //     expect(code).to.be.eq(400);
  //   });
  // });
});
