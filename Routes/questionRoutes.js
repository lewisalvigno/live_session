const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, questionController.createQuestion);
router.get('/evaluation/:evaluationId', auth, questionController.getQuestionsByEvaluation);
router.get('/:id', auth, questionController.getQuestionById);
router.put('/:id', auth, questionController.updateQuestion);
router.delete('/:id', auth, questionController.deleteQuestion);

module.exports = router;
