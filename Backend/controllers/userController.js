import User from "../models/user.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Build updates object directly from request
    const updates = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      dob: req.body.dob,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      address: {
        street: req.body.address?.street,
        city: req.body.address?.city,
        state: req.body.address?.state,
        country: "Nigeria" // defaulted
      }
    };

    // Check for username uniqueness
    if (updates.username) {
      const existingUser = await User.findOne({ username: updates.username });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(409).json({ error: "Username already taken" });
      }
    }

    // Update user profile using $set to ensure nested fields are handled
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save to trigger pre('save') hook for profileCompleted logic
    await updatedUser.save();

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: updatedUser
    });

  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong while updating profile, please try again later"
    });
  }
};
