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
  lowerPrices,
  lowerPricesCache,
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

function getMonths(year) {
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const actualMonth = moment().month();
  const result = [];
  for (let i = actualMonth; i < months.length; i++) {
    const newDate = `${year}-${months[i]}`;
    result.push(newDate);
  }
  if (actualMonth !== 0) {
    const newYear = parseInt(year) + 1;
    for (let i = 0; i < actualMonth; i++) {
      const newDate = `${newYear}-${months[i]}`;
      result.push(newDate);
    }
  }
  return result;
}

async function lowerPricesCache(req, res) {
  try {
    const cache = [
      [ 'BCN', 95, 97, 123, 99, 100, 110, 103, 99, 98, 99, 110, 109 ],
      [ 'PAR', 174, 191, 201, 145, 148, 172, 175, 388, 408, 309, 1045, 1126 ],
      [ 'LON', 138, 121, 161, 107, 172, 121, 124, 155, 185, 165, 986, 1572 ],
      [ 'TCI', 161, 191, 234, 213, 170, 136, 148, 147, 129, 130, 145, 156 ],
      [ 'NYC', 1335, 1361, 1360, 1341, 1437, 1721, 1526, 1651, 1696, 1733, 1742, 1823 ],
      [ 'BRU', 271, 301, 458, 287, 275, 329, 428, 763, 706, 456, 1467, 1169 ],
      [ 'UIO', 1301, 1475, 1317, 1274, 1365, 1056, 1405, 1122, 1793, 1427, 824, 2041 ],
      [ 'DXB', 1317, 1065, 958, 1019, 1121, 1187, 1165, 0, 1175, 1431, 1457, 2558 ],
      [ 'SDQ', 1133, 1140, 1126, 1060, 1074, 1000, 1106, 1114, 966, 1014, 1371, 1233 ],
      [ 'OPO', 228, 234, 230, 226, 165, 401, 366, 776, 629, 255, 1671, 50 ],
   ];

    return res.status(200).json(cache);
  } catch (error) {
    console.error('[ERROR] lowerPricesCache', error.message);
    res.status(500).end();
  }
}

async function lowerPrices(req, res) {
  try {
    console.time("lowerPrices");
    // const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const { origin, destination, year } = req.body;
    const months = getMonths(year);
    const mediaMonth = [];
    const response   = [];
    response.push(destination);

    for (let i = 0; i < months.length; i++) {
      const prices = [];
      const departure = months[i];
      const daysInMonth = moment(departure).daysInMonth();

      const dayRandom = Math.floor(Math.random() * daysInMonth) + 1;

      const departureDate = `${departure}-${(dayRandom<10) ? '0'+dayRandom : dayRandom}`;
      console.log(origin, destination, departureDate);
      console.time("amadeus");
      let lowFare;
      try {
        lowFare = await amadeus.shopping.flightOffers.get({
          origin,
          destination,
          departureDate,
        });
      } catch (error) {
        
      }
      console.timeEnd("amadeus");
      if (lowFare) {
        const { data } = lowFare;
        data.forEach(item => {
          const { services, price, pricePerAdult } = item.offerItems[0];
          prices.push(parseInt(price.total));
        });
        // console.log('prices', prices);
        // console.log('prices length', prices.length);
  
        // max, min & media of the month/day
        const media = getMediaMonth(prices);
        // console.log('media', media);
        mediaMonth.push(media);
        response.push(media.media);
        console.log('mediaMonth', response);
      } else {
        response.push(0);        
      }
    }
      // media of the year/month
    const mediaYear = getMediaYear(mediaMonth);
    // console.log('mediaYear', mediaYear);
    // const medias = getMediaMonth(mediaMonth);
    // const response = {
    //   months,
    //   origin,
    //   destination,
    //   mediaMonth,
    //   mediaYear,
    //   // mediaMes: getMedia(mediaDia),
    // };
    console.timeEnd("lowerPrices");
    return res.status(200).json(response);
  } catch (error) {
    console.error('[ERROR]', error.message);
    res.status(500).end();
  }
}


async function lower(req, res) {
  try {
    console.time("lower");
    // const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const { origin, destination, year } = req.body;
    const months = getMonths(year);
    const mediaMonth = [];
    // media de precios por ruta al mes
    // media de dias 
    // media de medias diarias
    
    // const daysInMonth = moment(departure).daysInMonth();
    // const daysInMonth = 2;
    
    for (let i = 0; i < months.length; i++) {
      const prices = [];
      const departure = months[i];
      const daysInMonth = moment(departure).daysInMonth();

      const dayRandom = Math.floor(Math.random() * daysInMonth) + 1;

      const departureDate = `${departure}-${(dayRandom<10) ? '0'+dayRandom : dayRandom}`;
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

      // max, min & media of the month/day
      const media = getMediaMonth(prices);
      // console.log('media', media);
      mediaMonth.push(media);
      // console.log('mediaMonth', mediaMonth);
    }
      // media of the year/month
    const mediaYear = getMediaYear(mediaMonth);
    // console.log('mediaYear', mediaYear);
      // const medias = getMediaMonth(mediaMonth);
    const response = {
      months,
      origin,
      destination,
      mediaMonth,
      mediaYear,
      // mediaMes: getMedia(mediaDia),
    };
    console.timeEnd("lower");
    return res.status(200).json(response);
  } catch (error) {
    console.error('[ERROR]', error.message);
    res.status(500).end();
  }
}

function getMediaMonth(object) {
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

function getMediaYear(object) {
  let total = 0;
  object.forEach(item => {
    const vaule = parseInt(item.media);
    total += vaule;
  });
  const result = (total / object.length).toFixed(2);
  return parseInt(result);
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
