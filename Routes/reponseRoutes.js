const express = require('express');
const router = express.Router();
const reponseController = require('../controllers/reponseController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, reponseController.createReponse);
router.get('/question/:questionId', auth, reponseController.getReponsesByQuestion);
router.get('/:id', auth, reponseController.getReponseById);
router.put('/:id', auth, reponseController.updateReponse);
router.delete('/:id', auth, reponseController.deleteReponse);

module.exports = router;
