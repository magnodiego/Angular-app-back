const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const {MongoClient, ObjectID} = mongodb

// Variables mongodb
let users = '' 


const urlBase = 'mongodb+srv://diego:1234@clustermagno-bghk8.mongodb.net/users?retryWrites=true&w=majority'
const servidor = express()

servidor.use(cors())
servidor.use(bodyParser.json())

// LOGIN OK

servidor.post("/login", (req,res)=>{
    let userLogin = req.body
    users.findOne(userLogin, (err, data)=>{
        if(data != null){
            res.json(data)
        }else{
            res.end(err)
        }
    })
})

// REGISTER OK

servidor.post("/register", (req,res)=>{
    let userRegister = req.body
    console.log(req.body)
    let usernameRegister = req.body.username
    let cursorRegister = users.find({username: usernameRegister})
    cursorRegister.toArray((err, data)=>{
        if(data == ''){
            users.insertOne(userRegister, (err, resultado)=>{
                console.log('No encontrado, Registrado')
                users.findOne({username: usernameRegister}, (err, data)=>{
                    res.json(data)
                })
            })
        }else{
            console.log('Encontrado, No registrado')
            res.end('Usuario ya registrado')
        }
    })
})

// UPDATE OK

servidor.put('/profile', (req, res)=>{
    let userUpdate = req.body
    console.log(req.body)
    let userUpdateID = req.body._id
    users.updateOne({_id: ObjectID(userUpdateID)},{ $set: {name: userUpdate.name, surname: userUpdate.surname, username: userUpdate.username}}, (err, data)=>{
        users.findOne({_id: ObjectID(userUpdateID)}, (err, data)=>{
            res.json(data)
        })
    })
})

MongoClient.connect( urlBase, { useUnifiedTopology: true }, (err,client)=>{
    if(err){
        console.log(err)
    }else{    
        
        console.log('Base de datos escuchando al puerto 27017!')

        db = client.db('users')

        users = db.collection('usersDef')

        
        servidor.listen(8000,()=>{
            console.log('Servidor escuchando el puerto 8000!')
        })
    }
})
