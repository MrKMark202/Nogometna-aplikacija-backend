import Klub from '../models/Klub.js'
import Liga from '../models/Liga.js'
import User from '../models/Users.js';
import Utakmica from '../models/Utakmica.js';

//ROUTER IMPORT
import { Router } from "express";
const router = Router();
 
//DOTENV IMPORT
import dotenv from 'dotenv';
dotenv.config();


router.post("/create", async (req, res) => {
    try{

        let { kolo, stadionName, mjestoIgranja, gledateljiBroj, datum, satUpisa, izabranaLiga, Domacin, domacinGol, Gosti, gostiGol, liga, domacin, gost, userEmail } = req.body;
        
        try {
            const utakmicaModel = await Utakmica;
            await utakmicaModel.collection.dropIndex('kolo_1');
            console.log('Jedinstveni indeks za polje "kolo" je uklonjen.');
        } catch (err) {
            console.log('Nije pronađen indeks za polje "kolo".');
        }

        const user = await User.findOne({ email: userEmail });

        const ligaDb = await Liga.findOne({ naziv: liga });
    
        const domacinDb = await Klub.findOne({ naziv: domacin });
        const gostDb = await Klub.findOne({ naziv: gost });

        const newUtakmica = await Utakmica({ kolo: kolo, stadionNaziv: stadionName, mjestoIgranja: mjestoIgranja, gledateljiBroj: gledateljiBroj, datum: datum, satUpisa: satUpisa, Liga: izabranaLiga, Domacin: Domacin, domacinGol: domacinGol, Gosti: Gosti, gostiGol: gostiGol, liga: ligaDb._id, domacin: domacinDb._id, gost: gostDb._id, korisnik: user._id});
        await newUtakmica.save();
          console.log('Utakmica je kreirana!')
        return res.status(200).json({result: true});

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
      const lige = await Liga.findOne({ korisnik: user._id, naziv: userLiga}); 
      
      const utakmicaDb = await Utakmica.find({ korisnik: user._id, liga: lige._id});
      res.status(200).json(utakmicaDb);
    } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka utakmice:', error);
        res.status(500).json({ error: 'Došlo je do greške prilikom dohvaćanja podataka utakmica'});
    }
});

router.get('/dohvat/jedna', async (req, res) => {
    try {

      const userEmail = req.query.email;
      const userLiga = req.query.liga;
      const userKolo = req.query.kolo;
      const userDomacin = req.query.domacin;
      const userGost = req.query.gost;

      const user = await User.findOne({ email: userEmail });
      const lige = await Liga.findOne({ korisnik: user._id, naziv: userLiga});
      const domacin = await Klub.findOne({naziv: userDomacin});
      const gost = await Klub.findOne({naziv: userGost});

      const utak = await Utakmica.findOne({korisnik: user._id, liga: lige._id, kolo: userKolo, domacin: domacin._id, gost: gost._id})
      
      const utakmicaDb = await Utakmica.find({ _id: utak._id});
      res.status(200).json(utakmicaDb);
    } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka utakmice:', error);
        res.status(500).json({ error: 'Došlo je do greške prilikom dohvaćanja podataka utakmice'});
    }
});


router.patch('/delete', async (req, res) => {
    try {

      let { ligaName, domacin, gost, kolo, korisnik} = req.body;
  
      const user = await User.findOne({email: korisnik});
      const liga = await Liga.findOne({naziv: ligaName});
      const domacinDb = await Klub.findOne({naziv: domacin});
      const gostDb = await Klub.findOne({naziv: gost});
  
      await Utakmica.deleteMany({korisnik: user._id, domacin: domacinDb._id, gost: gostDb._id, liga: liga._id, kolo: kolo});
  
      console.log('Utakmica je izbrisana!');
      return res.status(200).json({result: true});
  
    } catch (error) {
        console.error('Greška prilikom brisanja utakmice:', error);
        res.status(500).json({ error: 'Došlo je do greške prilikom brisanja utakmice' });
    }
});

export default router;