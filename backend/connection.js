const express = require('express');
const oracledb = require('oracledb');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações da conexão com o banco de dados Oracle
const clientOpts = { libDir: 'C:/oracle/instantclient_11_2' };
const dbConfig = {
  user: 'tasy',
  password: 'aloisk',
  connectString: '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.10.2)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = tasyprinc)))'
}
try {
  oracledb.initOracleClient(clientOpts);
} catch (err) {
   if(err) {
     console.error('Erro ao conectar ao banco de dados: ', err);
   }else{
     console.log('Conectado ao Banco de Dados Oracle');
   }
};

module.exports = dbConfig;