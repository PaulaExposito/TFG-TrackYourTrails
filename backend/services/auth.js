const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const User = require('../models/User');


// SignUp
async function signup(userDTO) {
    // Comprobar que se pasan el usuario y la contraseña en el DTO
    if (userDTO.username == null || userDTO.password == null)
        return -1;
    
    // Comprobar que el usuario no existe
    const userExists = await User.findOne({ "username": userDTO.username });
    if (userExists != null) 
        return -2;
        
    const user = new User(userDTO);

    // Cifrar la contraseña
    user.password = await user.encryptPass(user.password);
    
    // Crear token
    const payload = { '_id': user._id };
    const token = jwt.sign(payload, secret.jwt, { expiresIn: 60 * 60 * 24 });

    await user.save();
    return { user, token };
}


// LogIn
async function login(userDTO) {
    // Comprobar que se pasan el usuario y la contraseña en el DTO
    if (userDTO.username == null || userDTO.password == null)
        return -1;
    
    // Comprobar que el usuario no existe
    const user = await User.findOne({ "username": userDTO.username });
    if (user == null) 
        return -2;

    // Comprobar que la contraseña es correcta
    const correctPass = await user.validatePass(userDTO.password);
    if (!correctPass)
        return -3;

    // Token
    const payload = { '_id': user._id };
    const token = jwt.sign(payload, secret.jwt, { expiresIn: 60 * 60 * 24 });

    return { user, token };
}


// LogOut
async function logout(userDTO) {
    // Comprobar que se pasa el usuario para deslogearlo
    if (userDTO.username == null)
        return -1;

    return { userDTO, token: null };
}


module.exports = {
    signup,
    login,
    logout
};