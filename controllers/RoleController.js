const Role = require("../models/RoleModel");

exports.createRole = async (req, res) => {
  try {
    const existingRole = await Role.findOne({ roleId: req.body.roleId });
    if (existingRole) {
      return res
        .status(400)
        .json({ error: "Role with this roleId already exists" });
    }

    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.status(200).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.status(200).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
