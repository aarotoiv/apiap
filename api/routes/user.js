const express = require('express');
const { v4: uuidv4 } = require('uuid');

const db = require('../db');
const userValidator = require('../validators/user');

const router = new express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const user = await db.findUserById(req.params.userId);
    if (user && Array.isArray(user) && user.length > 0) {
      res.status(200).send({
        user
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

router.post('/add', async (req, res) => {
  const data = req.body.data || {};
  data.token = uuidv4();
  const valid = userValidator(data);

  if (!valid) {
    res.sendStatus(422);
  } else {
    try {
      const addedUser = await db.addUser(data);
      if (addedUser.affectedRows === 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
});

module.exports = router;