const router = require("express").Router();
const db = require("../models");
// const auth = require("../middleware/auth");

// router.post("/api/name", ({ body }, res) => {
//     db.Name.create(body)
//       .then((person) => {
//         res.json(person);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//   router.get("/api/getallnames", (req, res) => {
//     db.Name.find({})
//       // .populate("kits")
//       .then((found) => {
//         res.json(found);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//   router.delete('/api/deleteaperson/:id', (req,res)=>{
//     db.Name.findByIdAndDelete(req.params.id)
//       .then((person)=>{
//         res.json(person);
//       })
//       .catch((err)=>{
//         res.status(400).json(err);
//       });
//   });

  module.exports = router;