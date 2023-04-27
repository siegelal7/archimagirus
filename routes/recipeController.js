const router = require("express").Router();
const db = require("../models");
const auth = require("../middleware/auth");

router.post('/api/makefood/:id', (req,res)=>{
    const id = req.params.id;
    const fullJson = {};
    db.Recipe.create(req.body)
        .then(newRecipe=>{
            fullJson['newRecipe']=newRecipe;
            // res.json(newRecipe);
            db.Kitchen.findByIdAndUpdate(id, {"$push": { "recipes": newRecipe._id }})
            .then(found=>{
                fullJson["kitchenUpdate"]=found;
                res.json(fullJson);
            })
            .catch(err=>{
                res.status(400).json(err);
            })
        })
        .catch(err=>{
            res.status(400).json(err);
        });
});

router.get('/api/recipe/:id', (req, res)=>{
    const id = req.params.id;
    db.Recipe.findById(id)
        .populate('ingredient')
        .populate('kitchen')
        .then(foundRecipe=>{
            res.json(foundRecipe);
        })
        .catch(err=>{
            res.status(400).json(err);
        });
});


// router.post("/api/kitchen", ({ body }, res) => {
//     db.Kitchen.create(body)
//       .then((newKitchen) => {
//         res.json(newKitchen);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//   router.get("/api/getkitchensbycreator/:id", auth,  (req, res) => {
//     let id = req.params.id;
//     db.Kitchen.find({creatorId:id})
//       // .populate("kits")
//       .then((found) => {
//         res.json(found);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//   router.get("/api/getkitchensbyid/:id", (req, res) => {
//     let id = req.params.id;
//     db.Kitchen.findById(id)
//       // .populate("kits")
//       .then((found) => {
//         res.json(found);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//   router.get("/api/getkitchenssearch/:term", (req, res) => {
//     let term= req.params.term;
//     db.Kitchen.find({kitchenName: new RegExp(term)})
//       // .populate("kits")
//       .then((found) => {
//         res.json(found);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   });

//   router.delete('/api/deleteperson/:id', (req,res)=>{
//     db.Name.findByIdAndDelete(req.params.id)
//       .then((person)=>{
//         res.json(person);
//       })
//       .catch((err)=>{
//         res.status(400).json(err);
//       });
//   });

  module.exports = router;