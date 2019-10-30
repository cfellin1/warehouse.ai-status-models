const Dynastar = require('dynastar');
const Joi = require('joi');

const Wrap = require('./wrap');

/**
 * Returns a Wrapped Dynastar model used for storing each event for the
 * various stages of a build process within the warehouse system.
 *
 * @function statevent
 * @param {Object} dynamo Dynamo object model
 * @returns {Wrap} StatusEvent
 */
module.exports = function statevent(dynamo) {
  const hashKey = 'key';
  const rangeKey = 'eventId';
  const model = dynamo.define('status_event', {
    hashKey,
    rangeKey,
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: false,
    tableName: 'status_event',
    schema: {
      key: Joi.string(),
      pkg: Joi.string(),
      env: Joi.string(),
      version: Joi.string(),
      locale: Joi.string(),
      error: Joi.boolean(),
      message: Joi.string(),
      details: Joi.string(),
      eventId: dynamo.types.timeUUID()
    }
  });
  return new Wrap(new Dynastar({ model, hashKey, rangeKey }));
};
