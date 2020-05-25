const router = require('express').Router();
const User = require('../models/user');
const auth = require('../middlewares/verifyToken');

router.post('/addnote', auth, async (req, res) => {
    try{
        const { note } = req.body;
        console.log(note);
        const user = await User.findOne({ _id: req.user.user.id });
        if(!user){
            return res.status(404).send('User not found');
        }
        user.notes = user.notes.concat({ note });
        user.save();

        res.status(200).json({ msg: "Successfully Saved!" });
    }
    catch(err){
        res.status(404).json({ err });
    }
})

module.exports = router;