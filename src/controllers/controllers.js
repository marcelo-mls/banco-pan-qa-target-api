const { performance } = require('perf_hooks');
const services = require('../services/adobe.services');
const helpers = require('../utils/benchmark');

// RETORNA LISTA DE TODAS ATIVIDADES
async function getActivities(req, res) {
  const start = performance.now(); // Marca o tempo de início para benchmark
  const activityState = req.query.state || '';

  try {
    const token = await services.generateTokenAPI();
    const response = await services.fetchAdobeAPI('activities', token, null, activityState);
  
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }

  helpers.benchmark(start, `fetch ${activityState} activities`);
}

// RETORNA DETALHES DE UMA ATIVIDADE
async function getActivity(req, res) {
  const start = performance.now(); // Marca o tempo de início para benchmark
  const { activityId } = req.params;

  try {
    const token = await services.generateTokenAPI();
    const activitiesResponse = await services.fetchAdobeAPI('activities', token, activityId);
    var type = activitiesResponse.activities[0].type;
    const activityResponse = await services.fetchAdobeAPI('activity', token, activityId, type);

    activityResponse['type'] = type;

    res.status(200).json(activityResponse);
  } catch (error) {
    res.status(500).json(error);
  }

  helpers.benchmark(start, `fetch ${type} activity ${activityId}`);
}

// RETORNA LISTA DE TODAS AUDIÊNCIAS
async function getAudiences(req, res) {
  const start = performance.now(); // Marca o tempo de início para benchmark

  try {
    const token = await services.generateTokenAPI();
    const response = await services.fetchAdobeAPI('audiences', token, null);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }

  helpers.benchmark(start, 'fetch audiences');
}

// RETORNA DETALHES DE UMA AUDIÊNCIA
async function getAudience(req, res) {
  const start = performance.now(); // Marca o tempo de início para benchmark
  const { audienceId } = req.params;

  try {
    const token = await services.generateTokenAPI();
    const response = await services.fetchAdobeAPI('audience', token, audienceId);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }

  helpers.benchmark(start, `fetch audience ${audienceId}`);
}

// RETORNA DETALHES DE UMA OFERTA
async function getOffers(req, res) {
  const start = performance.now(); // Marca o tempo de início para benchmark

  try {
    const token = await services.generateTokenAPI();
    const response = await services.fetchAdobeAPI('offers', token);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }

  helpers.benchmark(start, 'fetch offers');
}

// RETORNA DETALHES DE UMA OFERTA
async function getOffer(req, res) {
  const start = performance.now(); // Marca o tempo de início para benchmark
  const { offerId } = req.params;

  try {
    const token = await services.generateTokenAPI();
    const offersResponse = await services.fetchAdobeAPI('offers', token, offerId);
    var type = offersResponse.offers[0].type;
    const offerResponse = await services.fetchAdobeAPI('offer', token, offerId, type);

    offerResponse['type'] = type;

    res.status(200).json(offerResponse);
  } catch (error) {
    res.status(500).json(error);
  }

  helpers.benchmark(start, `fetch ${type} offer ${offerId}`);
}

// RETORNA OS DETALHES DE UM SPACE (COM ATIVIDADES E OFERTAS) DE FORMA ENXUTA
// async function getAllSpaceContentSimplified(req, res) {
//   const start = performance.now(); // Marca o tempo de início para benchmark
//   const { space } = req.params;

//   try {
//     const token = await services.generateTokenAPI();
//     const allActivities = await services.fetchAdobeAPI('activities', token);
//     const allAudiences = await services.fetchAdobeAPI('audiences', token, null);
    
//     const activitiesIds = allActivities.activities
//       .filter((activity) => helpers.filterProductionActivitiesBySpace(activity, space.toLowerCase()))
//       .map((activity) => activity.id);

//     const activityPromises = activitiesIds.map(async (activityId) => {
//       const response = await services.fetchAdobeAPI('activity', token, activityId);

//       if(response.error_code && response.error_code === '401013') {
//         return response;
//       }

//       const sortedOffers = helpers.sortOffersAsIsAtTarget(response);
//       const activityWithAudiences = helpers.addAudienceDetails(sortedOffers, allAudiences);

//       return activityWithAudiences;
//     });

//     const activitiesResponses = await Promise.all(activityPromises);

//     if(activitiesResponses[0].error_code && activitiesResponses[0].error_code === '401013') {
//       return res.status(401).json({
//         status: 401,
//         message: 'Parece que o token fornecido é inválido ou expirou.'
//       });
//     } 

//     const spaceContent = [];

//     for (const activity of activitiesResponses) {
//       const offersPromises = activity.options.map(async (offer) => {
//         const response = await services.fetchAdobeAPI('offer', token, offer.offerId);
//         const {id, content} = response;
//         return { ...offer, details: {id, content} };
//       });

//       const offersResponses = await Promise.all(offersPromises);
//       spaceContent.push({ ...activity, options: offersResponses });
//     }

//     spaceContent.sort((a, b) => {
//       const dateA = Date.parse(a.startsAt === '' ? a.endsAt : a.startsAt);
//       const dateB = Date.parse(b.startsAt === '' ? b.endsAt : b.startsAt);

//       return dateA - dateB || (b.priority - a.priority);
//     });

//     res.status(200).json(spaceContent);
//   } catch (error) {
//     console.error('500', error);
//     return res.status(500).json(error);
//   }

//   helpers.benchmark(start, `fetch space/mBox ${space}`);
// }

module.exports = {
  getActivities,
  getActivity,
  getAudiences,
  getAudience,
  getOffers,
  getOffer,
};
