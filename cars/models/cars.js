const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    title: { type: String, required: false, },
    description: { type: String, required: false, },
    price: { type: String, required: false, },
    area: { type: String, required: false, },
    status: { type: String, required: false, },
    filename: { type: String, required: false, },
    video: { type: String, required: false, },
    address: { type: String, required: false, },
    country: { type: String, required: false, },
    state: { type: String, required: false, },
    city: { type: String, required: false, },
    neighborhood: { type: String, required: false, },
    zip: { type: String, required: false, },
    lat: { type: String, required: false, },
    lon: { type: String, required: false, },
    model: { type: String, required: false, },
    year: { type: String, required: false, },
    kms: { type: String, required: false, },
    color: { type: String, required: false, },
    power_window: { type: String, required: false, },
    sun_roof: { type: String, required: false, },
    smart_audio_system: { type: String, required: false, },
    leather_seat_cover: { type: String, required: false, },
    alloy_wheels: { type: String, required: false, },
    owner: { type: String, required: false, },
    hypothecation: { type: String, required: false, },
    air_bag: { type: String, required: false, },
    no_of_cly: { type: String, required: false, },
    seating_capacity: { type: String, required: false, },
    year_built: { type: String, required: false, },
    cc: { type: String, required: false, },
    fuel_type: { type: String, required: false, },
    varient: { type: String, required: false, },
},
    { timestamp: true }
)

module.exports = mongoose.model("car", carSchema);