const express = require('express');
const LoginController = require('./controllers/LoginController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

// Login Routes
routes.post('/login', LoginController.login);

// Ongs Routes
routes.get('/ongs', OngController.list);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().min(10).max(11).required(),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required()
    })
}), OngController.create);

// Incidents Routes
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.list);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

// Profile Routes
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.listSpecificIncidentsByOng);

module.exports = routes;