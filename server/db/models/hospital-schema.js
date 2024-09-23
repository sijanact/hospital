const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
});

const hospitalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: addressSchema,
    image: {
      type: String,
      required: true,
    },
    department: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
      },
    ],
    doctorId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
      },
    ],
  },
  { timestamps: true }
);

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
