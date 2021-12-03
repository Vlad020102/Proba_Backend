const express = require('express')
const router = express.Router()
const { Review } = require('../models')

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll()
    
        return res.json(reviews)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: 'ERROR: STATUS 404'})
    }
})
router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        id = + id;
        const reviews = await Review.findByPk(id);
        return res.json(reviews)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: 'ERROR: STATUS 404' })
        
    }
})
router.post('/', async(req, res) => {
    const {message, user_id} = req.body
    
    try {
        const reviews = await Review.create({message , user_id })
        return res.json(reviews)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
    
})
router.patch('/:id', async(req, res) => {
    const { id } = req.params
    const { message } = req.body
    try {
        const reviews = await Review.findByPk(id)
        reviews.message = message
        await reviews.save()
        return res.json(reviews)

    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }

})
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const reviews = await Review.findByPk(id);
        await reviews.destroy()
        return res.json({message: 'Review deleted!'})
    }catch (err) {
    console.log(err)
    return res.status(404).json({ error: 'ERROR: STATUS 404' })
    }
})
module.exports = router;