'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    streetName: {
      type: String,
      required: true
    },
    numberHouse: {
      type: Number,
      required: true
    },
    neighborhood: {
      type: String,
      required: true
    },
    complement: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    geo: {
      lat: {
        type: Number,
        required: true
      },
      lon: {
        type: Number,
        required: true
      }
    }
});

module.exports = mongoose.model('Address', schema);