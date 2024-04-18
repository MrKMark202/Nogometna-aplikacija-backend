import User from "../models/Users.js";
import passwordHash from '../utils/passwordHash.js'
import Tablica from '../models/Tablica.js'
import Klub from '../models/Klub.js'
import Liga from '../models/Liga.js'
import Utakmica from '../models/Utakmica.js';

//ROUTER IMPORT
import { Router } from "express";
const router = Router();
 
//DOTENV IMPORT
import dotenv from 'dotenv';
dotenv.config();


router.get('/dohvat', async (req, res) => {
    try {
  
      const userEmail = req.query.email;
  
      const userDb = await User.findOne({ email: userEmail });
  
      res.status(200).json(userDb);
    } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka korisnika:', error);
        res.status(500).json({ error: 'Došlo je do greške prilikom dohvaćanja podataka korisnika' });
    }
});

router.patch('/delete', async (req, res) => {
    try{
        
        let {userEmail} = req.body;

        const user = await User.findOne({ email: userEmail });

        await User.deleteMany({_id: user._id});
        await Liga.deleteMany({korisnik: user._id});
        await Klub.deleteMany({korisnik: user._id});
        await Utakmica.deleteMany({korisnik: user._id});
        await Tablica.deleteMany({korisnik: user._id});

        console.log('Utakmica je izbrisana!');
        return res.status(200).json({result: true});
    } catch(error) {
        console.error('Greška prilikom brisanja korisnika:', error);
        res.status(500).json({ error: 'Došlo je do greške prilikom brisanja korisnika' });
    }
})

router.patch('/update/podaci', async (req, res) =>{
    try {
        
        let {email, profilna} = req.body;

        await User.updateOne({email: email}, {$set: {profilnaSlika: profilna}});
        console.log('Korisnik je ažuriran!')
        return res.status(200).json({result: true});


    } catch(error) {
        console.error('Greška prilikom ažuriranja podataka korisnika:', error);
        res.status(500).json({ error: 'Došlo je do greške prilikom ažuriranja podataka korisnika' });
    }
});

router.patch('/update/lozinka', async (req, res) =>{
    try {
        
        let {email, lozinka} = req.body;

        const hashedPassword = passwordHash(lozinka)

        const userDb = await User.findOne({ email: email });

        await User.updateOne({_id: userDb._id, }, {$set: {password: hashedPassword}});
        console.log('Korisnik je ažuriran!')
        return res.status(200).json({result: true});


    } catch(error) {
        console.error('Greška prilikom ažuriranja lozinke korisnika:', error);
        res.status(500).json({ error: 'Došlo je do greške prilikom ažuriranja lozinke korisnika' });
    }
});

export default router;