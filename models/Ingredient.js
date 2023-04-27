const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
      },
    type: {
        type: String,
        enum: ["Vegetable", "Fruit", "Meat", "Nut", "Drink", "Dairy", "Fish", "Fermented", "Starch"],
      },
    kitchen: { type: Schema.Types.ObjectId, ref: "Kitchen", required: true },
    quantity: {
        type: Number
    }
});
const Ingredient = mongoose.model("Ingredient", IngredientSchema);
module.exports = Ingredient;