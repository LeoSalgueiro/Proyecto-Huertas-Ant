const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario');//const db = require('_helpers/db'); 


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate(req/*{ username, password }*/) {
    console.log('Este es user: '+req.email)
    
    const user = await Usuario.findOne({email:req.email});
    
    if (user && bcrypt.compareSync(req.password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        
        return {
            ...user.toJSON(),
            token
        };
        
    }
}

async function getAll() {
    return await Usuario.find();
}

async function getById(id) {
    return await Usuario.findById(id);
}

async function create(userParam) {
    // validate
    if (await Usuario.findOne({ username: userParam.email })) {
        throw 'Usuario: "' + userParam.email + '" ya existe';
    }

    const user = new Usuario(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    console.log(user)
    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await Usuario.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await Usuario.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}