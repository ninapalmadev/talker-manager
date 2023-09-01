const express = require('express');
const { talkerService, talkerServiceId } = require('../service/talkerService');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await talkerService();
  if (!talkers) {
    res.status(200).json([]);
  } else {
    res.status(200).json(talkers);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerServiceId(id);
  if (!talker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.status(200).json(talker);
  }
});

module.exports = router;