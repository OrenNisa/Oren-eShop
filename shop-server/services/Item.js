import { Item } from "../models/Item.js";

export const getAllItems = () => {
  return Item.find({});
};

export const getItem = (id) => {
  return Item.findOne({ _id: id });
};

export const addItem = (item) => {
  const newItem = new Item(item);
  return newItem.save();
};

export const addMultipleItems = (items) => {
  const newItems = Item.insertMany(items);
  return newItems;
};

// export const updateItem = (id, updates) => {
//   const item = Item.findOne({ _id: id });
//   if (!item) {
//     return { error: "Item not found" };
//   }
//   Object.keys(updates).forEach((update) => (item[update] = updates[update]));
//   item.save();
//   return item;
// };

export const deleteItem = async (id) => {
  return Item.findOneAndDelete({ _id: id });
};
