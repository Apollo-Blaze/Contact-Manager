const express=require("express");
const router=express.Router();
const {getContact,getaContact,updateContact,deleteContact,createContact}=require("../controllers/contactController")


router.route('/').get(getContact).post(createContact);

router.route('/:id').get(getaContact).put(updateContact).delete(deleteContact);


module.exports=router;