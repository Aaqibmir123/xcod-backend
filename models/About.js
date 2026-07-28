import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  about_tagline: {
    type: String,
    default: "About Us"
  },
  company_title: {
    type: String,
    default: "XCDGOC PVT LTD"
  },
  company_subtitle: {
    type: String,
    default: "Extreme Canada Dispatch Group Of Companies"
  },
  main_heading: {
    type: String,
    default: "Complete Dispatch Solutions – Amazon & Non Amazon"
  },
  description: {
    type: String,
    default: "We are Canada's leading and most trusted dispatch service provider, proudly serving across Canada and USA for the last 08 years. Our expert team provides complete dispatch solutions for all types of loads, ensuring maximum miles, higher rates, and long-term success for our clients."
  },
  features_list: [{
    type: String,
    default: [
      "Round the clock dispatch support",
      "Professional & experienced team",
      "Transparent communication",
      "Best rates & dedicated service"
    ]
  }],
  section_image_url: {
    type: String,
    default: "/images/canada-truck.jpg"
  },
  section_image_alt: {
    type: String,
    default: "Canadian Flag and Semi Truck"
  }
}, {
  timestamps: true
});

// Create a single document for About
aboutSchema.statics.getAbout = async function() {
  let about = await this.findOne();
  if (!about) {
    about = await this.create({});
  }
  return about;
};

export default mongoose.model('About', aboutSchema);