const express = require('express');
const {body} = require("express-validator");
const router = express.Router();
const {database} = require('../config/helpers');

router.post('/new',(req,res) => {

    let {id, email, name, photorul, firstname, lastname, type,fullid, longidchar} =req.body
    database.table('user').insert(
        {
            longid: id,
            username: name,
            email: email,
            photoUrl: photorul,
            fname: firstname,
            lname: lastname,
            type:type,
            fullid:fullid,
            longidchar:longidchar
        }
    ).catch(err => res.json())


});
