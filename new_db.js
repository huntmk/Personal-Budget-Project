
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Personal_Budget_Project',
  password: 'postgres',
  port: 5432,

})

/* 

ENVELOPE Functions

*/
//Get All Envelopes
const getAllEnv = async(req,res,next) =>{
    try {
      const results = await pool.query('SELECT * FROM envelopes ORDER BY id ASC')
      return res.status(200).json(results.rows)

    } catch (error) {
      return res.status(500).json(error)
    }

}

//Get Specific Envelope
const getEnv = async(req,res,next) =>{
  const title = req.params.title

  try {
    const results = await pool.query('SELECT * FROM envelopes WHERE title = $1', [title])
    res.status(200).json(results.rows)

  } catch (error) {
    return res.status(500).json(error)
  }
    
}

//Delete Envelope
const deleteEnv = async(req,res,next) =>{
  const title = req.params.title

  try {
    await pool.query('DELETE FROM envelopes WHERE title = $1', [title])
    res.status(200).send(`User deleted with Title: ${title}`)
    
  } catch (error) {
    return res.status(404).json(error)
  }
    
}

//Create Envelope
const createEnv = async(req,res,next) =>{

  const title = req.body.title
  const budget = req.body.budget

  try {
    const results = await pool.query('INSERT INTO envelopes (title, budget) VALUES ($1, $2) RETURNING *')
    res.status(201).send(`Envelope added with ID: ${results.rows}`)

  } catch (error) {
    return res.status(500).json(error)
  }
}

//Update Envelope
const updateEnv = async(req,res,next) =>{
  
  const title = req.params.title
  const updatedTitle = req.body.title
  const budget = req.body.budget

  //prepare queries for different scenarios
  let query;
  let args;

  if(updatedTitle && budget){
    query = 'UPDATE envelopes SET title = $1, budget = $2 WHERE title = $3'
    args = [updatedTitle,budget,title]
  }

  else if(!updatedTitle && !budget){
    res.status(500).send('Request body is emtpy')
    throw 'Request body is emtpy'
  }

  else if(!updatedTitle){
    query = 'UPDATE envelopes SET budget = $2 WHERE title = $1'
    args = [title,budget]
  }

  else if(!budget){
    query = 'UPDATE envelopes SET title = $1 WHERE title = $2'
    args = [updatedTitle,title]
  }

  try {

    await pool.query(query,args)
    res.status(200).send(`User modified with Title: ${title}`)

  } catch (error) {

    return res.status(500).json(error)
  }

}

//Transfer Env Function
 const transferEnv = async (req,res,next) =>{

  //Get amounts from body and params
  const amount = parseInt(req.body.amount)
  const fromEnv = (req.params.from)  
  const toEnv = (req.params.to)
  
  //Will allow negative values for time being
  

  //UPDATE From Envelope
  try {
    await pool.query('UPDATE envelopes SET budget = (budget - $1) where title = $2;', [amount,fromEnv])
    
  } catch (error) {

    return res.status(500).send(error)
  }

  //Update To Envelope

  try {
    await pool.query('UPDATE envelopes SET budget = (budget + $1) where title = $2;',[amount,toEnv])
    
  } catch (error) {
    return res.status(500).send(error)
  }
  
  //Send response if error has not been encountered yet
  return res.status(200).send(`Updates to ${fromEnv} and ${toEnv}`)
}


//GET all Transactions
const getAllTrans = async(req,res,next) =>{
  try {
    const results = await pool.query('SELECT * FROM transactions ORDER BY receipt ASC')
    return res.status(200).json(results.rows)

  } catch (error) {
    return res.status(500).json(error)
  }
  
}

//Get Specific Transaction
const getTrans = async(req,res,next) =>{
  const title = req.params.title

  try {
    const results = await pool.query('SELECT * FROM transactions WHERE env_title = $1', [title])
    res.status(200).json(results.rows)

  } catch (error) {
    return res.status(500).json(error)
  }
    
}

//Delete Specific Transaction
const deleteTrans = async(req,res,next) =>{
  const receipt = req.params.receipt

  try {
    await pool.query('DELETE FROM transactions WHERE receipt = $1', [receipt])
    res.status(200).send(`Receipt $1 deleted. ${receipt}`)
    
  } catch (error) {
    return res.status(404).json(error)
  }

}

//Create Transaction
const createTrans = async(req,res,next) =>{
  const amount = req.body.amount
  const title = req.body.title

  try {
    const results = await pool.query('INSERT INTO transactions (pay_amount, env_title) VALUES ($1, $2) RETURNING *', [amount,title])
    res.status(201).send('Transaction added to $1',[title])

  } catch (error) {
    return res.status(500).json(error)
  }
}

/*

12/9/2023
TRANSACTION Table In Progress
Triggers:
Create -> should change budget in envelopes table based on payment amount
Update -> (can only update payment amount) if new_pay_amt > old_pay_amt, then envelopes.budget - (new-old)
                                if new_pay_amt < old_pay_amt, then envelopes.budget + (new-old)
Delete -> envelopes.budget += pay_amt


1/30/2024
Working on Transaction Endpoints
getAll = Good
getByTitle = Good
deleteTrans = Good
createTrans = In Progress (Working on Trigger)

Won't use updateTrans = no point in endpoint

*/


//Exports
module.exports = {getAllEnv, getEnv, deleteEnv, updateEnv, transferEnv, createEnv ,getAllTrans, getTrans,deleteTrans,createTrans};