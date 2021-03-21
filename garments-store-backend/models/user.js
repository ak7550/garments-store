const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // https://www.npmjs.com/package/uuid
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 32
    },
    email: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true
    },
    userInfo: {
        sex: String,
        age: Number,
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0 // specifies the normal buyer
    },
    purchaseList: {
        type: Array,
        default: []
    },
    watchList: {
        type: Array,
        default: []
    },
    accountCreated: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true,
        maxLength: 100,
        default: ""
    },
    friends: [{
        type: mongoose.ObjectId, // this will accept or store the ids of user schema documents
    }]
}, {
    // The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema.The type assigned is Date. (docs)
    timestamps: true,
    // Mongoose assigns each of your schemas an id virtual getter by default which returns the document's _id field cast to a string, or in the case of ObjectIds, its hexString (docs)
    id: true,
});


// fullname is also a field that is not present into this schema, but gets populated whenver it nexessary that's why we are usign virtual here to code both of the getters and setters.
UserSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
}).set(function (name) {
    var str = name.split(" ");
    this.firstName = str[0];
    this.lastName = str[1];
});

UserSchema.virtual("password").get(function () {
    return this._password; // _ as this is not present in our schema, we have written here just for the testing purpose
}).set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encryptedPassword = this.securePassword(password);
});

// schema method docs=https://mongoosejs.com/docs/guide.html#methods
UserSchema.methods.securePassword = function (plainPassword) {
    // docs link==> https://nodejs.org/api/crypto.html#crypto_crypto
    if (!plainPassword) return "";
    else return crypto.createHmac('sha256', this.salt).update(plainPassword).digest('hex');
};
UserSchema.methods.authenticate = function (plainPassword) {
    return this.securePassword(plainPassword) === this.encryptedPassword;
};

// this creates a collection named User (docs)
const User = mongoose.model('User', UserSchema);

// exporting, so it can be imported by other files.
module.exports= User;