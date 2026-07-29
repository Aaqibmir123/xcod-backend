import Partner from '../models/Partner.js';

const PARTNER_FIELDS = 'name image description createdAt updatedAt';

export const getPartners = () =>
  Partner.find().select(PARTNER_FIELDS).sort({ createdAt: -1 }).lean();

export const createPartner = (partnerData) => Partner.create(partnerData);

export const updatePartner = (id, partnerData) =>
  Partner.findByIdAndUpdate(id, partnerData, {
    new: true,
    runValidators: true,
  }).select(PARTNER_FIELDS);

export const deletePartner = (id) => Partner.findByIdAndDelete(id);
