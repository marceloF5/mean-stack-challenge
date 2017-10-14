'use strict'
const mongoose = require('mongoose');
const Delivery = mongoose.model('Deliveries');

exports.get = (req, res, next) => {
  Delivery
    .find()
    .then(data => {      
      res.status(200).send({data})
    })
    .catch(error => {
      res.status(400).send({
        message: 'Error Search Deliveries',
        data: error
      })
    })
}

exports.post = (req, res, next) => {
  console.log('chegou o req');
  console.log(req.body);
  const delivery = new Delivery(req.body);
  delivery
    .save()
    .then(data => {
      res.status(200).send({message: 'Delivery saved with success'})
    })
    .catch(error => {
      res.status(400).send({
        message: 'Delivery did not save with success',
        data: error
      })
    })
}

exports.delete = (req, res, next) => {
  Delivery
    .remove()
    .then(data => {
      res.status(200).send({message: 'Deliveries removed with success'})
    })
    .catch(error => {
      res.status(400).send({
        message: 'Deliveries did not remove with success',
        data: error
      })
    })
}