const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['MALE', 'FEMALE', 'OTHER', 'DO NOT WANT TO DISCLOSE']
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }
    ]
},{
        timestamps: true
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;