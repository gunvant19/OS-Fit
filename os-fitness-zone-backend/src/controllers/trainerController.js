const Trainer = require('../models/Trainer');
const { z } = require('zod');

const trainerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    specialization: z.string().min(2),
    experience: z.number().min(0),
    contact: z.string().min(1),
    photo: z.string().optional(),
    bio: z.string().optional()
  })
});

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trainers', error: error.message });
  }
};

const createTrainer = async (req, res) => {
  try {
    console.log('[createTrainer] Received body:', req.body);
    const { photo, ...rest } = req.body;
    const trainerData = { ...rest, photoURL: photo };
    console.log('[createTrainer] Saving to DB:', trainerData);
    const trainer = await Trainer.create(trainerData);
    console.log('[createTrainer] Success:', trainer._id);
    res.status(201).json(trainer);
  } catch (error) {
    console.error('[createTrainer] Error:', error);
    res.status(500).json({ message: 'Error creating trainer', error: error.message });
  }
};

const updateTrainer = async (req, res) => {
  try {
    const { photo, ...rest } = req.body;
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      { ...rest, photoURL: photo },
      { new: true, runValidators: true }
    );
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trainer', error: error.message });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trainer', error: error.message });
  }
};

module.exports = {
  getAllTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  schemas: { trainerSchema }
};
