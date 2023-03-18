const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: {
        type: String,
      },
    type: {
        type: String,
        enum: ["Vegetable", "Fruit", "Meat", "Nut", "Drink", "Dairy", "Fish"],
      },
    quantity: {
        type: Number
    }
});
const Ingredient = mongoose.model("Ingredient", IngredientSchema);
module.exports = Ingredient;