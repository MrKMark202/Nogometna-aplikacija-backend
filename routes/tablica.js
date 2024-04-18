import User from '../models/Users.js';
import Klub from '../models/Klub.js'
import Tablica from '../models/Tablica.js'
import Liga from '../models/Liga.js';

//ROUTER IMPORT
import { Router } from "express";
const router = Router();
 
//DOTENV IMPORT
import dotenv from 'dotenv';

dotenv.config();
router.post("/create", async (req, res) => {
    try {

        let { bodovi, postignutiPogodci, primljeniPogodci, odigranihDvoboja, grbKlub, liga, klub, userEmail } = req.body

        const user = await User.findOne({ email: userEmail });

        const ligaDb = await Liga.findOne({ naziv: liga})

        const klubDb = await Klub.findOne({naziv: klub})
    
        const newTablica = await Tablica({ bodovi: bodovi, postignutiPogodci: postignutiPogodci, primljeniPogodci: primljeniPogodci, odigranihDvoboja: odigranihDvoboja, liga: ligaDb._id, klub: klubDb.naziv, grbKlub: grbKlub, korisnik: user._id});
        await newTablica.save();
        console.log('Tablica za klub je kreirana')
        return res.status(200).json({result: true});

    } catch(error) {
        console.log(error);
        return res.status(500).json({result: false, error: 'Internal server error'});
    }
});

router.patch("/update/domacin", async (req, res) => {
    try {

        let { bodovi, postignutiPogodci, primljeniPogodci, odigranihDvoboja, liga, klub, korisnik} = req.body

        const user = await User.findOne({ email: korisnik });

        const ligaDb = await Liga.findOne({ naziv: liga})

        const klubDb = await Klub.findOne({naziv: klub})
    
        await Tablica.updateOne({korisnik: user._id, liga: ligaDb._id, klub: klubDb.naziv}, {$set: { bodovi: bodovi, postignutiPogodci: postignutiPogodci, primljeniPogodci: primljeniPogodci, odigranihDvoboja: odigranihDvoboja, grbKlub: klubDb.grbKluba, liga: ligaDb._id, klub: klubDb.naziv, korisnik: user._id}});
        console.log('Tablica je ažurirana!')
        return res.status(200).json({result: true});

    } catch(error) {
        console.log(error);
        return res.status(500).json({result: false, error: 'Internal server error'});
    }
});

router.patch("/update/gost", async (req, res) => {
    try {

        let { bodovi, postignutiPogodci, primljeniPogodci, odigranihDvoboja, liga, klub, korisnik} = req.body

        const user = await User.findOne({ email: korisnik });

        const ligaDb = await Liga.findOne({ naziv: liga})

        const klubDb = await Klub.findOne({naziv: klub})
    
        await Tablica.updateOne({korisnik: user._id, liga: ligaDb._id, klub: klubDb.naziv}, {$set: { bodovi: bodovi, postignutiPogodci: postignutiPogodci, primljeniPogodci: primljeniPogodci, odigranihDvoboja: odigranihDvoboja, grbKlub: klubDb.grbKluba, liga: ligaDb._id, klub: klubDb.naziv, korisnik: user._id}});
        console.log('Tablica je ažurirana!')
        return res.status(200).json({result: true});

    } catch(error) {
        console.log(error);
        return res.status(500).json({result: false, error: 'Internal server error'});
    }
});

router.get('/dohvat/domacin', async (req, res) => {
  try {
        const userEmail = req.query.email;
        const userLiga = req.query.liga;
        const userKlub = req.query.domacin;

        const userDb = await User.findOne({ email: userEmail });
        const ligeDb = await Liga.findOne({ naziv: userLiga});
        const klubDb = await Klub.findOne({ naziv: userKlub});

        const tablicaDb = await Tablica.find({korisnik: userDb._id, liga: ligeDb._id, klub: klubDb.naziv})

        res.status(200).json(tablicaDb);
    } catch (error) {
      console.error('Greška prilikom dohvaćanja podataka tablice domaćeg kluba:', error);
      res.status(500).json({ error: 'Došlo je do greške prilikom dohvaćanja podataka tablice domaćeg kluba' });
    }
});

router.get('/dohvat/gost', async (req, res) => {
    try {
      const userEmail = req.query.email;
      const userLiga = req.query.liga;
      const userKlub = req.query.gost;
  
      const userDb = await User.findOne({ email: userEmail });
      const ligeDb = await Liga.findOne({ naziv: userLiga});
      const klubDb = await Klub.findOne({ naziv: userKlub});
      const tablicaDb = await Tablica.find({korisnik: userDb._id, liga: ligeDb._id, klub: klubDb.naziv})
  
      res.status(200).json(tablicaDb);
    } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka tablice gostujućeg kluba:', error);
        res.status(500).json({ error: 'Došlo je do greške prilikom dohvaćanja podataka tablice za gostujućieg kluba' });
    }
});

router.get('/dohvat', async (req, res) => {
    try {
      const userEmail = req.query.email;
      const userLiga = req.query.liga;
  
      const userDb = await User.findOne({ email: userEmail });
      const ligeDb = await Liga.findOne({ naziv: userLiga});
      const tablicaDb = await Tablica.find({korisnik: userDb._id, liga: ligeDb._id})
  
      res.status(200).json(tablicaDb);
    } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka tablice:', error);
        res.status(500).json({ error: 'Došlo je do greške prilikom dohvaćanja podataka tablice' });
    }
});

router.patch('/delete', async (req, res) => {
    try {
      let { ligaName, clubName, userEmail} = req.body;
  
      const user = await User.findOne({email: userEmail});
      const liga = await Liga.findOne({naziv: ligaName});
      const klub = await Klub.findOne({naziv: clubName});
  
      await Tablica.deleteMany({korisnik: user._id, klub: clubName, liga: liga._id});
  
      console.log('Tablica je izbrisana!');
      return res.status(200).json({result: true});
  
    } catch (error) {
        console.error('Greška prilikom brisanja tablice:', error);
        res.status(500).json({ error: 'Došlo je do greške prilikom brisanja tablice' });
    }
});
  
export default router;