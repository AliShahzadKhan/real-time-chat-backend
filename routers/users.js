const User = require('../models/user_model');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/signup', async (req, res) => {

    try{

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            password_hash: hashedPassword,
            phone: req.body.phone,
            user_name: req.body.user_name
        });

        user = await user.save();

        res.status(200).json({
            success: true,
            user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            err

        });
    }
   
});

router.post('/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if(!user) {
        return res.status(401).json({
            success: false,
            message: 'User not found'
        });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password_hash);

    if(!isMatch) {
        return res.status(500).send('Password provided is incorrect');
    }

    const token = jwt.sign(
        {
            user: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    );

    res.status(200).send({
        user: user.email,
        token: token
    });

});

router.get('/dashboard', async (req, res) => {

    try {

        const allUsers = await User.find();
        res.status(200).json({
            success: true,
            count: allUsers.length,
            allUsers
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Failed to fetch any users',
            error: error.message

        });
    }

});

module.exports = router;