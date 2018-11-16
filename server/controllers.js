var pet = require("./models");
var path = require("path");

module.exports = {
    allPets: function(req,res) {
        pet.find().sort({type: "asc"})
            .then(data => {
                console.log("Got all pets from the database.", data);
                return res.json(data);
            })
            .catch(err => {
                console.log("Got an error: ", err);
                return res.json(err);
            })
    },
    onePet: function(req,res) {
        pet.findById(req.params.id)
            .then(data => {
                console.log("Got one pet from the database.", data);
                return res.json(data);
            })
            .catch(err => {
                console.log("Got an error: ", err);
                return res.json(err);
            })
    },
    newPet: function(req,res) {
        pet.create(req.body)
            .then(data => {
                console.log("Created one pet in the database.", data);
                return res.json(data);
            })
            .catch(err => {
                console.log("Got an error: ", err);
                return res.json(err);
            })
    },
    editPet: function(req,res) {
        pet.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
            .then(data => {
                console.log("Updated one pet in the database.", data);
                return res.json(data);
            })
            .catch(err => {
                console.log("Got an error: ", err);
                return res.json(err);
            })
    },
    deletePet: function(req,res) {
        pet.findByIdAndDelete(req.params.id)
            .then(data => {
                console.log("Deleted one pet in the database.", data);
                return res.json(data);
            })
            .catch(err => {
                console.log("Got an error: ", err);
                return res.json(err);
            })
    },
    catchAll: function(req,res,next) {
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    }
}