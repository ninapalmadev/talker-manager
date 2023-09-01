const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.join(__dirname, '../talker.json');

const talkerService = async () => {
  try {
    const conteudo = await fs.readFile(talkerPath, 'utf-8');
    return JSON.parse(conteudo);
  } catch (err) {
    console.log(`Erro ao ler o arquivo: ${err.path}`);
    return [];
  }
};

const talkerServiceId = async (id) => {
  const talkers = await talkerService();
  const talker = talkers.find((element) => element.id === Number(id));
  return talker;
};

module.exports = { 
  talkerService,  
  talkerServiceId,
};
