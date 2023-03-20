const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "https://avatars.dicebear.com/api/female/sdfsdf.svg",
  },
  videos: [Object],
  following: [Object],
  followers: [Object],
  role: {
    type: String,
    enum: ["User", "Kitchen Owner", "Kitchen Admin"],
    default: "User",
  },
//   sentMessages: [{ type: Schema.Types.ObjectId, ref: "SentMessage" }],
  // sentMessages: [Object],
  // receivedMessages: [Object],
//   receivedMessages: [{ type: Schema.Types.ObjectId, ref: "ReceivedMessage" }],
//   favorites: [{ type: Schema.Types.ObjectId, ref: "Kit" }],
  kitchen: [{ type: Schema.Types.ObjectId, ref: "Kitchen" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;