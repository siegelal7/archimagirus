const router = require("express").Router();
const db = require("../models");
// const auth = require("../middleware/auth");

router.post("/api/newingredient/:id", ({ body, params }, res) => {
  const id = params.id;
  const fullJson={};
    db.Ingredient.create(body)
      .then((ingred) => {
        // res.json(ingred);
        fullJson['ingredJson']=ingred;
        db.Kitchen.findByIdAndUpdate(id, {"$push": { "ingredients": ingred._id }})
          .then(found=>{
            fullJson["kitchenUpdate"]=found;
            res.json(fullJson);
          })
          .catch(err=>{
            res.status(400).json(err);
          })
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

router.post("/api/newingredienttorecipe/:id/:recipeid", ({ body, params }, res) => {
  const id = params.id;
  const recipeid=params.recipeid;
  const fullJson={};
    db.Ingredient.create(body)
      .then((ingred) => {
        // res.json(ingred);
        fullJson['ingredJson']=ingred;
        db.Kitchen.findByIdAndUpdate(id, {"$push": { "ingredients": ingred._id }})
          .then(found=>{
            fullJson["kitchenUpdate"]=found;
            // res.json(fullJson);
            db.Recipe.findByIdAndUpdate(recipeid, {"$push": { "ingredient": ingred._id }}, {new: true})
              .then(updatedRecipe=>{
                fullJson["recipeUpdate"]=updatedRecipe;
                res.json(fullJson);
              })
          })
          .catch(err=>{
            res.status(400).json(err);
          })
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  router.get("/api/getallingredients/:id", (req, res) => {
    db.Ingredient.find({kitchen:req?.params?.id})
      .populate('kitchen')
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