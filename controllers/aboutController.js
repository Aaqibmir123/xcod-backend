import About from '../models/About.js';

// Get about data
export const getAbout = async (req, res) => {
  try {
    const about = await About.getAbout();
    return res.status(200).json({
      success: true,
      data: about
    });
  } catch (error) {
    console.error('Get about error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update about data
export const updateAbout = async (req, res) => {
  try {
    const {
      about_tagline,
      company_title,
      company_subtitle,
      main_heading,
      description,
      features_list,
      section_image_url,
      section_image_alt
    } = req.body;

    const about = await About.getAbout();
    
    // Update fields
    if (about_tagline !== undefined) about.about_tagline = about_tagline;
    if (company_title !== undefined) about.company_title = company_title;
    if (company_subtitle !== undefined) about.company_subtitle = company_subtitle;
    if (main_heading !== undefined) about.main_heading = main_heading;
    if (description !== undefined) about.description = description;
    if (features_list !== undefined) about.features_list = features_list;
    if (section_image_url !== undefined) about.section_image_url = section_image_url;
    if (section_image_alt !== undefined) about.section_image_alt = section_image_alt;

    await about.save();

    return res.status(200).json({
      success: true,
      message: 'About updated successfully',
      data: about
    });
  } catch (error) {
    console.error('Update about error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export default { getAbout, updateAbout };