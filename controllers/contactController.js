const getContact=(req,res)=>{
    res.status(200).json({message:"Get all contacts"})
};
 const getaContact=(req,res)=>{
    res.status(200).json({message:`Get contact for ${req.params.id}`})
}

const createContact=(req,res)=>{
    
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are required")
    }
    console.log("The request is:",req.body);
    res.status(201).json({message:"Create contact"})
};

const updateContact=(req,res)=>{
    res.status(201).json({message:`Update contact for ${req.params.id}`})
};

const deleteContact=(req,res)=>{
    res.status(201).json({message:`Delete contact for ${req.params.id}`})
};
module.exports={getContact,getaContact,createContact,updateContact,deleteContact}