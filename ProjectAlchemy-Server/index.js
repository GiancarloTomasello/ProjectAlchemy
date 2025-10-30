require("dotenv").config();
const fs = require("fs");
const pg = require("pg");
const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());
//app.use(cors())

const port = process.env.DB_PORT;

console.log(process.env.DB_PORT);

const config = {
user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
    },
};

const client = new pg.Client(config);

client.connect(function (err) {
  if (err) throw err;
  client.query("SELECT VERSION()", [], function (err, result) {
    if (err) throw err;

    console.log(result.rows[0]);
    console.log("Running app")
    // client.end(function (err) {
    //   if (err) throw err;
    // });
  });
});

app.listen(port, (error)=>{
  if(!error){
    console.log(`Server running on port ${port}`)
  }else{
    console.log("Error occured, server did not start", error)
  }
})

app.get('/', (req,res) =>{
  res.status(200)
  res.send("Welcome to the root URL of Server")
});

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