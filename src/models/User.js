const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const user = new Schema({
    username: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    summoners: { type: Array }
}, { timestamps: true });

user.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

user.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', user);