const express = require('express');
const router = express.Router();

const ServiceCenter = require('../models/serviceCenter');
const User = require('../models/user');


// Get all service centers

router.get('/', async (req, res) => {

    try {

        const serviceCenters = await ServiceCenter.find();

        res.json(serviceCenters);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Create service center profile

router.post('/', async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            rating,
            userId
        } = req.body;


        const newServiceCenter = new ServiceCenter({

            name,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            rating,
            userId

        });


        const savedServiceCenter = await newServiceCenter.save();

        res.status(201).json(savedServiceCenter);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// Update service center

router.put('/:id', async (req, res) => {

    try {

        const updateServiceCenter =
            await ServiceCenter.findByIdAndUpdate(
                req.params.id,

                {
                    ...req.body,
                    profileUpdatedAt: new Date()
                },
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            );


        if (!updateServiceCenter) {

            return res.status(404).json({
                message: 'Service center not found'
            });

        }


        res.json(updateServiceCenter);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// Delete service center

// Delete service center and its login account
router.delete('/:id', async (req, res) => {
    try {
        const center = await ServiceCenter.findById(req.params.id);

        if (!center) {
            return res.status(404).json({
                message: 'Service center not found'
            });
        }

        // Delete the login account from users collection
        if (center.userId) {
            await User.findByIdAndDelete(center.userId);
        }

        // Delete the profile from serviceCenters collection
        await ServiceCenter.findByIdAndDelete(req.params.id);

        res.json({
            message: 'Service center and login account deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Admin confirms service center profile update
router.put('/:id/confirm-update', async (req, res) => {
    try {
        const center = await ServiceCenter.findByIdAndUpdate(
            req.params.id,
            { $unset: { profileUpdatedAt: 1 } },
            { new: true }
        );

        if (!center) {
            return res.status(404).json({
                message: 'Service center not found'
            });
        }

        res.json({
            message: 'Profile update confirmed',
            center
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;