// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// router.post('/register', async (req, res) => {
//     try { 
//         const user = new User(req.body); 
//         await user.save(); 
//         res.status(201).json(user); }
//     catch (err) { 
//         res.status(400).json({ error: err.message }); 
//     }
// });
// router.post('/login', async (req, res) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
//     res.json({ token });
// });
// module.exports = router;