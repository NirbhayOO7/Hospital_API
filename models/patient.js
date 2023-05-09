const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit],
        required: true
    }
},{
    timestamps: true
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;