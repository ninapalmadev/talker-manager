const express = require('express');
const { token } = require('../service/loginService');
const { validatePassword } = require('../middlewares/validatePassword');
const { validateEmail } = require('../middlewares/validateEmail');

const router = express.Router();

router.post('/', validateEmail, validatePassword, async (req, res) => {
  const tokenGenerate = token();
  res.status(200).json({ token: tokenGenerate });
});

module.exports = router;