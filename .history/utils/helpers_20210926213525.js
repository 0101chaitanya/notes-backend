const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const genPassword = async(password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    console.log(salt, hash);
    return { hash, salt };
};
// TODO
const validPassword = async(password, hash, salt) => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

function issueJWT(user) {
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

const isAdmin = (req, res, next) => {

    /*   if (req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({ success: false, msg: "you must be an admin to access this route" })

    }
 */
    console.log(req);
    return next();
}

module.exports = {
    validPassword,
    genPassword,
    issueJWT,
    isAdmin
};