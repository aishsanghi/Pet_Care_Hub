import contactModel from "../models/contactModel.js";

export const addContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newContact = new contactModel({
      name,
      email,
      subject,
      message,
    });
    await newContact.save();

    res.status(201).json({
      message: "Contact Added Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const contactGet = await contactModel.find();
    res.status(200).json({
      message: "records fetched",
      contactGet,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await contactModel.findById(contactId);
    if (!contact) {
      return res.status(400).json({
        message: "Contact id undefined",
      });
    }
    res.status(200).json({
      message: "Contact Found",
      contact,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteContactById = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const { contactId } = req.params;

  try {
    let contactData = { name, email, subject, message };
    const deleteContact = await contactModel.findByIdAndDelete(
      contactId,
      { $set: contactData },
      { new: true }
    );

    if (!deleteContact) {
      res.status(400).json({
        message: "Contact Not find",
      });
    }

    res.status(200).json({
      message: "Contact Deleted Successfully",
      deleteContact,
    });
  } catch (error) {
    console.log(error.message);
  }
};
