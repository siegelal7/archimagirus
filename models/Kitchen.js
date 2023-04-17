const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KitchenSchema = new Schema({
  kitchenName: {
    type: String,
    required: true
  },
  kitchenDescription: {
    type: String,
  },
  uniqueVisits: {
    type: Number,
    default: 0,
  },
  creatorId: {
    type: String,
  },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  ingredients:[{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Kitchen = mongoose.model("Kitchen", KitchenSchema);
module.exports = Kitchen;