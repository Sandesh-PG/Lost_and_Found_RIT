import jwt from 'jsonwebtoken';
import userModel from '../models/user.models.js';

//par bar bar token check karna bahut hecktike hai isliye hame middleware folder banathe hai

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized access, pls login!!"
        });
    }

    //we will first verify kya token hamne create kiya hai 
    //aur koi dusra server create kiya hai

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findOne({
            _id: decoded.id
        });

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            msg: "token not from our server"
        });
    }
}

export { authMiddleware };