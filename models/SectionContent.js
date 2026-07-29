import mongoose from 'mongoose';

const sectionContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, enum: ['testimonials', 'partners'] },
    label: { type: String, required: true, trim: true, maxlength: 80 },
    heading: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 400 },
  },
  { timestamps: true }
);

export default mongoose.model('SectionContent', sectionContentSchema);
