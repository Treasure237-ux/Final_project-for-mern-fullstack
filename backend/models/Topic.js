import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true }
  },
  correctAnswer: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D']
  }
}, { _id: false });

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a topic title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a topic description'],
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [questionSchema]
}, {
  timestamps: true
});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;

