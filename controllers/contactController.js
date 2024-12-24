const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//get all the contacts
//route get/api/contact
//access changed to private from public

const getContacts=asyncHandler(async(req, res) => {
    const contact = await Contact.find({user_id: req.user.id});
    res.status(200).json(contact)
}
) ;
//put all the contacts
//route post/api/contact
//access private

const createcontacts = asyncHandler(async(req, res) => {
    console.log("this is the contacts to be created :",req.body)
    const {name,email,number} = req.body;
    if(!name || !email || !number){
        res.status(400);
        throw new Error("all fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        number,
        //assigns the id from the req.user after decoding(which happens in the validation of token once the request is sent)
        user_id:req.user.id
    });
    res.status(201).json(contact);

   
});


//get the contacts
//route get/api/contact/id
//access private

const getContact =asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//update the contacts
//route put/api/contact/id
//access private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to update the other user contacts")
    }
   const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
   
   )
   res.status(200).json(updatedContact)
    
});

//delte the contacts
//route delete/api/contact/id
//access private

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("conatact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to delete the other user contacts")
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact)
});

module.exports={getContacts,createcontacts,getContact,updateContact,deleteContact}