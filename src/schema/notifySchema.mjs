// const mongoose = require('mongoose');

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  type: { type: String, required: true }, // General, Warning, Alert, etc.
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
