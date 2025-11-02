require("dotenv").config();
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const {CreateStoreDTO} = require('./store.dto')


const { neon } = require("@neondatabase/serverless");
const PORT = process.env.PORT || 3001;


const sql = neon(process.env.DATABASE_URL);

app.use(express.json());
app.use(cors());


app.get('/', async (req,res) =>{
  // res.status(200)
  // res.send("Welcome to the root URL of Server")
  // const sql = neon(`${process.env.DATABASE_URL}`);
  const response = await sql`SELECT version()`;
  const {version} = response[0];
  res.json({version});
});

app.listen(PORT, ()=> {
  console.log(`Listening to http://localhost:${PORT}`);
})


app.get('/getStore/:id', async (req,res) =>{
  const storeId = parseInt(req.params.id);
  const result = await sql.query(`SELECT * from StoreFront where id = ${storeId}`);
  res.status(200).send(result);
})

app.get('/getStock/:id', async (req,res) =>{
  const storeId = parseInt(req.params.id);
  //console.log(req.params.id,storeId)
  const result = await sql.query(`SELECT * from storetoitem where store_id = ${storeId}`);
  console.log(result[0].api_index)
  res.status(200).send(result);
})

app.get('/getItems', async (req,res) =>{

  const itemList = new Object();

  try{
    const equipment = await axios.get('https://www.dnd5eapi.co/api/2014/equipment');
    const magicItemsRes = await axios.get('https://www.dnd5eapi.co/api/2014/magic-items');
    

    const eData = equipment.data
    const magicItem = magicItemsRes.data

    var dtoList = [];

    console.log('Retrieving individual item details')
    // This takes about 45s to retrieve. I need to cache or find a better way to retreive info
    equipmentList = new Object();
    for (i in eData.results){
      //console.log(eData.results[i])
      itemInfo = await axios.get('https://www.dnd5eapi.co'+eData.results[i].url);
      equipmentList[itemInfo.data.name] = itemInfo.data 
      const item = new CreateStoreDTO(
        itemInfo.data.index,
        itemInfo.data.name, 
        'equipment', 
        'basic',
        (itemInfo.data.cost.quantity.toString() + itemInfo.data.cost.unit),
        itemInfo.data.equipment_category.name,
        'issues With gear category',
        itemInfo.data.desc,
        itemInfo.data.weight
      ) 
      //console.log(item);
      dtoList.push(item);
    }
    // console.log(equipmentList)

    magicItemList = new Object();
    for (i in magicItem.results){
      //console.log(magicItem.results[i])
      itemInfo = await axios.get('https://www.dnd5eapi.co'+magicItem.results[i].url);
      magicItemList[itemInfo.data.name] = itemInfo.data

      const item = new CreateStoreDTO(
        itemInfo.data.index,
        itemInfo.data.name, 
        'magic-item', 
        itemInfo.data.rarity.name,
        ('n/a'),
        itemInfo.data.equipment_category.name,
        'n/a',
        itemInfo.data.desc,
        itemInfo.data.weight
      ) 
      //console.log(item);
      dtoList.push(item);
    }
    console.log('Individual Item data obtained')

    itemList['equipment'] = equipmentList;
    itemList['magicItems'] = magicItemList;

    res.json(dtoList)
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