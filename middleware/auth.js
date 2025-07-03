import { SECRET } from "../index.js";
import jwt from 'jsonwebtoken'

export const authenticate = (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,SECRET);
        console.log('Decoded',decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:'Please Authenticate'})
    };
};