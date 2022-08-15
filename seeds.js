const mongoose = require('mongoose');
const User = require('./models/users');

// Connect to the DB
mongoose.connect('mongodb://localhost:27017/fairwork')
    .then(() => {
        console.log("Connection Open")
    })
    .catch(err => {
        console.log("Error")
        console.log(err)
    });

//  Generate Seeding Data for 15 users
let firstNames = ['Eddison', 'Maheen', 'Vanessa', 'Raihan', 'Zaid', 'Milly', 'Mae', 'Shannen',
    'Siyana', 'Denis', 'Joanne', 'Celeste', 'Peter', 'Lacey', 'Kimberly']

let lastNames = ['Sellers', 'Millington', 'Sears', 'Fry', 'Cote', 'Corrigan', 'Whyte', 'Owen',
    'Burn', 'Soloman', 'Freeman', 'Tate', 'Wall', 'Sullivan', 'Rivas']

// Use first and last names to create fake emails
const createEmails = () => {
    emails = [];
    for (let i = 0; i < firstNames.length; i++) {
        newEmail = `${firstNames[i][0]}${lastNames[i]}@fakeemail.com`
        emails.push(newEmail)
    };
    return emails;
}

let zip = [60605, 60707, 60827, 97402, 60661, 31313, 60659, 60657, 11561, 60651, 60647,
    60643, 59901, 60634, 92307]

let employers = ['Taco Bell', 'Target', 'Motel 6', 'Elite Staffing', 'Ice Cream Truck', 'Will Welder',
    'Chicago Public Schools', 'Catering by Sally', 'Fiserv Forum', 'Kaiser Permanente', 'YMCA',
    'City of Chicago', 'Chicago Dialysis Center', 'JPMorgan Chase', 'Walgreens']

let industries = ['restaurant', 'retail', 'hotel', 'warehouse', 'restaurant', 'manufacturing', 'other',
    'restaurant', 'building services', 'healthcare', 'other', 'other', 'healthcare', 'other', 'retail']

let wages = [10, 12.50, 17, 23, 7.50, 40, 22, 18, 14, 30, 11, 26, 21, 48, 12]

let employee = [true, true, true, true, false, true, true, true, true, true, true, true, true, true, true]
let temp = [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false]
let union = [false, false, false, false, false, true, true, false, false, false, false, false, false, false, false]
let banquet = [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false]
let chicago = [true, true, true, true, false, true, true, true, false, true, true, true, true, true, true]

const seedDB = async () => {
    // clear any existing users in the database
    await User.deleteMany({});
    // run the function to generate the fake email addresses using names
    createEmails();
    // loop through above arrays to create fake users
    for (let i = 0; i < firstNames.length; i++) {
        const user = new User({
            firstName: `${firstNames[i]}`,
            lastName: `${lastNames[i]}`,
            email: `${emails[i]}`,
            // Generate a random 9 digit number as a fake phone number
            phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            zip: `${zip[i]}`,
            employer: `${employers[i]}`,
            industry: `${industries[i]}`,
            wage: `${wages[i]}`,
            isEmployee: `${employee[i]}`,
            isUnionized: `${union[i]}`,
            isTempWorker: `${temp[i]}`,
            isBanquetWorker: `${banquet[i]}`,
            inChicago: `${chicago[i]}`
        })
        // save each user
        await user.save();
    }
    console.log('User Seeding Complete.')
}

// after the new data is seeded, close the mongodb connection
seedDB().then(() => {
    mongoose.connection.close()
});