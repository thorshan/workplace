const Employee = require("../models/Employee");
const EmployeeToken = require("../models/EmployeeToken");
const crypto = require("crypto");

// Login with email
const loginWithEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const employee = await Employee.findOne({ email });
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  const token = crypto.randomBytes(8).toString("hex"); // 16-char token

  await EmployeeToken.create({ email, token });

  res.json({ message: "Token generated", token });
};

// Verify token
const verifyToken = async (req, res) => {
  const { email, token } = req.body;
  if (!email || !token)
    return res.status(400).json({ message: "Email and token required" });

  const existingToken = await EmployeeToken.findOne({ email, token });
  if (!existingToken)
    return res.status(401).json({ message: "Invalid or expired token" });

  // Optionally delete after verification
  await EmployeeToken.deleteOne({ _id: existingToken._id });

  res.json({ message: "Token verified" });
};

// Get employee profile
const empProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
const logoutEmployee = async (req, res) => {
  const { email } = req.body;
  await EmployeeToken.deleteMany({ email });
  res.json({ message: "Logout successfully" });
};

module.exports = {
  loginWithEmail,
  verifyToken,
  empProfile,
  logoutEmployee,
};
