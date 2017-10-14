'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
    }
});

module.exports = mongoose.model('Geo', schema);