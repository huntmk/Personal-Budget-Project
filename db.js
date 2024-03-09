
const envelopes = [
    {
      id: 1,
      title: "Rent",
      budget: 1000,
    },
    {
      id: 2,
      title: "Groceries",
      budget: 300,
    },
    {
      id: 3,
      title: "Entertainment",
      budget: 400,
    },
  ];

  let nextId = 4

  //add helper functions

  //getById
  const getById = (id) =>{
      let retrieved = -1
      envelopes.forEach( (env) => {
        if (env.id == id){
          retrieved = env
        }
      })

      if(retrieved != -1){
        return retrieved
      }else{
        return null
      }
  }

  //deleteById
  const deleteById = (env) =>{
      for (i in envelopes){
        if (env.id == envelopes[i].id){
          envelopes.splice(i,1)
          return true
        }
      }
      return false
    }
  

  //create
  const createEnv = (newEnv) =>{
    //add in id to object
    newEnv.id = nextId
    nextId++
    //then push
    envelopes.push(newEnv)
  }

  //update b
  const updateEnv = (env,body) =>{
    for (i in envelopes){
      if (env.id == envelopes[i].id){

        //check if exists the following
        if(body.budget){
          envelopes[i].budget = body.budget
        }

        if(body.title){
          envelopes[i].title = body.title
        }
        
        return envelopes[i]
      }
    }
  }

  const transfer = (fromEnv,toEnv,amount) =>{
    //check amount
    if (fromEnv.budget < amount){
      return false
    }

    //update from envelope
    const from_body = {}
    from_body.budget = fromEnv.budget - amount
    updateEnv(fromEnv,from_body)

    //update env
    const to_body = {}
    to_body.budget = toEnv.budget + amount
    updateEnv(toEnv,to_body)

    return true
  }

  
  module.exports = {envelopes, getById,deleteById,createEnv,updateEnv,transfer};