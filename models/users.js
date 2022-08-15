const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: Number,
    zip: Number,
    employer: String,
    industry: {
        type: String, lowercase: true,
        enum: [
            "building services",
            "healthcare",
            "hotel",
            "manufacturing",
            "restaurant",
            "retail",
            "warehouse",
            "other"
        ]
    },
    wage: Number,
    isEmployee: { type: Boolean, default: null },
    isUnionized: { type: Boolean, default: null },
    isTempWorker: { type: Boolean, default: null },
    isBanquetWorker: { type: Boolean, default: null },
    isHourly: { type: Boolean, default: true },
    inChicago: { type: Boolean, default: null },
    coveredIndustry: { type: Boolean, default: null },
    coveredEmployer: { type: Boolean, default: null },
    coveredSalary: { type: Boolean, default: null },
    isCovered: { type: Boolean, default: null },
    firstLogin: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})

const morgan = new User(
    {
        firstName: 'Morgan',
        lastName: 'schumann',
        email: 'morgan.schumann@gmail.com',
        wage: 15.00,
        industry: "Healthcare"
    });

// morgan.save()

module.exports = User;