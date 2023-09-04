const express = require('express');
const { token } = require('../service/loginService');

const router = express.Router();

router.post('/', (req, res) => {
  res.status(200).json({ token: token() });
});

module.exports = router;