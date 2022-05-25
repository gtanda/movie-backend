const mongoose = require('mongoose')

const videoDataSchema = new mongoose.Schema({
    title: {type: String, required: true},
    videoID: {type: String, required: true},
    posterPath: {type: String}
})

videoDataSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('VideoData', videoDataSchema)