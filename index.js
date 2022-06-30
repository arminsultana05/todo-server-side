const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require("dotenv").config()

const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.TODO_COLLECTION}:${process.env.TODO_PASS}@cluster0.ndeyttj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    console.log("db connected");

  const collection = client.db("to").collection("devices");
  async function run() {
    try {
      await client.connect();
      console.log('mongod connected');
      const taskCollection = client.db("todo-collection").collection("todotask");
  
      // read all task
      app.get("/tasks", async (req, res) => {
        const query = {};
        const cursor = taskCollection.find(query);
        const tasks = await cursor.toArray();
        res.send(tasks);
      });
  
      // read task by single id
      app.get("/tasks/:id", async (req, res) => {
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = await taskCollection.findOne(query);
        res.send(result);
      });
  
      // get add task data by post
      app.post("/add-task", async (req, res) => {
        const newTask = req.body;
        const result = await taskCollection.insertOne(newTask);
        res.send(result);
      });
  
      // delete task
      app.delete("/tasks/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await taskCollection.deleteOne(query);
        res.send(result);
      });
    } finally {
    }
  }
  
  run().catch(console.dir);
});


app.get("/", (req, res) => {
    res.send("HELL WORLD!");
  });
  
  // port
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
