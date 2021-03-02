
const express = require('express');
const router = express.Router();

const user = require('../components/user/network');
const auth = require('../components/auth/network');
const post = require('../components/post/network');

router.use('/api/user', user);
router.use("/api/auth", auth);
router.use("/api/post", post);

module.exports = router;