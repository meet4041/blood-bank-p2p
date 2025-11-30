const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    city: { type: String },
    lastDonated: { type: Date },

    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    verified: { type: Boolean, default: false },
    verifiedAt: { type: Date },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      default: null
    },

    hospitalNote: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donor', DonorSchema);
