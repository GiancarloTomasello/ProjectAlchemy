require("dotenv").config();
const express = require('express');
const app = express();
const axios = require('axios');


const { neon } = require("@neondatabase/serverless");
const PORT = process.env.PORT || 3001;


const sql = neon(process.env.DATABASE_URL);

app.use(express.json());


app.get('/', async (req,res) =>{
  // res.status(200)
  // res.send("Welcome to the root URL of Server")
  const sql = neon(`${process.env.DATABASE_URL}`);
  const response = await sql`SELECT version()`;
  const {version} = response[0];
  res.json({version});
});

app.listen(PORT, ()=> {
  console.log(`Listening to http://localhost:${PORT}`);
})

app.get('/getItems', async (req,res) =>{

  const itemList = new Object();

  try{
    const equipment = await axios.get('https://www.dnd5eapi.co/api/2014/equipment');
    const magicItemsRes = await axios.get('https://www.dnd5eapi.co/api/2014/magic-items');
    

    const eData = equipment.data
    const magicItem = magicItemsRes.data

    // const items['equipment'] = eData;

    itemList['equipment'] = eData;
    itemList['magicItems'] = magicItem;

    res.json(itemList)
  }catch (error){
    console.error('Error calling External API:', error)
    res.status(500).json({error: 'Failed to retrieve data from external API' })
  }
  
})

async function getEquiptment(){
  try{
    const response = await axios.get('https://www.dnd5eapi.co/api/2014/equipment')
    return response
  } catch(error){
    console.log(error)
  }
}