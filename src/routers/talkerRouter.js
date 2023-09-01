const express = require('express');
const { talkerService } = require('../service/talkerService');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await talkerService();
  if (!talkers) {
    res.status(200).json([]);
  } else {
    res.status(200).json(talkers);
  }
});

module.exports = router;