var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/pets_db", {useNewUrlParser:true});

var PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A pet name is required.'],
        minlength: [3, 'Pet name must be at least 3 charaters.'],
        unique: true
    },
    type: {
        type: String,
        required: [true, 'Pet type is required.'],
        minlength: [3, 'Pet type must be at least 3 characters.']
    },
    description: {
        type: String,
        required: [true, 'A description of the pet is required.'],
        minlength: [3, 'The description must be at least 3 characters.']
    },
    likes: {
        type: Number,
        default: 0
    },
    skill_one: {type: String},
    skill_two: {type: String},
    skill_three: {type: String}
});

module.exports = mongoose.model("Pet", PetSchema);