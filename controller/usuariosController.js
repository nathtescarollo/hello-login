const usuariosModel = require('../model/usuariosModel');
const bcryptjs = require('bcryptjs');

exports.cadastrar = ({ nome, email, senha, confirma }) => {
  if ( senha !== confirma ) {
    throw new Error("As senhas não conferem");
  }  

  const hashed = bcryptjs.hashSync(senha);
  return usuariosModel.novoUsuario({ nome, email, hashed });
};

exports.login = ({ email, senha }) => {
  const usuario = usuariosModel.getUserByEmail(email);

  if (usuario === undefined) {
    throw new Error("Usuário não encontrado. Crie uma nova conta");
  }

  if (!bcryptjs.compareSync(senha, usuario.hashed)) {
    throw new Error("Senha incorreta");
  }

  return usuario;
};

exports.listarTodos = () => usuariosModel.listarTodos();