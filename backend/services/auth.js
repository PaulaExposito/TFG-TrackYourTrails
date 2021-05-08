const User = require('../models/User');


// SignUp
async function signup(userDTO) {
    const userExists = await User.findOne({ "username": userDTO.username });
    if (userExists != null) 
        return null;

    // TODO: Crear token
    
    const user = new User(userDTO);
    await user.save();
    return user;
}


// LogIn
async function login(userDTO) {
    const user = await User.findOne({ 
        "username": userDTO.username
    });

    // if (user != null)
    // TODO: Crear token

    return user;
}


// LogOut
async function logout(userDTO) {
    const user = await User.findOne({ 
        "username": userDTO.username
    });

    // TODO: Eliminar token
}


module.exports = {
    signup,
    login,
    logout
};