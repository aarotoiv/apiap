const express = require('express');

const db = require('../db');
const droneValidator = require('../validators/drone');

const router = new express.Router();

router.get('/:droneId', async (req, res) => {
  try {
    const drone = await db.findDroneById(req.params.droneId);
    if (drone && Array.isArray(drone) && drone.length > 0) {
      res.status(200).send({
        drone
      });
    } else {
      res.status(404).send({
        message: 'Not Found'
      });
    }
  } catch (err) {
    res.status(500).send({ 
      message: 'Internal server error' 
    });
  }
});

router.get('/:droneId/using', async (req, res) => {
  try {
    const droneUserData = await db.findDroneUser(req.params.droneId)
    if (droneUserData && Array.isArray(droneUserData) && droneUserData.length > 0) {
      res.status(200).send({
        user: droneUserData[0]
      });
    } else {
      res.status(200).send({
        user: false
      });
    }
  } catch (err) {
    res.status(500).send({ 
      message: 'Internal server error' 
    });
  }
});

router.get('/:droneId/free', async (req, res) => {
  try {
    const droneUserData = await db.findDroneUser(req.params.droneId)
    if (droneUserData && Array.isArray(droneUserData) && droneUserData.length > 0) {
      res.status(200).send({
        isFree: false
      });
    } else {
      res.status(200).send({
        isFree: true
      });
    }
  } catch (err) {
    res.status(500).send({ 
      message: 'Internal server error' 
    });
  }
})

router.get('/:droneId/images', async (req, res) => {
  try {
    const droneImagesData = await db.findDroneImages(req.params.droneId)
    res.status(200).send({
      images: droneImagesData
    });
  } catch (err) {
    res.status(500).send({ 
      message: 'Internal server error' 
    });
  }
});

router.post('/add', async (req, res) => {
  const data = req.body.data || {};

  const valid = droneValidator(data);

  if (!valid) {
    res.sendStatus(422);
  } else {
    try {
      const addedDrone = await db.addDrone(data);
      if (addedDrone.affectedRows === 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
})

module.exports = router;