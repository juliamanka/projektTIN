const express= require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();
const isAuth = require('../../middleware/isAuth');


const consApiController = require("../../api/ConservatorAPI");

router.get('/',consApiController.getConservators);
router.get('/:consId',consApiController.getConservatorById);
router.post('/add',isAuth,jsonParser,consApiController.createConservator);
router.put('/:consId',jsonParser,consApiController.updateConservator);
router.delete('/delete/:consId', isAuth, consApiController.deleteConservator);

module.exports = router;
