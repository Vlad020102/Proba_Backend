const express = require('express')
const router = express.Router()
const { ContactRequest } = require('../models')
const user = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const contactRequests = await ContactRequest.findAll()
    
        return res.json(contactRequests)
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
        const contactRequests = await ContactRequest.findByPk(id);
        console.log(id)
        return res.json(contactRequests)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: 'ERROR: STATUS 404' })
        
    }
})

router.post('/', async(req, res) => {
    const {message, name, email} = req.body
    
    try {
        const contactRequests = await ContactRequest.create({message , name , email})
        return res.json(contactRequests)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }

})
router.patch('/:id', async(req, res) => {
    const { id } = req.params
    const { is_resolved } = req.body
    try {
        const contactRequests = await ContactRequest.findByPk(id)
        contactRequests.is_resolved = is_resolved
        await contactRequests.save()
        return res.json(contactRequests)

    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }

})
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const contactRequest = await ContactRequest.findByPk(id);
        await contactRequest.destroy()
        return res.json({message: 'Contact Request deleted!'})
    }catch (err) {
    console.log(err)
    return res.status(404).json({ error: 'ERROR: STATUS 404' })
    }
})


module.exports = router;