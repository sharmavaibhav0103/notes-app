const path = require('path');
const config = require('config');
const express = require('express');
const db = require('./config/db');
const noteRouter = require('./routes/addNotes');
const loginRouter = require('./routes/loginRoute');
const allNotesRouter = require('./routes/allNotes');
const logoutRouter = require('./routes/logoutRoute');
const userRouter = require('./routes/registerRoute');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ extended: true }));
app.use(express.static(path.join(__dirname,'/public')));

//Database Configuaration
db();
app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});
console.log("Vaibhav Sharma");

//Homepage Routes
app.get('/',(req,res) => {
    res.render('index');
})
//Routes
app.use('/users',userRouter);
app.use('/users',noteRouter);
app.use('/', allNotesRouter);
app.use('/users',loginRouter);
app.use('/users',logoutRouter);

app.listen(PORT,() => console.log(`Server is up and running on ${PORT}`));
