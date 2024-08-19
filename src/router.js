const controller = require('./controllers/index');

const express = require('express');
const router = express.Router();

// ROTAS PARA PEGAR ATIVIDADES
router.get('/activities/', controller.getActivities);
router.get('/activities/:activityId', controller.getActivity);

// ROTAS PARA PEGAR AUDIÊNCIAS
router.get('/audiences/', controller.getAudiences);
router.get('/audiences/:audienceId', controller.getAudience);

// ROTA PARA PEGAR OFERTAs
router.get('/offers/', controller.getOffers);
router.get('/offers/:offerId', controller.getOffer);

// ROTA PARA COMBINAR TUDO E MONTAR UM ESPAÇO
router.get('/space/:space', controller.getAllSpaceContent);

module.exports = router;
