/**
 * @swagger
 * components:
 *   schemas:
 *     Hospital:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the hospital
 *           example: 609bda561452242d88d36e37
 *         name:
 *           type: string
 *           description: Hospital name
 *         address:
 *           type: string
 *           description: House No., Street, Road
 *         district:
 *           type: string
 *           description: District
 *         province:
 *           type: string
 *           description: province
 *         postalcode:
 *           type: string
 *           description: 5-digit postal code
 *         tel:
 *           type: string
 *           description: telephone number
 *         region:
 *           type: string
 *           description: region
 *       example:
 *         id: 609bda561452242d88d36e37
 *         name: Happy Hospital
 *         address: 121 ถนนสุขุมวิท
 *         district: บางนา
 *         province: กรุงเทพมหานคร
 *         postalcode: 10110
 *         tel: 02-2187000
 *         region: กรุงเทพมหานคร (Bangkok)
 */

/**
 * @swagger
 * tags:
 *   - name: Hospitals
 *     description: The hospitals managing API
 */

/**
 * @swagger
 * /api/v1/hospitals:
 *   get:
 *     summary: Get all hospitals
 *     tags: [Hospitals]
 *     responses:
 *       200:
 *         description: List of hospitals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hospital'
 */

/**
 * @swagger
 * /api/v1/hospitals/{id}:
 *   get:
 *     summary: Get hospital by id
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hospital id
 *     responses:
 *       200:
 *         description: Hospital found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: Hospital not found
 */

/**
 * @swagger
 * /api/v1/hospitals:
 *   post:
 *     summary: Create hospital
 *     tags: [Hospitals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       201:
 *         description: Hospital created
 */

/**
 * @swagger
 * /api/v1/hospitals/{id}:
 *   put:
 *     summary: Update hospital
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       200:
 *         description: Hospital updated
 *       404:
 *         description: Hospital not found
 */

/**
 * @swagger
 * /api/v1/hospitals/{id}:
 *   delete:
 *     summary: Delete hospital
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hospital deleted
 *       404:
 *         description: Hospital not found
 */

const express = require('express');
const {
    getHospitals,
    getHospital,
    createHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitals');

//Include other resource routers
const appointmentRouter=require('./appointments');

const router = express.Router();

const {protect,authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:hospitalId/appointments/',appointmentRouter);

router.route('/')
    .get(getHospitals)
    .post(protect, authorize('admin'), createHospital);

router.route('/:id')
    .get(getHospital)
    .put(protect, authorize('admin'), updateHospital)
    .delete(protect,authorize('admin') , deleteHospital);

module.exports = router;


