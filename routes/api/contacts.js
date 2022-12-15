const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const {
  validateBody,
  validateUpdateContact,
  validateUpdateStatus,
  isValidId,
} = require("../../middlewares");
const { schemas } = require("../../schemas/contacts");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  isValidId,
  validateUpdateContact(schemas.updateSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateUpdateStatus(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavoriteContact)
);

module.exports = router;
