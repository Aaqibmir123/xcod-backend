import SectionContent from '../models/SectionContent.js';

const defaults = {
  testimonials: { label: 'Testimonials', heading: 'What Our Clients Say', description: 'Feedback from companies that trust our dispatch team.' },
  partners: { label: 'Our Partners', heading: 'Companies We Work With', description: 'Trusted partnerships built around reliable service and long-term growth.' },
};

export const getSectionContent = async (key) => {
  let content = await SectionContent.findOne({ key }).lean();
  if (!content) content = await SectionContent.create({ key, ...defaults[key] });
  return content;
};

export const updateSectionContent = (key, content) =>
  SectionContent.findOneAndUpdate({ key }, content, { new: true, upsert: true, runValidators: true });
