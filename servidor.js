const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')

const {MongoClient} = mongodb


const servidor = express()

servidor.use(cors())
servidor.use(bodyParser.json())

servidor.post('/', (req, res)=>{
    req.body

    res.json({
        name: 'Diego',
        surname: 'Magno',
        username: 'dgmagno',
        password: 'asd123'
    })
})

servidor.post('/register', (req, res)=>{
    req.body

    res.json({
        name: 'Diego',
        surname: 'Magno',
        username: 'dgmagno',
        password: 'asd123'
    })
})

servidor.put('/profile', (req, res)=>{
    res.json
})

MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true }, (err,client)=>{
    if(err){
        console.log(err)
    }
    console.log('Base de datos escuchando al puerto 27017!')
    servidor.listen(8000,()=>{
        console.log('Servidor escuchando el puerto 8000!')
    })
})
