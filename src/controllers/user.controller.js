const User = require('../models/User');
const userCtrl = {};
const jwt = require('jsonwebtoken');

userCtrl.register = async (req, res) => {
    const errors = [];
    const { username, email, password, confirm_password, summoners } = req.body;
    if (password != confirm_password) {
        errors.push({ error: "Las contraseñas no coinciden" });
    }
    if (password.length < 4) {
        errors.push({ error: "La contraseña debe tener al menos 4 caracteres" })
    }
    const userEmail = await User.findOne({ email: email });
    const userName = await User.findOne({ username: username });
    if (userEmail) {
        errors.push({ error: "El email ya esta siendo utilizado" });
    }
    if (userName) {
        errors.push({ error: "El nombre de usuario ya esta siendo utilizado" });
    }
    if (errors.length > 0) {
        res.json(errors)
    } else {
        const newUser = new User({ username, email, password, summoners });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.status(200).json({ "statusCode": 200, "message": "Usuario registrado" });
    }
}

userCtrl.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });  // Comprueba si existe el email en la base de datos
    if (!user) {
        return res.status(401).json({ "statusCode": 401, "message": "No existe el email" });
    } else {

        if (await user.matchPassword(password)) {
            const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY);     // Si coinciden las contraseñas asigna un token
            return res.status(200).json({ "statusCode": 200, "token": token })
        } else {
            return res.status(401).json({ "statusCode": 401, "message": "Credenciales incorrectas" });
        }
    }

};

userCtrl.profile = async (req, res) => {
    const user = await User.findOne({ _id: req.userId });
    if (user) {
        res.json(user)
    }
}


userCtrl.logout = (req, res) => {
    res.send("Logout");
}


userCtrl.getUsers = async (req, res) => {
    const listOfUsers = [];

    for await (let user of User.find()) {
        listOfUsers.push({ "username": user.username, "summoners": user.summoners });
    }

    return res.status(200).json(listOfUsers);

}

userCtrl.updateSummoners = async (req, res) => {
    const { servidor, username } = req.body;
    let changes = { servidor: servidor, username: username };

    User.findOneAndUpdate({ _id: req.userId }, {
        "$set": { "summoners": changes }
    }, (err, add) => {
        if (err) throw err;
        res.status(200).json({ "message": "summoner añadido" })
    })
}
userCtrl.getSummoners = async (req, res) => {
    const usuario = User.find({ _id: req.userId });
    res.json(usuario.summoners)
}

module.exports = userCtrl;