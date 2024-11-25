const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModels");

// Register a new doctor
const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, specialty, phoneNumber, experience, address } = req.body;

  if (!name || !email || !specialty || !phoneNumber || !experience || !address) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if doctor already exists
  const doctorExists = await Doctor.findOne({ email });
  if (doctorExists) {
    return res.status(400).json({ message: "Doctor already exists with this email" });
  }

  // Create a new doctor instance
  const newDoctor = await Doctor.create({
    name,
    email,
    specialty,
    phoneNumber,
    experience,
    address
  });

  res.status(201).json({
    message: "Doctor registered successfully",
    doctor: newDoctor
  });
});

// Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get a single doctor by ID
const getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error("Error fetching doctor:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get a single doctore by email
const getDoctorByEmail = async(req, res) => {
    const doctor = await Doctor.findOne({ email: req.params.email});
    if (!doctor) {
        return res.status(404);
        throw new Error("Doctor not found")
    }
    res.status(200).json(doctor);

};

// Doctor login
const loginDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the doctor exists
  const doctor = await Doctor.findOne({ email });

  if (!doctor) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Check if the password matches
  const passwordMatch = await bcrypt.compare(password, doctor.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { doctorId: doctor._id, name: doctor.name, email: doctor.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expiration time
  );

  // Return the token in the response
  res.status(200).json({
    message: "Login successful",
    token
  });
});

module.exports = { registerDoctor , getAllDoctors, getDoctorById, getDoctorByEmail,loginDoctor};

