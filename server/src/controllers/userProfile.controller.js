import { ERROR, OK, UNKNOWN } from "../lib/responseHelper.js";
import { updateProfilePictureService } from "../services/userProfile.service.js";

export const updateProfilePicture = async (req, res) => {
  try {
    const { data, error } = await updateProfilePictureService(req);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }
    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
