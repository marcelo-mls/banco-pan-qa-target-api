const services = require('../services/adobe.services');
const helpers = require('../utils/helperFunctions');

// RETORNA LISTA DE TODAS ATIVIDADES
async function getActivities(req, res) {
  try {
    const token = await services.generateTokenAPI();
    const response = await services.fetchAdobeAPI('activities', token);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

// RETORNA DETALHES DE UMA ATIVIDADE
async function getActivity(req, res) {
  try {
    const { activityId } = req.params;
    const token = await services.generateTokenAPI();
    const response = await services.fetchAdobeAPI('activity', token, activityId);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

// RETORNA LISTA DE TODAS AUDIÊNCIAS
async function getAudiences(req, res) {
  try {
    const token = await services.generateTokenAPI();
    const response = await services.fetchAdobeAPI('audiences', token, null, 'v3');

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

// RETORNA DETALHES DE UMA AUDIÊNCIA
async function getAudience(req, res) {
  try {
    const { audienceId } = req.params;
    const token = await services.generateTokenAPI();
    const response = await services.fetchAdobeAPI('audience', token, audienceId, 'v3');

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

// RETORNA DETALHES DE UMA OFERTA
async function getOffer(req, res) {
  try {
    const { offerId } = req.params;
    const token = await services.generateTokenAPI();
    const response = await services.fetchAdobeAPI('offer', token, offerId);

    if(response.error_code && response.error_code === '401013') {
      return res.status(401).json({
        status: 401,
        message: 'Parece que o token fornecido é inválido ou expirou.'
      });
    } 

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

// RETORNA TODOS OS DETALHES DE UM SPACE (COM ATIVIDADES E OFERTAS)
async function getAllSpaceContent(req, res) {
  try {
    const { space } = req.params;
    const token = await services.generateTokenAPI();
    const allActivities = await services.fetchAdobeAPI('activities', token);

    const activitiesIds = allActivities.activities
      .filter((activity) => helpers.filterProductionActivitiesBySpace(activity, space))
      .map((activity) => activity.id);

    const activityPromises = activitiesIds.map(async (id) => {
      const response = await services.fetchAdobeAPI('activity', token, id);
      return response;
    });

    const activitiesResponses = await Promise.all(activityPromises);

    const spaceContent = [];

    for (const activity of activitiesResponses) {
      const offersPromises = activity.options.map(async (offer) => {
        const response = await services.fetchAdobeAPI('offer', token, offer.offerId);
        return { ...offer, details: response };
      });

      const offersResponses = await Promise.all(offersPromises);
      spaceContent.push({ ...activity, options: offersResponses });
    }

    res.status(200).json(spaceContent);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// RETORNA OS DETALHES DE UM SPACE (COM ATIVIDADES E OFERTAS) DE FORMA ENXUTA
async function getAllSpaceContentSimplified(req, res) {
  try {
    const { space } = req.params;
    
    const token = await services.generateTokenAPI();
    const allActivities = await services.fetchAdobeAPI('activities', token);
    const allAudiences = await services.fetchAdobeAPI('audiences', token, null, 'v3');

    const activitiesIds = allActivities.activities
      .filter((activity) => helpers.filterProductionActivitiesBySpace(activity, space))
      .map((activity) => activity.id);

    const activityPromises = activitiesIds.map(async (activityId) => {
      const response = await services.fetchAdobeAPI('activity', token, activityId);

      if(response.error_code && response.error_code === '401013') {
        return response;
      }

      const sortedOffers = helpers.sortOffersAsIsAtTarget(response);
      const activityWithAudiences = helpers.addAudienceDetails(sortedOffers, allAudiences);

      return activityWithAudiences;
    });

    const activitiesResponses = await Promise.all(activityPromises);

    if(activitiesResponses[0].error_code && activitiesResponses[0].error_code === '401013') {
      return res.status(401).json({
        status: 401,
        message: 'Parece que o token fornecido é inválido ou expirou.'
      });
    } 

    const spaceContent = [];

    for (const activity of activitiesResponses) {
      const offersPromises = activity.options.map(async (offer) => {
        const response = await services.fetchAdobeAPI('offer', token, offer.offerId);
        const {id, content} = response;
        return { ...offer, details: {id, content} };
      });

      const offersResponses = await Promise.all(offersPromises);
      spaceContent.push({ ...activity, options: offersResponses });
    }

    spaceContent.sort((a, b) => {
      const dateA = Date.parse(a.startsAt === '' ? a.endsAt : a.startsAt);
      const dateB = Date.parse(b.startsAt === '' ? b.endsAt : b.startsAt);

      return dateA - dateB || (b.priority - a.priority);
    });

    res.status(200).json(spaceContent);
  } catch (error) {
    console.error('500', error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getActivities,
  getActivity,
  getAudiences,
  getAudience,
  getOffer,
  getAllSpaceContent,
  getAllSpaceContentSimplified,
};
