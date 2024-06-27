const express = require('express');
const router = express.Router();
const rapportFraudeController = require('../controllers/rapportFraudeController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, rapportFraudeController.createRapportFraude);
router.get('/', auth, rapportFraudeController.getAllRapportsFraude);
router.get('/:id', auth, rapportFraudeController.getRapportFraudeById);
router.put('/:id', auth, rapportFraudeController.updateRapportFraude);
router.delete('/:id', auth, rapportFraudeController.deleteRapportFraude);

module.exports = router;
