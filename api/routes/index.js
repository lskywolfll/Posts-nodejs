
const express = require('express');
const router = express.Router();

const user = require('../components/user/network');
const auth = require('../components/auth/network');

router.use('/api/user', user);
router.use("/api/auth", auth);

module.exports = router;