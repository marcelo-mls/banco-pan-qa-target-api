const services = require('../services/services');

const spaces = {
  dashResumo: [
    { name: 'dashResumo1Prod', id: 221694 },
    { name: 'dashResumo2Prod', id: 221733 },
  ],
  homeResumo: [
    { name: 'homeResumo1ProdNboBackup', id: 221114 },
    { name: 'homeResumo2Prod', id: 221695 },
    { name: 'homeResumo3Prod', id: 210119 },
  ]
};

// RETORNA LISTA DE TODAS ATIVIDADES
async function getActivities(req, res) {
  try {
    const response = await services.fetchActivitiesAPI();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

// RETORNA DETALHES DE UMA ATIVIDADE
async function getActivity(req, res) {
  try {
    const { activityId } = req.params;
    const response = await services.fetchActivityAPI(activityId);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

// RETORNA DETALHES DE UMA OFERTA
async function getOffer(req, res) {
  try {
    const { offerId } = req.params;
    const response = await services.fetchOfferAPI(offerId);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

// RETORNA TODOS OS DETALHES DE UM SPACE (COM ATIVIDADES E OFERTAS)
async function getAllSpaceContent(req, res) {
  try {
    const { space } = req.params;

    const activitiesIds = spaces[space].map((activity) => activity.id);

    const activityPromises = activitiesIds.map(async (id) => {
      const response = await services.fetchActivityAPI(id);
      return response;
    });

    const activitiesResponses = await Promise.all(activityPromises);

    const spaceContent = [];

    for (const activity of activitiesResponses) {
      const offersPromises = activity.options.map(async (offer) => {
        const response = await services.fetchOfferAPI(offer.offerId);
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

// RETORNA OS DETALHES DE UM SPACE (COM ATIVIDADES E OFERTAS) DE FORMA REDUZIDA
async function getAllSpaceContentSimplified(req, res) {
  try {
    const { space } = req.params;

    const activitiesIds = spaces[space].map((activity) => activity.id);

    const activityPromises = activitiesIds.map(async (activityId) => {
      const response = await services.fetchActivityAPI(activityId);

      if(response.error_code && response.error_code === '401013') {
        return response;
      } 

      const { id, name, state, priority, options } = response;
      return { id, name, state, priority, options };
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
        const response = await services.fetchOfferAPI(offer.offerId);
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

module.exports = {
  getActivities,
  getActivity,
  getOffer,
  getAllSpaceContent,
  getAllSpaceContentSimplified,
};
