const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = require('express').Router();
const {check, validationResult} = require('express-validator');

router.post('/register',
    [
        check('name','Username is required!').not().isEmpty(),
        check('password','Password must be at least 6 characters long!').isLength({ min: 5 }),
        check('email','Type a valid email').isEmail(),
    ],
    async(req, res) => {
        console.log(req.body);
        //Validating the data
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        //Registering the user
        const {name, email, password} = req.body;
        try {
            //Checking if the user already exists
            const isExists = await User.findOne({ email });
            if(isExists){
               return res.status(403).json({ error: 'User already exists' });
            }

            const user = new User({
                name, email, password
            });

            //Hashing the password
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;

            user.save();
            res.status(200).json({ user });
        }
        catch(err) {
            res.status(400).send(err.message);
        }
})

module.exports = router;