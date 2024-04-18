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

    let { ligaName, ligaYear, ligaCountry, grbLige, userEmail } = req.body

    const user = await User.findOne({ email: userEmail });
    const ligaDb = await Liga.findOne({ ligaName });
        
    if (ligaDb) {
      res.status(400).send({ msg: "Liga sa ovim nazivom postoji!" })
    } else {
      const newLiga = await Liga({ naziv: ligaName, godinaOsnivanja: ligaYear, drzava: ligaCountry, grbLige: grbLige, korisnik: user._id});
      await newLiga.save();
      console.log('Liga kreirana')
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
    const user = await User.findOne({ email: userEmail }); // Pronalazak korisnika prema e-mail adresi
    const lige = await Liga.find({ korisnik: user._id }, 'naziv'); // Dohvaćanje samo naziva liga
    const naziviLiga = lige.map(liga => liga.naziv); // Izvlačenje samo naziva liga iz objekata
    res.status(200).json(naziviLiga);
  } catch (error) {
    console.error('Greška prilikom dohvaćanja liga:', error);
    res.status(500).json({ error: 'Došlo je do greške prilikom dohvaćanja liga' });
  }
});

router.get('/dohvat/grb', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const userLiga = req.query.liga;
    const user = await User.findOne({ email: userEmail }); // Pronalazak korisnika prema e-mail adresi
    const lige = await Liga.find({ korisnik: user._id, naziv: userLiga }, 'grbLige'); // Dohvaćanje samo naziva liga
    const grbLige = lige.map(liga => liga.grbLige); // Izvlačenje samo naziva liga iz objekata
    res.status(200).json(grbLige);
  } catch (error) {
    console.error('Greška prilikom dohvaćanja grba lige:', error);
    res.status(500).json({ error: 'Došlo je do greške prilikom dohvaćanja grba lige' });
  }
});


router.patch('/delete', async (req, res) => {
  try {

    let { ligaName, userEmail} = req.body;

    const user = await User.findOne({email: userEmail});

    await Liga.deleteMany({korisnik: user._id, naziv: ligaName});

    console.log('Liga je izbrisana!');
    return res.status(200).json({result: true});
    
  } catch (error) {
      console.error('Greška prilikom brisanja lige:', error);
      res.status(500).json({ error: 'Došlo je do greške prilikom brisanja lige' });
  }
});
  
export default router;