// const { sendToSlack } = require('../../services/slack');
const Amadeus = require('amadeus');
const config = require('../../../config');

console.log(config.amadeus);

const amadeus = new Amadeus(config.amadeus);

const errors = {
  booking : '[ERROR in booking]: ',
  critical: 'Something bad happen',
};

module.exports = {
  booking,
  test,
  find,
  chekin,
};

async function booking(req, res) {
  try {
    // const { surname, bookingCode } = req.body;
    // const result = await getBooking(surname, bookingCode);
    // return (result)
    //   ? res.json(result)
    //   : res.status(400).json({
    //     code : 400,
    //     error: 'No results found.'
    //   });
  } catch (error) {
    // console.error(errors.booking, error.message);
    // const text = `Iberia scraper fails.\n${errors.booking} \n${error.message}`;
    // sendToSlack(text);
    // return res.status(500).json({ code: 500, error: errors.critical });
  }
}

async function test(req, res) {
  try {
    // Flight Most Traveled Destinations
    const mostTravel = await amadeus.travel.analytics.airTraffic.traveled.get({
      origin: 'MAD',
      period: '2017-08'
    });
    console.log('mostTravel: ', mostTravel.body);

    // Flight Most Searched Destinations
    const mostFlight = await amadeus.travel.analytics.fareSearches.get({
      origin       : 'MAD',
      sourceCountry: 'ES',
      period       : '2017-08'
    });
    console.log('mostFlight: ', mostFlight.body);

    // Flight Low-fare Search
    const lowFare = await amadeus.shopping.flightOffers.get({
      origin       : 'MAD',
      destination  : 'NYE',
      departureDate: '2018-08-01'
    });
    console.log('mostTravel: ', lowFare.body);
  } catch (error) {
    console.error('[ERROR]', error.message);
  }
}

async function find(req, res) {
  try {
    const { origin, period } = req.body;
    // Flight Most Traveled Destinations
    
  } catch (error) {
    console.error('[ERROR]', error.message);
  }
}

async function chekin(req, res) {
  try {
    // const { origin, period } = req.body;
    // Flight Checkin Links
    const flightCheckin = await amadeus.referenceData.urls.checkinLinks.get({
      airline : 'LH'
    });
    console.log('flightCheckin: ', flightCheckin);
    
    return res.status(200).json(flightCheckin.body);
  } catch (error) {
    console.error('[ERROR]', error.message);
    return res.status(500).json({ code: 500, error: 'Somethig bad happen' });    
  }
}
