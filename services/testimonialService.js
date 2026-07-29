import Testimonial from '../models/Testimonial.js';

const TESTIMONIAL_FIELDS = 'clientName rating description createdAt updatedAt';

export const getTestimonials = () =>
  Testimonial.find().select(TESTIMONIAL_FIELDS).sort({ createdAt: -1 }).lean();

export const createTestimonial = (testimonialData) => Testimonial.create(testimonialData);

export const updateTestimonial = (id, testimonialData) =>
  Testimonial.findByIdAndUpdate(id, testimonialData, {
    new: true,
    runValidators: true,
  }).select(TESTIMONIAL_FIELDS);

export const deleteTestimonial = (id) => Testimonial.findByIdAndDelete(id);
