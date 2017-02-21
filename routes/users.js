'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
  knex('users')
    .then(result => {
      if (result.length !== 0) {
        return res.status(200).send(result);
      }
      return res.sendStatus(401);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  knex('users')
    .where('user.id', id)
    .first()
    .then(result => {
      if (result) {
        return res.status(200).send(result);
      }
      return res.send(404);
    })
    .catch(error => {
      next(error);
    });
});

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;

});

router.use((req, res, next) => {
  // decode token
  if (req.decoded.is_admin) {
    next();
  } else {
    // if there is no token
    // return an error
    return res.status(401).send({
      success: false,
      message: 'Unauthorized.'
    });
  }
});

router.get('/', (req, res, next) => {
  knex('users')
    .then(results => {
      if (results.length === 0) {
        return res.send(404);
      }
      res.status(200).send(results);
    })
    .catch(error => {
      return next(error);
    });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  knex('users')
    .del()
    .where('users.id', id)
    .then(success => {
      res.send(200);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
