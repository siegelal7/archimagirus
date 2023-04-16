const router = require("express").Router();
const db = require("../models");
// const auth = require("../middleware/auth");

router.post("/api/newingredient/:id", ({ body, params }, res) => {
  const id = params.id;
    db.Ingredient.create(body)
      .then((ingred) => {
        res.json(ingred);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  router.get("/api/getallingredients", (req, res) => {
    db.Ingredient.find({})
      .then((found) => {
        res.json(found);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

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