const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const crypto = require('crypto')

const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

router.get('/:correo', async (req, res) => {
    try{
        const { correo } = req.params;
        const iv = '8fdb43a3846a8807259fc76b4e54e4a6'

        const cipher = crypto.createCipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'))

        const encrypted = Buffer.concat([cipher.update(correo), cipher.final()])
        const x = encrypted.toString('hex')
        console.log(x)
        res.json(x);
        
    } catch (error){
        res.json("Erro en la API: /seguridad")
    }

});



module.exports = router;
