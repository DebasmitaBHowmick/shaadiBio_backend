const mongoose = require("mongoose");

const biodataSchema = new mongoose.Schema({

  // Link biodata to logged-in user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // PERSONAL DETAILS
  name: String,
  gender: String,

  dob: String,
  age: Number,

  height: String,
  religion: String,
  caste: String,

  motherTongue: String,
  maritalStatus: String,
  nationality: String,


  // CONTACT DETAILS
  phone: String,
  email: String,
  address: String,

  hideContact: {
    type: Boolean,
    default: false
  },


  // EDUCATION & PROFESSION
  education: String,
  profession: String,
  organisation: String,
  income: String,


  // FAMILY DETAILS
  fatherName: String,
  fatherOccupation: String,

  motherName: String,
  motherOccupation: String,

  siblings: String,
  familyType: String,
  familyStatus: String,
  nativePlace: String,


  // HOROSCOPE DETAILS (optional)
  rashi: String,
  nakshatra: String,
  gothra: String,

  birthTime: String,
  birthPlace: String,


  // PHOTO
  photo: String,


  // TEMPLATE
  template: {
    type: String,
    default: "template1"
  }


}, {
  timestamps: true
});

module.exports = mongoose.model("Biodata", biodataSchema);