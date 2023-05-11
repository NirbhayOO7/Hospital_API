const Patient = require('../models/patient');
const Report = require('../models/report');

// create patient in the database if request is made by authenticated doctor
module.exports.create = async function(req, res){
    try {
        let pat = await Patient.findOne({phone: req.body.phone});
        if(pat){
            return res.status(200).json({
                message: 'Patient already exist',
                data: pat
            });
        }
        else{
            pat = await Patient.create(req.body); //if fails then map each req.body values 1 by 1.
            return res.status(200).json({
                message: 'Patient id created!',
                data: pat
            });
        }
        
    } catch (error) {
        console.log("Error creating patient profile", error);
        return res.status(500).json({
            message: "Intenal Server Error"
        });
    }
}

// create reports for a specific patient in the database if request is made by authenticated doctor
module.exports.createReport = async function(req, res){
    try {
        let report = await Report.create({
            createdBy: req.user._id,
            date: new Date(),
            status: req.body.status
        });

        let patient = await Patient.findById(req.params.id);
        patient.reports.push(report);
        patient.save();

        return res.status(200).json({
            message: "report created",
            data: report
        })
        
    } catch (error) {
        console.log('Error creating patient report', error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

// get reports for a specific patient in the database if request is made by authenticated doctor
module.exports.allReports = async function(req, res){
    try {
        let patient = await Patient.findById(req.params.id)
                                   .populate('reports')
                                   .sort('-createdAt');
        let patientReports = patient.reports;

        return res.status(200).json({
            message: "Patient Reports",
            data: patientReports
        });

    } catch (error) {
        console.log('Error creating patient report', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}