const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, noteController.createNote);
router.get('/evaluation/:evaluationId', auth, noteController.getNotesByEvaluation);
router.get('/:id', auth, noteController.getNoteById);
router.put('/:id', auth, noteController.updateNote);
router.delete('/:id', auth, noteController.deleteNote);
router.get('/evaluation/:evaluationId/trierParMerite', auth, noteController.trierParMerite);
router.get('/evaluation/:evaluationId/telechargerEnCSV', auth, noteController.telechargerEnCSV);

module.exports = router;
