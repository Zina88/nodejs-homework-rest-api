const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../schemas/contacts");

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema, "missing required name field"),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema, "missing field"),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
