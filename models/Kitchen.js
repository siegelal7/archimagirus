const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KitchenSchema = new Schema({
  kitchenName: {
    type: String,
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
  // imageUrl: {
  //   type: String,
  // },
//   imageUrl: [Object],
  // videoUrl: {
  //   type: String,
  // },
//   videoUrl: [Object],
//   kitchenItems: [
//     {
//       affiliateLink: {
//         type: String,
//       },
//       makeupCategory: {
//         type: String,
//       },
//       linkClicks: {
//         type: Number,
//         default: 0,
//       },
//     },
//   ],
kitchenItems:[{ type: Schema.Types.ObjectId, ref: "Kitchen" }],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Kitchen = mongoose.model("Kitchen", KitchenSchema);
module.exports = Kitchen;