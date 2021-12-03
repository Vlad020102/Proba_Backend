const express = require("express");

const { sequelize, ContactRequest, User, Review } = require('./models')

const app = express();
app.use(express.json())
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/users'))
app.use('/contact-requests', require('./routes/contact-requests'));
app.use('/reviews', require('./routes/reviews'));
app.use('/tutoring-classes', require('./routes/tutoring-classes'));
app.use('/', require('./routes/enrolments'));

const { NOEXPAND } = require("sequelize/dist/lib/table-hints");


app.listen({ port:3000 }, async () => {
    console.log('Server is up on http://localhost: 3000')
    await sequelize.sync({ force: false })
    console.log('Database is synced')
})