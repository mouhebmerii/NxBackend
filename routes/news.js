const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');



/* GET ALL products. */
router.get('/', function(req, res) {
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1; //page number
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit :100; //items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit; //0, 10,20
        endValue = page * limit;
    } else {
        startValue = 0;
        endValue = 10;
    }
    database.table('news as n')
        .withFields([
            'n.id',
            'n.Title',
            'n.Body',
            'n.picture',
            'n.createdate'
        ]).slice(startValue, endValue).sort({ id: -1 }).getAll().then(prods => {
        if (prods.length > 0) {
            res.status(200).json({
                count: prods.length,
                post: prods
            });

        } else {
            res.json({ message: 'No news found' });
        }
    }).catch(err => console.log(err));







});

/* Get product we7ed*/
router.get('/:newsid', (req , res)=>{
    let NewsId = req.params.newsid;
    // console.log(productId);


    database.table('news as n').join([{
        table: 'user as u',
        on: 'u.id = n.user_id',
    }])
        .withFields(['u.username as username',
            'n.Title',
            'n.Body',
            'n.picture',
            'n.createdate',
            'n.id'
        ]).filter({'n.id':NewsId})
        .get().then(prod => {
        if (prod) {
            res.status(200).json(prod);

        } else {
            res.json({ message: `No news found with news id ${Newsid}` });
        }
    }).catch(err => console.log(err));
});

router.post('/new',(req,res) => {
    let {id, title, body, picture, userid} =req.body

    database.table('news').insert(
        {
            id: id,
            Title: title,
            Body: body,
            picture: picture,
            user_id: userid,
        }
    ).catch(err => res.json(err))
});
// console.log('Be Right Back')
module.exports = router;
