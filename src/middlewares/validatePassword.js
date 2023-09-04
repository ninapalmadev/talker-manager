const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const regex = /^.{6,}$/;
  const testRegex = regex.test(password);
  if (!password) {
    return res.status(400).json({ 
      message: 
      'O campo "password" é obrigatório', 
    });
  }
  if (!testRegex) {
    return res.status(400).json({ 
      message: 
        'O "password" deve ter pelo menos 6 caracteres', 
    }); 
  }
  next();
};

module.exports = { validatePassword };