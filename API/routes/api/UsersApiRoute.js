const express= require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();
const isAuth = require('../../middleware/isAuth');

const userApiController = require("../../api/UserAPI");

router.post('/add',jsonParser,userApiController.createUser);
router.get('/:userId',jsonParser,userApiController.getUserById);

module.exports=router;
