import * as sectionContentService from '../services/sectionContentService.js';

const validKeys = ['testimonials', 'partners'];
const isValidKey = (key) => validKeys.includes(key);

export const getSectionContent = async (req, res) => {
  if (!isValidKey(req.params.key)) return res.status(400).json({ success: false, message: 'Invalid section key' });
  try {
    const content = await sectionContentService.getSectionContent(req.params.key);
    return res.status(200).json({ success: true, data: content });
  } catch (error) {
    console.error('Get section content error:', error);
    return res.status(500).json({ success: false, message: 'Unable to get section content' });
  }
};

export const updateSectionContent = async (req, res) => {
  if (!isValidKey(req.params.key)) return res.status(400).json({ success: false, message: 'Invalid section key' });
  const { label, heading, description } = req.body;
  if (!label?.trim() || !heading?.trim() || !description?.trim()) return res.status(400).json({ success: false, message: 'Label, heading, and description are required' });
  try {
    const content = await sectionContentService.updateSectionContent(req.params.key, { key: req.params.key, label: label.trim(), heading: heading.trim(), description: description.trim() });
    return res.status(200).json({ success: true, data: content });
  } catch (error) {
    console.error('Update section content error:', error);
    return res.status(500).json({ success: false, message: 'Unable to update section content' });
  }
};
