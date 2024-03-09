const express = require("express");
const transRouter = express.Router();

const newDb = require('../new_db');

//GET all transactions
transRouter.get('/',newDb.getAllTrans)

//GET by title
transRouter.get('/:title',newDb.getTrans)

//DELETE by id
transRouter.delete('/:receipt',newDb.deleteTrans)

//CREATE transaction
transRouter.post('/',newDb.createTrans)

module.exports = transRouter

/*  12/9/2023
    Transactions file
    

*/
