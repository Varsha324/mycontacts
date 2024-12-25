const express = require("express");
const router = express.Router();
const {getContacts,createcontacts,getContact,updateContact,deleteContact} =require('../controllers/contactController');
const validateToken = require("../middleware/validateTken");
//to protect all routes
router.use(validateToken);

router.route("/").get(getContacts);
router.route("/").post(createcontacts);
router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);



module.exports = router;