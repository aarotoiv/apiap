const express = require('express');

const db = require('../db');

const router = new express.Router();

router.get('/:imageId/analysis', async (req, res) => {
  try {
    const droneImageAnalysis = await db.findImageAnalysis(req.params.imageId);

    if (droneImageAnalysis && Array.isArray(droneImageAnalysis) && droneImageAnalysis.length > 0) {
      res.status(200).send({
        imageAnalysis: droneImageAnalysis
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

module.exports = router;