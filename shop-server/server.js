//imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { shopAllowedUpdates } from "./data/data.js";

dotenv.config();
const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

//the initializing of the server itself
const app = express();

// middleware for the server
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", true);

//schemas
const ShopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    rate: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
});

// model related to the specific schema
const Item = mongoose.model("Item", ShopSchema);

//routes

//get - fetch data from db -- mongo function findOne({condition:condition}) \ find({condition:condition}) or find({})
//post - add an item to the db -- new Model({paramters:parmeters}) --> model.save()
//put - edit an item inside the db --> valid operations --> findOne({condition:condition}) --> model.save()
//delete - delete an item from the db --> findOneAndDelete({condition:condition})

app.get("/api/Shop/getAllItems", async (req, res) => {
  try {
    const allItems = await Item.find({});

    res.status(200).send(allItems);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.post("/api/Shop/addItem", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post("/api/Shop/addMultipleItem", async (req, res) => {
  try {
    const items = await Item.insertMany(req.body);
    res.status(201).send({ items });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.put("/api/Shop/updateItem/:id", async (req, res) => {
  const { id } = req.params;

  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    shopAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const item = await Item.findOne({ _id: id });
    if (!item) {
      res.status(404).send({ error: "Item not found" });
    }
    updates.forEach((update) => (item[update] = req.body[update]));
    await item.save();
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.delete("/api/Shop/deleteItem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findOneAndDelete({ _id: id });
    if (!deletedItem) {
      res.status(404).send({ error: "Item not found" });
    }
    res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//mongoose connection string
// mongoose.connect("mongodb://127.0.0.1:27017/oren-eshop", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (info) => {
    app.listen(PORT, () => {
      console.log("info", info);
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  }
);

//listener at the bottom which concludes the
//listening function to fulfuill all of the requests
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });
