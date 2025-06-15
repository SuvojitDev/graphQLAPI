// models / User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({ 
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Validate password
UserSchema.methods.isValidPassword = async function (input) {
    return await bcrypt.compare(input, this.password);
};

module.exports = mongoose.model('User', UserSchema);
