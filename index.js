const dynamodb = require('dynamodb');

/**
 * StatusModels class which contains all the initialized models wrapped with
 * thenable wrappers for use in our application
 *
 * @class StatusModels
 */
class StatusModels {
  /**
   * Set the models on the instance
   */
  constructor() {
    this.Status = require('./status')(dynamodb);
    this.StatusHead = require('./status-head')(dynamodb);
    this.StatusEvent = require('./status-event')(dynamodb);
    this.StatusCounter = require('./status-counter')(dynamodb);
  }

  /**
   * Ensures existence of all tables for the given models
   *
   * @function ensure
   * @returns {Promise} to resolve when complete
   */
  ensure() {
    return Promise.all(
      Object.keys(this).map(name => {
        return this[name].ensure();
      })
    );
  }

  /**
   * Drops all the tables for the given models
   *
   * @function drop
   * @returns {Promise} to resolve when complete
   */
  drop() {
    return Promise.all(
      Object.keys(this).map(name => {
        return this[name].drop();
      })
    );
  }
}

/**
 * Simple Factory function for main export
 *
 * @function models
 * @param {Datastar} datastar Datastar instance
 * @returns {StatusModels} to be used
 */
module.exports = function models() {
  return new StatusModels();
};
