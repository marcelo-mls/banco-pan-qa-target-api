const controllers = require('./controllers/controllers');
const services = require('./services/services');
const express = require('express');
    
const router = express.Router();

// ROTA PARA PEGAR AS ATIVIDADES
router.get('/activities/', controllers.getActivities);

// ROTA PARA PEGAR AS ATIVIDADES
router.get('/activities/:activityId', controllers.getActivity);

// ROTA PARA PEGAR AS OFERTAS
router.get('/offers/:offerId', controllers.getOffer);

// ROTA PARA COMBINAR TUDO
router.get('/space-content/:space', controllers.getAllSpaceContent);

// ROTA PARA COMBINAR TUDO, PORÉM REDUZIDO
router.get('/space-content/simple/:space', controllers.getAllSpaceContentSimplified);

// ROTA TEMPORÁRIA PARA BUSCAR DADOS DE UMA AUDIÊNCIA
router.get('/audience/:audienceId', async (req, res) => {
  const response = await services.fetchAudienceAPI(req.params.audienceId);
  res.status(200).json(response);
});

module.exports = router;
