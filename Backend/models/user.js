import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    dob: {
      type: Date,
    },
    address: {
      street: {
        type: String,
        trim: true,
        maxlength: [200, "Street address cannot exceed 200 characters"],
      },
      city: {
        type: String,
        trim: true,
        maxlength: [100, "City name cannot exceed 100 characters"],
      },
      state: {
        type: String,
        trim: true,
        maxlength: [100, "State name cannot exceed 100 characters"],
      },
      country: {
        type: String,
        trim: true,
        default: "Nigeria",
        maxlength: [100, "Country name cannot exceed 100 characters"],
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "collector"],
      default: "user",
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    profileCompletedAt: {
      type: Date,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    lastLogin: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.emailVerificationToken;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.loginAttempts;
        delete ret.lockUntil;
        delete ret.lastLogin;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Indexes for better query performance

userSchema.index({ "address.city": 1 });
userSchema.index({ "address.state": 1 });
userSchema.index({ createdAt: 1 });

// Virtual for account lock status
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Virtual for full address
userSchema.virtual("fullAddress").get(function () {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}, ${this.address.country}`;
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to handle account locking
userSchema.pre("save", function (next) {
  if (!this.isModified("loginAttempts") && !this.isModified("lockUntil")) {
    return next();
  }

  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil <= Date.now()) {
    return this.updateOne(
      {
        $unset: { lockUntil: 1 },
        $set: { loginAttempts: 1 },
      },
      next
    );
  }

  // Otherwise we're incrementing
  const updates = { $inc: { loginAttempts: 1 } };

  // Lock the account if we've reached max attempts and it's not locked already
  const maxLoginAttempts = 5;
  const lockTime = 2 * 60 * 60 * 1000; // 2 hours

  if (this.loginAttempts + 1 >= maxLoginAttempts && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + lockTime };
  }

  return this.updateOne(updates, next);
});

// Pre-save middleware to handle profile completion
userSchema.pre('save', function (next) {
  const requiredFields = [
    this.username,
    this.dob,
    this.gender,
    this.phoneNumber,
    this.address?.street,
    this.address?.city,
    this.address?.state,
    this.address?.country
  ];

  const isComplete = requiredFields.every(Boolean);

  this.profileCompleted = isComplete;

  if (isComplete && !this.profileCompletedAt) {
    this.profileCompletedAt = new Date();
  } else if (!isComplete) {
    this.profileCompletedAt = null;
  }

  next();
});


// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) {
    throw new Error("User password not found");
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to increment login attempts
userSchema.methods.incLoginAttempts = function () {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil <= Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };
  const maxLoginAttempts = 5;
  const lockTime = 2 * 60 * 60 * 1000; // 2 hours

  // Lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= maxLoginAttempts && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + lockTime };
  }

  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 },
  });
};

// Static method to find user by username or email
userSchema.statics.findByCredentials = async function (identifier) {
  const user = await this.findOne({
    $or: [
      { username: identifier.toLowerCase() },
      { email: identifier.toLowerCase() },
    ],
  }).select("+password");

  return user;
};

// Static method to check if username exists
userSchema.statics.isUsernameTaken = async function (
  username,
  excludeId = null
) {
  const query = { username: username.toLowerCase() };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  const user = await this.findOne(query);
  return !!user;
};

// Static method to check if email exists
userSchema.statics.isEmailTaken = async function (email, excludeId = null) {
  const query = { email: email.toLowerCase() };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  const user = await this.findOne(query);
  return !!user;
};

const User = mongoose.model("User", userSchema);

export default User;
