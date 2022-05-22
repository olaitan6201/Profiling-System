const Client = require('../schema');

exports.getClients = async(req, res) => {
    // Client.find(function(err, clients){
    //     res.status(200).json({msg: 'Clients fetched successfully', clients: clients});
    // });
    const client = await Client.find();
    res.status(200).json({msg: 'Clients fetched successfully', clients: client});
}

exports.getClient = async(req, res) => {
    const client = await Client.find({_id: req.params.id});
    res.status(200).json({msg: 'Clients fetched successfully', clients: client});
}


exports.postClient = (req, res, next)=>{
    const imagePath = "https://profiling-system-api.herokuapp.com/images/";
    if(!req.file){
        // const error = new Error('Please upload a file');
        // error.httpStatusCode = 400;
        // return next(error);
        let newClient = new Client({
            fname: req.body.fname, 
            lname: req.body.lname, 
            email: req.body.email, 
            datec: req.body.datec, 
            plc: req.body.plc,
            dob: req.body.dob,
            casedetails: req.body.casedetails
        });

        newClient.save((err, client) => {
            if(err){
                res.status(200).json({msg: 'error'});
            }else{
                res.status(201).json({msg: 'clients added', client: client});
            }
        });
    }else{
        let newClient = new Client({
            fname: req.body.fname, 
            lname: req.body.lname, 
            email: req.body.email, 
            datec: req.body.datec, 
            plc: req.body.plc,
            dob: req.body.dob, 
            image: imagePath + req.file.filename, 
            casedetails: req.body.casedetails
        });

        newClient.save((err, client) => {
            if(err){
                res.status(200).json({msg: 'error'});
            }else{
                res.status(201).json({msg: 'clients added', client: client});
            }
        });
    }

}


exports.updateClient = (req, res) => {
    const imagePath = "https://profiling-system-api.herokuapp.com/images/";

    if(!req.file){
        Client.findByIdAndUpdate(req.params.id,
        {
            fname: req.body.fname, 
            lname: req.body.lname, 
            email: req.body.email, 
            plc: req.body.plc,
            dob: req.body.dob, 
            casedetails: req.body.casedetails
        },
        {
            new: true
        },
        function(err, updatedClient){
            if(err){
                res.status(200).json({msg:'failed'});
            }else{
                res.status(200).json({msg: 'success', client: updatedClient});
            }
        });
    }else{
        Client.findByIdAndUpdate(req.params.id,
        {
            fname: req.body.fname, 
            lname: req.body.lname, 
            email: req.body.email, 
            plc: req.body.plc,
            dob: req.body.dob, 
            image: imagePath + req.file.filename, 
            casedetails: req.body.casedetails
        },
        {
            new: true
        },
        function(err, updatedClient){
            if(err){
                res.status(200).json({msg:'failed'});
            }else{
                res.status(200).json({msg: 'success', client: updatedClient});
            }
        });
    }
    
}
