const clientes = [
    {
        id: 1,
        nome: 'João',
        email: 'joão@email.com'
    },
    {
        id: 2,
        nome: 'Cristina',
        email: 'cristina@email.com'
    }
];


const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let contador = 2;
app.use(bodyParser.json());
const porta = 3000;
app.set('port', porta);
app.get("/teste", (req, res, next) => {
    res.send("Olá");
});
app.get('/clientes', (req, res, next) => {
    res.json(clientes);
});
app.post('/clientes', (req, res, next) => {
    const cliente = req.body;
    clientes.push({id: contador += 1, nome: cliente.nome, email: cliente.email});
    console.log(clientes);
    res.status(201).json(clientes);
});
app.delete('/clientes/:id', (req, res, next) => {
    const { id } = req.params;
    console.log("Id: " + id);
    clientes.splice(clientes.indexOf(x => x.id === id));
    console.log(clientes);
    res.status(200).send();
});
app.put('/clientes', (req, res, next) => {
    const cliente = req.body;
    clientes.splice(clientes.indexOf(x => x.id === cliente.id));
    clientes.push({id: cliente.id, nome: cliente.nome, email: cliente.email});
    res.status(200).send();
});
const server = http.createServer(app);
server.listen(3000);
console.log("Servidor rodando na porta 3000.");