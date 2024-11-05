const express = require("express");
const envRouter = express.Router();

//const  {envelopes, getById,deleteById,createEnv,updateEnv,transfer} = require('./db');
const newDb = require('../new_db');

//GET all envelopes
envRouter.get('/',newDb.getAllEnv)

//GET by title
envRouter.get('/:title',newDb.getEnv)

//DELETE by title
envRouter.delete('/:title',newDb.deleteEnv)

//CREATE envelopes
envRouter.post('/',newDb.createEnv)

//UPDATE envelope
envRouter.put('/:title',newDb.updateEnv)

//TRANSFER envelope
envRouter.put('/:from/:to',newDb.transferEnv)

module.exports = envRouter

/*  12/5/2023
    getAllEnv WORKS
    getByTitle WORKS

    12/6/2023
    createEnv WORKS
    deleteEnv WORKS
    updateEnv WORKS
    transferEnv WORKS

*/
