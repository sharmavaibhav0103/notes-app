const User = require('../models/user');
const router = require('express').Router();
const auth = require('../middlewares/verifyToken');

router.post('/logout', auth, async (req, res) => {
    try{
        const user = await User.findOne({ id: req.user.id });
        user.tokens = [];
        user.save();
        res.status(200).json({ msg: 'Logged Out!'});
    }
    catch(err){
        res.status(400).json({ 'err': err.message});
    }
})

module.exports = router;
