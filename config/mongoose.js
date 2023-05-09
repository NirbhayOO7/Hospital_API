const mongoose = require('mongoose');
let db;

main().catch(err => console.log(err));
async function main() {
    try {
        db=await mongoose.connect('mongodb://127.0.0.1:27017/Hospital');
    } catch (error) {
        console.log('Error connecting to database', err);
        return;
    }
}

module.exports = db;