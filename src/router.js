const controllers = require('./controllers/controllers');
const express = require('express');
    
const router = express.Router();

// ROTAS PARA PEGAR ATIVIDADES
router.get('/activities/', controllers.getActivities);
router.get('/activities/:activityId', controllers.getActivity);

// ROTAS PARA PEGAR AUDIÊNCIAS
router.get('/audiences/', controllers.getAudiences);
router.get('/audiences/:audienceId', controllers.getAudience);

// ROTA PARA PEGAR UMA OFERTA
router.get('/offers/:offerId', controllers.getOffer);

// ROTA PARA COMBINAR TUDO E MONTAR UM ESPAÇO
router.get('/space/:space', controllers.getAllSpaceContent);
router.get('/space/clean/:space', controllers.getAllSpaceContentSimplified);

module.exports = router;
