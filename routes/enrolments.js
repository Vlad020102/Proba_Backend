const express = require('express')
const router = express.Router()
const { Enrolment } = require('../models')
const user = require('../models/user')


router.post('/tutoring-class/:id/enroll', async(req, res) => {
    
    
    try {
        const enrolments = await Enrolment.create({})
        return res.json(enrolments)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }

})
module.exports = router;