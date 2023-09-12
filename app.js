const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonWebToken = require('jsonwebtoken');

const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite',
});


const Usuario = sequelize.define('usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    

})
const Grupo = sequelize.define('grupo', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true

    }
    

})
const Subgrupo = sequelize.define('subgrupo', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
    },
    token_acesso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
   // id_grupo: 
  

})
const Usuario_do_subgrupo = sequelize.define('usuario_do_subgrupo', {
   // id_usuario: {
   //   references: Usuario,
  //  },
 //   id_subgrupo: {
//        references:{
  //         model: Subgrupo
   //    }
 //   },
    permissao_adm: {
        type: DataTypes.BOOLEAN,
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

})
//Usuario.hasMany(Usuario_do_subgrupo)

async function cadastrarUsuario(req, res) {
    const usuario = await Usuario.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      status: req.body.status,
    });
    res.json(usuario);
}

async function cadastrarGrupo(req, res) {
    const grupo = await Grupo.create({
      nome: req.body.nome,
      descricao: req.body.descricao,
      status: req.body.status,
    });
    res.json(grupo);
}
async function cadastrarSubgrupo(req, res) {
    const subgrupo = await Grupo.create({
      nome: req.body.nome,
      descricao: req.body.descricao,
      token: req.body.token,
      status: req.body.status,
    });
    res.json(subgrupo);
  }

app.listen(3000, async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
});


app.post('/cadastrarUsuario', cadastrarUsuario);
app.post('/cadastrarGrupo', cadastrarGrupo);