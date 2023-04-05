const express= require('express');
const router = express.Router();

const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();

const artConsApiController = require("../../api/ArtConservatorAPI");

router.get('/',artConsApiController.get);
router.get('/:artConsId',artConsApiController.getArtConservatorById);
router.post('/',jsonParser,artConsApiController.createArtConservator);
router.put('/:artConsId',jsonParser,artConsApiController.updateArtConservator);
router.delete('/:artConsId',artConsApiController.deleteArtConservator);
router.delete('/', artConsApiController.deleteMany);

module.exports = router;
