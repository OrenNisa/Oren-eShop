import { shopAllowedUpdates } from "../data/data.js";
import {
  addItem,
  addMultipleItems,
  deleteItem,
  getAllItems,
  getItem,
} from "../services/Item.js";

export const getAllItemsController = async (req, res) => {
  try {
    const allItems = await getAllItems();

    res.status(200).send({ allItems });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const getItemController = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await getItem(itemId);

    if (!item) {
      return res.status(404).send({ message: "Item not found." });
    }

    res.status(200).send(item);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const addItemController = async (req, res) => {
  try {
    const item = req.body;
    const newItem = await addItem(item);
    res.status(200).send(newItem);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const addMultipleItemsController = async (req, res) => {
  try {
    const items = req.body;
    const newItems = await addMultipleItems(items);
    res.status(200).send({ newItems });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const updateItemController = async (req, res) => {
  const { id } = req.params;

  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    shopAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const item = await getItem(id);
    if (!item) {
      res.status(404).send({ error: "Item not found" });
    }
    updates.forEach((update) => (item[update] = req.body[update]));
    await item.save();
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const deleteItemController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await deleteItem(id);
    if (!deletedItem) {
      res.status(404).send({ error: "Item not found" });
    }
    res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
