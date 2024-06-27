const express = require('express');
const router = express.Router();
const soumissionController = require('../controllers/soumissionController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, soumissionController.createSoumission);
router.get('/', auth, soumissionController.getAllSoumissions);
router.get('/:id', auth, soumissionController.getSoumissionById);
router.put('/:id', auth, soumissionController.updateSoumission);
router.delete('/:id', auth, soumissionController.deleteSoumission);

module.exports = router;
