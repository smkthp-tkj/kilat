const mongoose = require('mongoose');
const mongouri = process.env.MONGO_URI;
mongoose.connect(mongouri || 'mongodb://localhost:27017/kilat');

module.exports = {
    Report: mongoose.model('Report', {
        room: String,
        class: String,
        students: [
            {
                uid: String,
                name: String,
                info: String,
            },
        ],
    }),
};
