const router = require('express').Router();
const User = require('../models/user');
const auth = require('../middlewares/verifyToken');

router.post('/allnotes', auth, async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.user.user.id });
        if(!user){
            return res.status(404).send('User not found');
        }
        res.status(200).json({ notes: user.notes });
    }
    catch(err){
        res.status(404).json({ err });
    }
})

module.exports = router;