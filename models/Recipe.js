const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  recipeName: {
    type: String,
    required: true
  },
  recipeDescription: {
    type: String,
  },
  uniqueVisits: {
    type: Number,
    default: 0,
  },
  creatorId: {
    type: String,
  },
  kitchen:[{ type: Schema.Types.ObjectId, ref: "Kitchen" }],
//   members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  ingredient:[{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;