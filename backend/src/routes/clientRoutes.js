const express = require('express');
const ClientController = require('../controllers/clientController');

const router = express.Router();

/**
 * @route   GET /api/clients
 * @desc    Get all clients with optimized dashboard data
 * @access  Public
 * @query   search (optional) - Search by client name
 * @query   industry (optional) - Filter by industry
 */
router.get('/', ClientController.getClients);

/**
 * @route   GET /api/clients/:id
 * @desc    Get single client with full structured intelligence
 * @access  Public
 * @param   id - Client ID
 */
router.get('/:id', ClientController.getClientById);

/**
 * @route   POST /api/clients/seed
 * @desc    Seed database with realistic SaaS companies
 * @access  Public
 */
router.post('/seed', ClientController.seedClients);

module.exports = router;
