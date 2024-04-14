const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");


const getContact=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});
const getaContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

const createContact=asyncHandler(async(req,res)=>{
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are required")
    }
    const contact=await Contact.create({
        name,email,phone,user_id: req.user.id
    });
    res.status(201).json(contact)
})

const updateContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User does not have access to that contact")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(201).json(updatedContact)
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User does not have access to that contact")
    }
    await contact.deleteOne({_id:req.params.id}); // Use deleteOne method
    res.status(200).json({ message: "Contact deleted successfully" });
});




module.exports={getContact,getaContact,createContact,updateContact,deleteContact}