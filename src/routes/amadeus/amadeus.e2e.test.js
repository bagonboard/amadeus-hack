const chai       = require('chai');
const chaiHttp   = require('chai-http');
const { expect } = require('chai');
const config = require('../../../config');
const server = require('../../server');

const URL = config.localURL;

chai.use(chaiHttp);

const checkTimeout = () => new Promise((resolve, reject) => setTimeout(resolve, 2000));

describe('[e2e] /amadeus', () => {
  before(async () => {
    await server(config);
  });

  describe('amadeus/test', () => {
    it.skip('it should POST a test', async () => {
      const endpoint = 'amadeus/test';
      const query = {}
      try {
        const res = await chai
          .request(URL)
          .post(endpoint)
          .send(query);
        const { body } = res;
        console.log('::> result <::\n', JSON.stringify(body, null, 2));

      } catch (error) {
        console.error('ERROR', error);
        expect(error).to.not.exist();
      }
    });
  });
  describe('amadeus/checkin', () => {
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

  describe('amadeus/mostTraveled', () => {
    it.skip('it should POST a ', async () => {
      const endpoint = 'amadeus/mostTraveled';
      const query = {
        origin: 'MAD',
        year  : '2017'
      };
      try {
        const res = await chai
          .request(URL)
          .post(endpoint)
          .send(query);
        const { body } = res;
        console.log('::> mostTraveled <::\n', JSON.stringify(body, null, 2));
        // console.log('::> mostTraveled <::\n', body);

      } catch (error) {
        console.error('ERROR', error);
        expect(error).to.not.exist();
      }
    })
    // .timeout(50000);
  });

  describe('amadeus/lower', () => {
    it.skip('it should POST a lower fare result', async () => {
      const endpoint = 'amadeus/lower';
      const query = {
        origin     : 'MAD',
        destination: 'PAR',
        year       : '2017'
        // departure  : '2018-08',
      };
      try {
        const res = await chai
          .request(URL)
          .post(endpoint)
          .send(query);
        const { body } = res;
        // console.log('::> lower <::\n', JSON.stringify(body, null, 2));
        console.log('::> lower <::\n', body);

      } catch (error) {
        console.error('ERROR', error);
        expect(error).to.not.exist();
      }
    })
    // .timeout(120000);
    it('it should POST a lower fare result', async () => {
      const endpoint = 'amadeus/lowerPrices';
      // const cities = ['BCN', 'PAR', 'LON', 'TCI'];
      const cities = ['NYC'];
      // const cities = ['BRU', 'UIO'];
      // const cities = ['DXB'];
      // const cities = ['SDQ', 'OPO'];
      // const cities = ['BCN', 'PAR', 'LON', 'TCI', 'NYC', 'BRU', 'UIO', 'DXB', 'SDQ', 'OPO'];
      const result = [];
      try {
        for (let i = 0; i < cities.length; i++) {
          const query = {
            origin     : 'MAD',
            destination: cities[i],
            year       : '2018'
            // departure  : '2018-08',
          };
          const res = await chai
            .request(URL)
            .post(endpoint)
            .send(query);
          const { body } = res;
          console.log('body', body);
          result.push(body);
        }
        console.log(':: RESULT ::\n', result);
        console.log('------------\n');
        console.log(':: RESULT ::\n', JSON.stringify(result, null, 2));
        
      } catch (error) {
        console.error('ERROR', error);
        expect(error).to.not.exist();
      }
    })
    .timeout(90000000);
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
