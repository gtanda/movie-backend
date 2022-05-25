const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, minLength: 3},
    email: {type: String, unique: true, required: true},
    hashedPassword: {type: String, require: true},
    watchList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VideoData'
        }]
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