import Food from "../models/food.model.js";

export const getPublicFoodItems = async (req, res, next) => {
  try {
    const items = await Food.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const getPublicFoodCategories = async (req, res, next) => {
  try {
    const categories = await Food.findCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const addChefFoodItem = async (req, res, next) => {
  try {
    const { name, description, price, chefId, imageUrl, categoryId } = req.body;
    if (!name || !chefId || !categoryId) {
      return res.status(400).json({ error: 'name, chefId, and categoryId are required' });
    }
    const item = await Food.create(name, description || '', price || 0, chefId, imageUrl || '', categoryId);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteChefFoodItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { chefId } = req.body;
    // Fetch item first to verify ownership
    const all = await Food.findAll();
    const item = all.find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Food item not found' });
    if (chefId && item.chefId !== chefId) {
      return res.status(403).json({ error: 'You do not own this item' });
    }
    const deleted = await Food.deleteById(id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
};
