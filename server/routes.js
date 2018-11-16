var controller = require("./controllers");
module.exports = function(app) {
    app.get("/api/pets", controller.allPets);
    app.get("/api/pets/:id", controller.onePet);
    app.post("/api/pets", controller.newPet);
    app.put("/api/pets/:id", controller.editPet);
    app.delete("/api/pets/:id", controller.deletePet);
    app.all("*", controller.catchAll);
}