import ContactMessage from '../models/ContactMessage.js';

const CONTACT_FIELDS = 'name email phone address message status createdAt updatedAt';

export const createContactMessage = (contactData) => ContactMessage.create(contactData);

export const getContactMessages = () =>
  ContactMessage.find().select(CONTACT_FIELDS).sort({ createdAt: -1 }).lean();

export const updateContactStatus = (id, status) =>
  ContactMessage.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).select(CONTACT_FIELDS);

export const deleteContactMessage = (id) => ContactMessage.findByIdAndDelete(id);
