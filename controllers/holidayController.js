const Holiday = require("../models/Holiday");

// Create a new holiday
const createHoliday = async (req, res) => {
  try {
    const { name, date, description, createdBy } = req.body;

    // Prevent duplicate holiday on the same date
    const existing = await Holiday.findOne({ date });
    if (existing) {
      return res
        .status(400)
        .json({ message: "A holiday already exists on this date." });
    }

    const holiday = await Holiday.create({
      name,
      date,
      description,
      createdBy,
    });
    res.status(201).json({ message: "Holiday created successfully.", holiday });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create holiday.", error: error.message });
  }
};

// Get all holidays (sorted by date)
const getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find()
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    res.status(200).json(holidays);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch holidays.", error: error.message });
  }
};

// Get a single holiday by ID
const getHolidayById = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!holiday)
      return res.status(404).json({ message: "Holiday not found." });

    res.status(200).json(holiday);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching holiday.", error: error.message });
  }
};

// Update holiday details
const updateHoliday = async (req, res) => {
  try {
    const { name, date, description } = req.body;

    // Prevent duplicate date conflicts
    const conflict = await Holiday.findOne({
      _id: { $ne: req.params.id },
      date,
    });
    if (conflict) {
      return res
        .status(400)
        .json({ message: "Another holiday already exists on this date." });
    }

    const updated = await Holiday.findByIdAndUpdate(
      req.params.id,
      { name, date, description },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Holiday not found." });

    res
      .status(200)
      .json({ message: "Holiday updated successfully.", holiday: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update holiday.", error: error.message });
  }
};

// Delete holiday
const deleteHoliday = async (req, res) => {
  try {
    const deleted = await Holiday.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Holiday not found." });

    res.status(200).json({ message: "Holiday deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete holiday.", error: error.message });
  }
};

module.exports = {
  createHoliday,
  getAllHolidays,
  getHolidayById,
  updateHoliday,
  deleteHoliday,
};
