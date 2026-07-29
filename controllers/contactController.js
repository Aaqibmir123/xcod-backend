import mongoose from 'mongoose';
import * as contactService from '../services/contactService.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getValidatedContact = ({ name, email, phone, address, message }) => {
  const data = {
    name: name?.trim(),
    email: email?.trim().toLowerCase(),
    phone: phone?.trim(),
    address: address?.trim() || '',
    message: message?.trim(),
  };

  if (!data.name || !data.email || !EMAIL_PATTERN.test(data.email) || !data.phone || !data.message) {
    return null;
  }

  return data;
};

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createContactMessage = async (req, res) => {
  const contactData = getValidatedContact(req.body);
  if (!contactData) {
    return res.status(400).json({ success: false, message: 'Name, email, phone, and message are required' });
  }

  try {
    await contactService.createContactMessage(contactData);
    return res.status(201).json({ success: true, message: 'Your message has been sent successfully' });
  } catch (error) {
    console.error('Create contact message error:', error);
    return res.status(500).json({ success: false, message: 'Unable to send your message' });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const messages = await contactService.getContactMessages();
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Get contact messages error:', error);
    return res.status(500).json({ success: false, message: 'Unable to get contact messages' });
  }
};

export const updateContactStatus = async (req, res) => {
  if (!isValidId(req.params.id) || !['new', 'read'].includes(req.body.status)) {
    return res.status(400).json({ success: false, message: 'Invalid contact message or status' });
  }

  try {
    const message = await contactService.updateContactStatus(req.params.id, req.body.status);
    if (!message) return res.status(404).json({ success: false, message: 'Contact message not found' });
    return res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.error('Update contact status error:', error);
    return res.status(500).json({ success: false, message: 'Unable to update contact message' });
  }
};

export const deleteContactMessage = async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid contact message id' });
  }

  try {
    const message = await contactService.deleteContactMessage(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Contact message not found' });
    return res.status(200).json({ success: true, message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Delete contact message error:', error);
    return res.status(500).json({ success: false, message: 'Unable to delete contact message' });
  }
};
