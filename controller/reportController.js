const Report = require('../models/report');

// get all the reports in the database which have a specific staus value, if request is made by authenticated doctor
module.exports.statusReport = async function(req, res){
    try {
        let reports = await Report.find({status: req.params.status});
        // console.log("reports filtered:", reports);

        return res.status(200).json({
            message: "Reports filtered!",
            data: reports
        });
        
    } catch (error) {
        console.log('Error creating patient report', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}