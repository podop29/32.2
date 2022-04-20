const express= require('express')
const router = new express.Router();
const ITEMS = require('./fakedb')
const Item = require('./item')



router.get('/', (req,res,next)=>{
    try{
    res.json({items: ITEMS})
    }catch(err){
        return next(err)
    }
})

router.get('/:name',(req,res,next)=>{
    try{
        const item = ITEMS.find(i => i.name === req.params.name)
        res.json({items: item})
    }catch(err){
        return next(err)
    }

})


router.post('/',(req,res,next)=>{
    try{
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({item: newItem});

    }catch(e){
        return next(e)
    }

})



router.patch('/:name/', (req,res,next)=>{
    try{
        let item = Item.find(req.params.name);
        item.name = req.body.name
        item.price = req.body.price
        return res.json({ item: item });
    }catch(e){
        return next(e)
    }
})

router.delete('/:name', (req,res,next)=>{
    try{
        let item = Item.remove(req.params.name);
        return res.json({message:'Deleted'});

    }catch(e){
        return next(e)
    }
})








module.exports = router;
