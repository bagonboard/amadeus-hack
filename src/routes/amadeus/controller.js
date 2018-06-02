// const { sendToSlack } = require('../../services/slack');
const Amadeus = require('amadeus');
const moment = require('moment');
const config = require('../../../config');

console.log(config.amadeus);

const amadeus = new Amadeus(config.amadeus);
const checkTimeout = () => new Promise((resolve, reject) => setTimeout(resolve, 1000));

const errors = {
  booking : '[ERROR in booking]: ',
  critical: 'Something bad happen',
};

module.exports = {
  booking,
  test,
  find,
  chekin,
  mostTraveled,
  lower,
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
    console.log('flightCheckin: ', flightCheckin.body);
    
    return res.status(200).json(flightCheckin.body);
  } catch (error) {
    console.error('[ERROR]', error.message);
    return res.status(500).json({ code: 500, error: 'Somethig bad happen' });    
  }
}

async function mostTraveled(req, res) {
  try {
    const { origin, year } = req.body;
    // const year = '2017';
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const resultTotal = [];

    for (let i = 0; i < months.length; i++) {
      const request = {
        origin,
        period: `${year}-${months[i]}`,
      };
      const mostTravel = await amadeus.travel.analytics.airTraffic.traveled.get(request);
      const { data } = mostTravel;
      // console.log('data', data);
      // console.log('mostTravel', mostTravel);
      const result = [];
      data.forEach(item => {
        const element = {};
        element[item.destination] = item.analytics.flights.score * item.analytics.travellers.score;
        result.push(element);
      });
      // console.log('result', result);
      resultTotal.push(result);
      await checkTimeout();
    }
    // console.log('resultTotal', JSON.stringify(resultTotal, null, 2));
    const response = {
      months,
      travels: resultTotal,
    };
    // console.log('mostTraveled: ', mostTravel.body);
    return res.status(200).json(response);
  } catch (error) {
    console.error('[ERROR]', error);
    return res.status(500).json({ code: 500, error: 'Somethig bad happen' });    
  }
}

async function lower(req, res) {
  try {
    console.time("lower");
    const { origin, destination, departure } = req.body;
    const mediaDia = [];
    // media de precios por ruta al mes
    // media de dias 
    // media de medias diarias
    
    // const daysInMonth = moment(departure).daysInMonth();
    const daysInMonth = 2;
    
    for (let i = 1; i <= daysInMonth; i++) {
      const prices = [];
      const departureDate = `${departure}-${(i<10) ? '0'+i : i}`;
      console.log(origin, destination, departureDate);
      console.time("amadeus");
      const lowFare = await amadeus.shopping.flightOffers.get({
        origin,
        destination,
        departureDate,
      });
      console.timeEnd("amadeus");
      const { data } = lowFare;
      data.forEach(item => {
        const { services, price, pricePerAdult } = item.offerItems[0];
        prices.push(parseInt(price.total));
      });
      // console.log('prices', prices);
      // console.log('prices length', prices.length);
      const media = getMedia(prices);
      // console.log('media', media);
      mediaDia.push(media);
      // console.log('mediaDia', mediaDia);
    }
    const medias = getMediaMes(mediaDia);
    const response = {
      origin,
      destination,
      mediaDia,
      mediaMes: medias,
      // mediaMes: getMedia(mediaDia),
    };
    console.timeEnd("lower");
    return res.status(200).json(response);
  } catch (error) {
    console.error('[ERROR]', error.message);
  }
}

function getMedia(object) {
  let total = 0;
  object.forEach(item => {
    const vaule = parseInt(item);
    total += vaule;
  });
  const result = (total / object.length).toFixed(2);
  return parseInt(result);
}

function getMediaMes(object) {
  let total = 0;
  let max = 0;
  let min = 0;
  object.forEach(item => {
    const vaule = parseInt(item);
    total += parseInt(vaule);
    if (max < vaule) max = vaule;
    if (min === 0 || min > vaule) min = vaule;
  });
  const totalPrice = (total / object.length).toFixed(2);
  const result = {
    max,
    min,
    media: parseInt(totalPrice),
  }
  return result;
}
