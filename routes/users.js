require ('dotenv').config()

const express = require('express')
const router = express.Router()
const { User } = require('../models')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcryptjs')
router.use(express.json())

router.post('/register', async(req, res) => {
    const { email, firstname, lastname, password, confirmation_password, role } = req.body
    if (password != confirmation_password)
        return res.send(404)
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const users = await User.create({email, firstname, lastname, password: hashedPassword, role})
        return res.json(users)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
})
router.post('/login', async (req, res) => {
    const email = req.body.email
    console.log( email )
    const user = await User.findOne({where: { email}})
    if (user == null) {
        return res.status(401).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken, message: 'Succes'})
        } else {
            return res.send('Incorrect Password')
        }
    } catch {
        res.status(400)
    }


})
function authenticateToken(req, res, next) {
    const authHeader = req.header['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //console.log(token)
    //console.log(authHeader)
    if (token == null)
        return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email => {
        if (err) return res.sendStatus(403)
        req.user = email
        next()
    })
    )
    
}

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll()
    
        return res.json(users)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: 'ERROR: STATUS 404'})
    }
})
router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        id = + id;
        const user = await User.findByPk(id);
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: 'ERROR: STATUS 404' })
        
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { email, lastname, firstname, password, confirmation_password, role } = req.body
    if (password != confirmation_password)
        return res.send(404)
    try {
        const user = await User.findByPk(id)
        user.email = email
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.lastname = lastname
        user.firstname = firstname
        user.role = role
        await user.save()
        return res.json(user)

    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const user = await User.findByPk(id);
        await user.destroy()
        return res.json({message: 'User deleted!'})
    }catch (err) {
    console.log(err)
    return res.status(404).json({ error: 'ERROR: STATUS 404' })
    }
})
module.exports = router