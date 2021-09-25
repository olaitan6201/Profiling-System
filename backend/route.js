var express = require('express');
const router = express.Router();

const Client = require('./schema');

const clientController = require('./controller/client');

const storage = require('./helper/storage');
const multer = require('multer');

//retrieving data
// router.use('/clients/fetch', (req, res, next)=>{
//     Client.find(function(err, clients){
//         res.status(200).json({msg: 'Clients fetched successfully', clients: clients});
//     });
// });


//add data

router.get('/clients/fetch', clientController.getClients);
router.get('/clients/fetch/:id', clientController.getClient);

router.post('/clients/add', clientController.postClient);
router.post('/clients/add/image', storage.single('image'), clientController.postClient);

router.put('/clients/update/:id', clientController.updateClient);
router.put('/clients/updateWithImage/:id', storage.single('image'), clientController.updateClient);


router.delete('/clients/delete/all', (req, res, next)=>{
    Client.remove(function(err, result){
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});
//delete data 
router.delete('/clients/delete/:id', (req, res, next)=>{
    Client.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    }) 
});



module.exports = router;