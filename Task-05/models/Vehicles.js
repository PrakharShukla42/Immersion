const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleName: String,
    price: Number,
    image: String,
    desc: String,
    brand: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
