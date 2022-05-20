const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, minLength: 3},
    email: String,
    hashedPassword: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.hashedPassword;
    },
});


module.exports = mongoose.model('User', userSchema)