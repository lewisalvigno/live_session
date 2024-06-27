const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const auth = require('../middlewares/AuthMiddleware');

router.post('/', auth, evaluationController.createEvaluation);
router.get('/', auth, evaluationController.getAllEvaluations);
router.get('/:id', auth, evaluationController.getEvaluationById);
router.put('/:id', auth, evaluationController.updateEvaluation);
router.delete('/:id', auth, evaluationController.deleteEvaluation);

module.exports = router;
