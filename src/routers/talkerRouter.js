const express = require('express');
const { talkerService, talkerServiceId, readFile, writeFile } = require('../service/talkerService');
const { authTalker, 
  talkerName, 
  talkerAge, 
  talkerTalk,
  talkerWatchedAt,
  talkerRate } = require('../middlewares/validateTalker');

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

router.post('/', authTalker, talkerName, talkerAge, talkerTalk, 
talkerWatchedAt, talkerRate, async (req, res) => {
  const talkers = await readFile();
  const id = talkers.length + 1;
  const talker = { id, ...req.body };
  talkers.push(talker);
  await writeFile(talkers);
  res.status(201).json(talker);
});

router.put('/:id', authTalker, talkerName, talkerAge, talkerTalk,
talkerWatchedAt, talkerRate, async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerIndex = talkers.findIndex((element) => element.id === Number(id));
  if (talkerIndex === -1) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
    const talker = { id: Number(id), ...req.body };
    talkers[talkerIndex] = talker;
    await writeFile(talkers);
    res.status(200).json(talker);
  }
});

module.exports = router;