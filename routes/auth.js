import User from "../models/Users.js";
import auth from "../utils/authenticateToken.js"
import passwordHash from '../utils/passwordHash.js'

//ROUTER IMPORT
import { Router } from "express";
const router = Router();
 
//DOTENV IMPORT
import dotenv from 'dotenv';
dotenv.config();


router.post("/signUp", async (req, res) => {
  try{

    let { ime, prezime, email, password, datumRodenja, profilna, pin } = req.body

    const userDb = await User.findOne({ email })
    if (userDb) {
      res.status(400).send({ msg: "User already exist" })
    } else {
      const hashedPassword = passwordHash(password)
      const newUser = await User({ ime: ime, prezime: prezime, email: email, password: hashedPassword, datumRodenja: datumRodenja, profilnaSlika: profilna, pin: pin });
      await newUser.save();
      console.log('Korisnik kreiran')
      return res.status(200).json({result: true});
    }
  } catch(error) {
      console.log(error);
        return res.status(500).json({result: false, error: 'Internal server error'});
    }
})

router.post("/login", async (req, res) => {
  
  let {email, password} = req.body;
    
  try {
    let result = await auth.authenticateToken(email, password)
    res.json(result);
  } catch(error) {
    res.status(401).json({error: error.message})
  }
    
});

router.patch("/passwordChange", async (req, res) => {
  try {

    let {email, password, pin} = req.body;

    const user = await User.findOne({email: email});

    if (user.pin == pin) {
      const hashedPassword = passwordHash(password)

      await User.updateOne({_id: user._id}, {$set: {email: user.email, password: hashedPassword, pin: pin}});

      console.log('Korisnik je promijenio lozinku!');
      return res.status(200).json({result: true});

    } else {
      console.error('Netočan pin:');
      res.status(500).json('Došlo je do greške prilikom promjene lozinke');
    }
  } catch (error) {
      console.error('Greška prilikom promjene lozinke:', error);
      res.status(500).json({ error: 'Došlo je do greške prilikom promjene lozinke' });
  }
});
  
export default router;