import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    const { image, ...otherData } = req.body;
    const updatedData = { ...otherData };

    // Handle image upload if it exists and is in the base64 format
    if (image && image.startsWith("data:image")) {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(image);
        updatedData.image = uploadedResponse.secure_url;
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        return res.status(500).json({
          message: "Failed to upload image",
          success: false,
        });
      }
    }

    // Update the user profile
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
    });

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Respond with success
    res.status(200).json({
      message: "User has been updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
