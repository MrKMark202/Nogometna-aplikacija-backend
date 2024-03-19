import User from "../models/Users.js";
import passwordHash from '../utils/middleware.js';
import authenticateToken from '../utils/middleware.js';
import verify  from '../utils/middleware.js';
import { Cookie } from "express-session";
import jwt from 'jsonwebtoken';

//ROUTER IMPORT
import { Router } from "express";
const router = Router();

//DOTENV IMPORT
import dotenv from 'dotenv';
dotenv.config();



router.post("/signUp", async (req, res) => {
    const { name, lname, email, password } = req.body
    const userDb = await User.findOne({ email })
    if (userDb) {
      res.status(400).send({ msg: "User already exist" })
    } else {
      const hashedPassword = passwordHash(password)
      const newUser = await User.create({ name, lname, email, password: hashedPassword })
      res.status(200).send({ msg: 'OK' })
      console.log('Korisnik kreiran')
    }
  
  })

  router.post("/login", async (req, res) => {
    const userDb = req.body;
    try {
      let result = await authenticateToken(userDb.email, userDb.password);
      
      
      res.cookie('token', result.token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        httpOnly: false, 
        secure: true, 
        sameSite: 'none'
      });
      
      res.send(result);
      
    } catch (e) {
      res.status(403).json({ error: e.message });
    }
  });
  
  
  router.post('/logout', (req, res) => {
    const cookieOptions = {
      httpOnly: false, 
      secure: true, 
      sameSite: 'none'
    };
    res.clearCookie('token', cookieOptions);
    res.status(200).json({ message: 'Logout successful' });
  });
  
  
export default router;