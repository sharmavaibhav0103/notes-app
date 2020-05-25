const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = require('express').Router();

router.post('/login',
     async(req, res) => {
        //Checking the credentials in the database
        try {
            const {email, password} = req.body;
            
            console.log(req.body);
            //Retrieve the user
            const user = await User.findOne({ email: req.body.email });
            if(!user) res.status(401).json({ errors: 'User doesn\'t exist' });

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) res.status(401).json({ errors: 'Incorrect Password'});

            //Creating the JWT Token
            const payload = {
                user: {
                    id: user.id
                }
            };
             jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000000000 },
                async (err, token) => {
                    //Inserting the token
                    user.tokens = user.tokens.concat({ token });
                    await user.save();
                    res.status(200).json({ user,token:user.tokens[0].token });
                });
        }
        catch(err) {
            res.status(500).send(err.message);
        }
})

module.exports = router;