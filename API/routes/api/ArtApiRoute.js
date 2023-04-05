const express= require('express');
const router = express.Router();

const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();
const isAuth = require('../../middleware/isAuth');

const artApiController = require("../../api/ArtworkAPI");

router.get('/',artApiController.getArtworks);
router.get('/:artId',artApiController.getArtworkById);
router.post('/',jsonParser,artApiController.createArtwork);
router.put('/:artId',jsonParser,artApiController.updateArtwork);
router.delete('/:artId',artApiController.deleteArtwork);

module.exports = router;
