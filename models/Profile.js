const mongoose = require("mongoose");
const { Schema } = mongoose;
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  location: {
    type: String
  },
  status: {
    type: String
    //required: true
  },
  babyBirthIssues: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  momHospitalisation: [
    {
      problem: {
        type: String,
        required: true
      },
      hospital: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  momHealthIssues: [
    {
      problem: {
        type: String,
        required: true
      },
      treatment: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  nicu: [
    {
      hospital: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  babyMedIssues: [
    {
      illness: {
        type: String
        //required: true
      },
      treatment: {
        type: String
      },
      from: {
        type: Date
        //required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ]
});
//create profiles collection load the schema to it(2 args)
mongoose.model("profiles", profileSchema);
