const express = require('express')
const router = express.Router()
const { TutoringClass } = require('../models')
const jwt = require ('jsonwebtoken')

router.post('/', async(req, res) => {
    const {description, subject} = req.body
    
    try {
        const tutoringClasses = await TutoringClass.create({description, subject})
        return res.json(tutoringClasses)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }

})

router.get('/', async (req, res) => {
    try {
        const tutoringClasses = await TutoringClass.findAll()
    
        return res.json(tutoringClasses)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: 'ERROR: STATUS 404'})
    }
})
router.get('/:id', async (req, res) => {
    
      
    try {
        let { id } = req.params;
        console.log(id)
        id = + id;
        const tutoringClasses = await TutoringClass.findByPk(id);
        console.log(id)
        return res.json(tutoringClasses)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: 'ERROR: STATUS 404' })
        
    }
})
router.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { description } = req.body
    try {
        const tutoring_classes = await TutoringClass.findByPk(id)
        tutoring_classes.description = description
        await tutoring_classes.save()
        return res.json(tutoring_classes)

    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }

})
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const tutoringClasses = await TutoringClass.findByPk(id);
        await tutoringClasses.destroy()
        return res.json({message: 'Tutoring Class deleted!'})
    }catch (err) {
    console.log(err)
    return res.status(404).json({ error: 'ERROR: STATUS 404' })
    }
})
module.exports = router
