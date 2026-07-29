import mongoose from 'mongoose';
import * as testimonialService from '../services/testimonialService.js';

const getValidatedTestimonial = ({ clientName, rating, description }) => {
  const data = {
    clientName: clientName?.trim(),
    rating: Number(rating),
    description: description?.trim(),
  };

  if (!data.clientName || !data.description || !Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    return null;
  }

  return data;
};

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getTestimonials();
    return res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Get testimonials error:', error);
    return res.status(500).json({ success: false, message: 'Unable to get testimonials' });
  }
};

export const createTestimonial = async (req, res) => {
  const testimonialData = getValidatedTestimonial(req.body);
  if (!testimonialData) {
    return res.status(400).json({ success: false, message: 'Client name, a rating from 1 to 5, and description are required' });
  }

  try {
    const testimonial = await testimonialService.createTestimonial(testimonialData);
    return res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return res.status(500).json({ success: false, message: 'Unable to create testimonial' });
  }
};

export const updateTestimonial = async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid testimonial id' });
  }

  const testimonialData = getValidatedTestimonial(req.body);
  if (!testimonialData) {
    return res.status(400).json({ success: false, message: 'Client name, a rating from 1 to 5, and description are required' });
  }

  try {
    const testimonial = await testimonialService.updateTestimonial(req.params.id, testimonialData);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    return res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return res.status(500).json({ success: false, message: 'Unable to update testimonial' });
  }
};

export const deleteTestimonial = async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid testimonial id' });
  }

  try {
    const testimonial = await testimonialService.deleteTestimonial(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    return res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return res.status(500).json({ success: false, message: 'Unable to delete testimonial' });
  }
};
