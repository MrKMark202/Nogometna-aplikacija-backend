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

export default router;