const express = require('express');
const router = express.Router();

const Service = require('../models/service');

//get all services

router.get('/',async(req,res)=>{
    try{
        const services = await Service.find();
        res.json(services);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

//post a service

router.post('/',async(req,res)=>{
    try{
        const{
            serviceName,
            description,
            price,
            duration,
            serviceCenterId,
            status
        }=req.body;

        const newService =new Service({
            serviceName,
            description,
            price,
            duration,
            serviceCenterId,
            status
        })

        const savedService = await newService.save();
        res.status(201).json(savedService)

    }catch(error){
        res.status(400).json({
            message:error.message
        });
    }
});

//put a service

router.put('/:id',async(req,res)=>{
    try{
        const updateService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
             {
                returnDocument: 'after',
                runValidators: true
            }
        )
        res.json(updateService);
        
    }catch(error){
        res.status(400).json({
            message:error.message
        });
    }
});


// Delete a service

router.delete('/:id', async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(
            req.params.id
        );

        if (!deletedService) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }

        res.status(200).json({
            message: 'Service deleted successfully'
        });

    } catch (error) {
        console.log('Delete error:', error);

        res.status(500).json({
            message: error.message
        });
    }
});



module.exports = router;