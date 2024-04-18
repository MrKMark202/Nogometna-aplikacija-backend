import Klub from '../models/Klub.js'
import Liga from '../models/Liga.js'
import User from '../models/Users.js';

//ROUTER IMPORT
import { Router } from "express";
const router = Router();
 
//DOTENV IMPORT
import dotenv from 'dotenv';
dotenv.config();

router.post("/create", async (req, res) => {
  try{

    let { clubName, clubYear, clubCountry, clubGrb, liga, userEmail } = req.body;

    const user = await User.findOne({ email: userEmail });

    const ligaDb = await Liga.findOne({ naziv: liga });
    
    const klubDb = await Klub.findOne({ clubName });
    if (klubDb) {
      res.status(400).send({ msg: "Klub sa ovim nazivom postoji!" })
    } else {
      const newKlub = await Klub({ naziv: clubName, godinaOsnivanja: clubYear, drzava: clubCountry, grbKluba: clubGrb, liga: ligaDb._id, korisnik: user._id});
      await newKlub.save();
      console.log('Klub je kreiran!')
      return res.status(200).json({result: true});
    }
  } catch(error) {
    console.log(error);
    return res.status(500).json({result: false, error: 'Internal server error'});
  }
});

router.get('/dohvat', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const userLiga = req.query.liga;
    const user = await User.findOne({ email: userEmail });
    const liga = await Liga.findOne({naziv: userLiga})
    const klub = await Klub.find({ liga: liga._id, korisnik: user._id});
    const naziviKlubova = klub.map(klub => klub.naziv);
    res.status(200).json(naziviKlubova);
  } catch (error) {
      console.error('Greška prilikom dohvaćanja klubova:', error);
      res.status(500).json({ error: 'Došlo je do greške prilikom dohvaćanja klubova' });
  }
});

router.patch('/delete', async (req, res) => {
  try {
    let { ligaName, clubName, userEmail} = req.body;

    const user = await User.findOne({email: userEmail});
    const liga = await Liga.findOne({naziv: ligaName});

    await Klub.deleteMany({korisnik: user._id, naziv: clubName, liga: liga._id});

    console.log('Klub je izbrisan!');
    return res.status(200).json({result: true});

  } catch (error) {
      console.error('Greška prilikom brisanja kluba:', error);
      res.status(500).json({ error: 'Došlo je do greške prilikom brisanja kluba' });
  }
});
  
export default router;