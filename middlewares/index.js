const validateBody = require("./validateBody");
const validateUpdateContact = require("./validateUpdateContact");
const validateUpdateStatus = require('./validateUpdateStatus')
const isValidId = require("./isValidId");

module.exports = {
  validateBody,
  isValidId,
  validateUpdateContact,
  validateUpdateStatus
};
