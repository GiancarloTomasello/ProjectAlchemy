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
        itemInfo.data.cost.quantity.toString(),
        itemInfo.data.cost.unit,
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
        -1,
        'gp',
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

app.get('/getStoreLayout/:id', async (req, res) =>{
  const storeId = parseInt(req.params.id);
  const result = await sql.query(`SELECT store_layout from storefront where id = ${storeId}`);
  res.status(200).send(result[0].store_layout);
})

app.put('/saveStoreCatalog/:id', async (req,res) =>{
  const storeID = parseInt(req.params.id)
  console.log("req body:", req.body)

  queryStr = (
    `MERGE INTO storetoitem sti
    USING (VALUES 
    `)

  for (i in req.body){
    queryStr += ` ('${req.body[i].api_index}', '${JSON.stringify(req.body[i].overrides)}'::JSON, ${storeID}, ${req.body[i].inStock})`
    if(i < Object.keys(req.body).length-1){
      queryStr+=','
    }
  }

  queryStr += (
    `) AS temp_table(api_index, overrides, store_id, in_stock) 
    ON sti.api_index = temp_table.api_index AND sti.store_id = temp_table.store_id
    WHEN MATCHED AND temp_table.in_stock = false THEN
      UPDATE SET
        store_id = 2
    WHEN MATCHED AND temp_table.in_stock = true THEN
      UPDATE SET
        api_index = temp_table.api_index,
        overrides = temp_table.overrides,
        store_id = temp_table.store_id
    WHEN NOT MATCHED AND temp_table.in_stock = true THEN
      INSERT (api_index, overrides, store_id)
      VALUES (temp_table.api_index, temp_table.overrides, temp_table.store_id)
    WHEN NOT MATCHED AND temp_table.in_stock = false THEN
      DO NOTHING
    `
  )

  console.log(queryStr)
 await sql.query(queryStr);
 
  const result = req.body.filter(item => item.inStock === true)

  res.status(200).send(result);
})

app.put('/saveStoreLayout/:id', async (req,res)=> {
  
  const storeId = parseInt(req.params.id);

  const query = `
    UPDATE storefront
      SET store_layout = '${JSON.stringify(req.body)}'::JSON
      where id= ${storeId}
  `

  console.log("body= ", JSON.stringify(req.body))
  console.log(query)

  const result = await sql.query(query);

  res.status(200).send(result);
})

app.get('/getStoresByUser/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(userId)

  const query = `
    Select *
    FROM storefront
    WHERE owner_id = ${userId}
  `

  console.log(query)

  try{    
    const result = await sql.query(query);
    res.status(200).send(result)
  }catch(e){
    console.error('Error retreiving Stores:', e)
    res.status(500).json({error: 'Failed to retrieve Stores from user id' })
  }
})

app.get('/getUserIdByName/:username', async (req, res) => {
  const userName = req.params.username
  console.log(userName)

  const query = `
    Select id
    FROM users
    WHERE username = '${userName}'
  `

  console.log(query)

  try{    
    const result = await sql.query(query);
    res.status(200).send(result)
  }catch(e){
    console.error('Error retreiving Stores:', e)
    res.status(500).json({error: 'Failed to retrieve Stores from user id' })
  }
})

app.put('/createShop', async(req,res) =>{
  console.log(req.body.shopname)

  const campaign_id = req.body.campaignId === undefined ? null : req.body.campaignId

  const query = `
    INSERT into storefront  (store_name, welcome_message, 
    campaign_id, "isPublic", store_layout)
    VALUES ($$${req.body.shopname}$$, $$${req.body.welcomeMessage}$$,
     ${campaign_id}, ${req.body.isPublic}, '${JSON.stringify(req.body.storeLayout)}'::JSON)
  `
  console.log(query)

  try{
    const result = await sql.query(query);
    res.status(200).send(result)
  }catch(e){
    console.error('Error creating new store:', e)
    res.status(500).json({error: 'Failed to create new store' })
  }
})

app.put('/updateShop', async(req,res) => {
  const query = `
    UPDATE storefront SET
      store_name = $$${req.body.shopName}$$,
      welcome_message = $$${req.body.welcomeMessage}$$,
      campaign_id = ${req.body.campaign_id},
      npc_sentiment = $$${req.body.storeSentiment}$$,
      "isPublic" = ${req.body.isPublic}
    WHERE id = ${req.body.shopId}
  `
    console.log(query)

    try {
      const result = await sql.query(query);
      res.status(200).send(result)
    }catch (error){
      console.error('Error updating store details:', error)
      res.status(500).json({error: 'Failed to update store details' })
    }
})

app.put('/createCampaign', async(req,res) =>{
  console.log('Req.body:', req.body)

  // const campaign_id = req.body.campaign_id === undefined ? null : req.body.campaign_id

  const query = `
    INSERT into campaigns (campaign_name, user_id, campaign_desc)
    VALUES ($$${req.body.campaignName}$$, ${req.body.userId}, $$${req.body.campaignDesc}$$)
  `
  console.log("query", query)

  try{
    const result = await sql.query(query);
    res.status(200).send(result)
  }catch(e){
    console.error('Error creating new store:', e)
    res.status(500).json({error: 'Failed to create new store' })
  }
})

app.get('/getCampaigns/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(userId)

  const query = `
    Select *
    FROM campaigns
    WHERE user_id = ${userId}
  `

  console.log(query)

  try{    
    const result = await sql.query(query);
    res.status(200).send(result)
  }catch(e){
    console.error('Error retreiving Stores:', e)
    res.status(500).json({error: 'Failed to retrieve Stores from user id' })
  }
})

app.get('/getStoresByCampaign/:id', async (req, res) => {
  const campaignId = parseInt(req.params.id);
  console.log(campaignId)

  const query = `
    Select *
    FROM storefront
    WHERE campaign_id = ${campaignId}
    order by id
  `

  console.log(query)

  try{    
    const result = await sql.query(query);
    res.status(200).send(result)
  }catch(e){
    console.error('Error retreiving Stores:', e)
    res.status(500).json({error: 'Failed to retrieve Stores from user id' })
  }
})

app.put('/updateItemValues/:id', async (req,res)=> {
  
  const itemId = parseInt(req.params.id);

  const query = `
    UPDATE storetoitem
      SET overrides = '${JSON.stringify(req.body)}'::JSON
      where id= ${itemId}
  `

  console.log("body= ", JSON.stringify(req.body))
  console.log(query)

  await sql.query(query);

  res.status(200).send("Info updated");
})

app.put('/updateItemValuesByName', async (req,res)=> {
  
  const query2 = `
    INSERT INTO storetoitem (api_index, overrides, store_id)
    VALUES ('${req.body.itemId}', $$${JSON.stringify(req.body.overrides)}$$::JSON, ${req.body.storeId})
    ON CONFLICT(api_index,store_id)
    DO UPDATE SET
      overrides = $$${JSON.stringify(req.body.overrides)}$$::JSON
  `

  // console.log("body= ", JSON.stringify(req.body))
  console.log(query2)

  await sql.query(query2);

  res.status(200).send("Done!");
})

app.put('/makePurchase/:storeId', async(req, res)=>{
  const storeId = parseInt(req.params.storeId);
  const currentDate = new Date();
  const query = `
    INSERT into orders (store_id, item_list, date_purchased)
    VALUES (${storeId}, $$${JSON.stringify(req.body)}$$::JSON, NOW())
  `
  console.log(query)

  await sql.query(query);

  res.status(200).send("done");
})

app.get('/getOrders/:storeId', async(req, res)=>{
  const storeId = parseInt(req.params.storeId);
  const currentDate = new Date();
  const query = `
    SELECT *
    from orders
    where store_id = ${storeId}
    order by date_purchased desc
  `
  console.log(query)

  result = await sql.query(query);

  res.status(200).send(result);
})