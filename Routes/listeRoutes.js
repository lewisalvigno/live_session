const express = require('express');
const router = express.Router();
const listeController = require('../controllers/listeController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, listeController.createListe);
router.get('/', auth, listeController.getAllListes);
router.get('/:id', auth, listeController.getListeById);
router.put('/:id', auth, listeController.updateListe);
router.delete('/:id', auth, listeController.deleteListe);

module.exports = router;
