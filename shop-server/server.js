//imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  addItemController,
  addMultipleItemsController,
  deleteItemController,
  getAllItemsController,
  getItemController,
  updateItemController,
} from "./controllers/Item.js";

dotenv.config();
const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

//the initializing of the server itself
const app = express();

// middleware for the server
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", true);

//routes
app.get("/api/Shop/getAllItems", getAllItemsController);
app.get("/api/Shop/getItem/:id", getItemController);
app.post("/api/Shop/addItem", addItemController);
app.post("/api/Shop/addMultipleItem", addMultipleItemsController);
app.put("/api/Shop/updateItem/:id", updateItemController);
app.delete("/api/Shop/deleteItem/:id", deleteItemController);

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
