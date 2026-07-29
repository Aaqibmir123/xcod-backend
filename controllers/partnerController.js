import mongoose from 'mongoose';
import * as partnerService from '../services/partnerService.js';

const getValidatedPartner = ({ name, image, description }) => {
  const data = {
    name: name?.trim(),
    image,
    description: description?.trim(),
  };

  if (!data.name || !data.image || !data.description) {
    return null;
  }

  return data;
};

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getPartners = async (req, res) => {
  try {
    const partners = await partnerService.getPartners();
    return res.status(200).json({ success: true, data: partners });
  } catch (error) {
    console.error('Get partners error:', error);
    return res.status(500).json({ success: false, message: 'Unable to get partners' });
  }
};

export const createPartner = async (req, res) => {
  const partnerData = getValidatedPartner(req.body);
  if (!partnerData) {
    return res.status(400).json({ success: false, message: 'Name, image, and description are required' });
  }

  try {
    const partner = await partnerService.createPartner(partnerData);
    return res.status(201).json({ success: true, data: partner });
  } catch (error) {
    console.error('Create partner error:', error);
    return res.status(500).json({ success: false, message: 'Unable to create partner' });
  }
};

export const updatePartner = async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid partner id' });
  }

  const partnerData = getValidatedPartner(req.body);
  if (!partnerData) {
    return res.status(400).json({ success: false, message: 'Name, image, and description are required' });
  }

  try {
    const partner = await partnerService.updatePartner(req.params.id, partnerData);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    return res.status(200).json({ success: true, data: partner });
  } catch (error) {
    console.error('Update partner error:', error);
    return res.status(500).json({ success: false, message: 'Unable to update partner' });
  }
};

export const deletePartner = async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid partner id' });
  }

  try {
    const partner = await partnerService.deletePartner(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    return res.status(200).json({ success: true, message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Delete partner error:', error);
    return res.status(500).json({ success: false, message: 'Unable to delete partner' });
  }
};
