const express = require('express');
const LoginController = require('./controllers/LoginController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

// Login Routes
routes.post('/login', LoginController.login);

// Ongs Routes
routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

// Incidents Routes
routes.get('/incidents', IncidentController.list);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// Profile Routes
routes.get('/profile', ProfileController.listSpecificIncidentsByOng);

module.exports = routes;