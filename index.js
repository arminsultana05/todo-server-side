const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config()

const app = express();
//todo-collection
//Ce2k6phh5oRvAzPl
// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.TODO_COLLECTION}:${process.env.TODO_PASS}@cluster0.ndeyttj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('mongodb connected');
//   client.close();
// });
async function run(){
    try{
     await client.connect()
     console.log('mongodb connect again')
    }
    finally{
 
    }
 }
 run().catch(console.dri)


app.get("/", (req, res) => {
    res.send("HELLO WORLD!");
  });
  
  // port
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
