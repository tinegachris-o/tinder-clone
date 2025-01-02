import User from "../models/User.js";
export const swipeRight = async (req, res) => {
  try {
    const { likedUserId } = req.params;
    const likedUser = await User.findById(likedUserId);
    if (!likedUser) {
      return res.status(404).json({ message: "liked user does not exist" });
    }
    const currentUser = await User.findById(req.user.id);

    if (!currentUser.likes.includes(likedUserId)) {
      currentUser.likes.push(likedUserId);
      await currentUser.save();
      
    } 
    //if user likes himself he cannot add himself in matches array
    if (currentUser.likes.includes(currentUser.id)) {
      currentUser.matches.pull(currentUser.id);
    }
    //if (currentUser.likes.includes(currentUser.id)) {
      // Remove the current user's ID from the matches array if it exists
     /////currentUser.matches = currentUser.matches.filter(
       // (matchId) => matchId !== currentUser.id
     // );
    //}
  
    

    if (likedUser.likes.includes(currentUser.id)) {
    currentUser.matches.push(likedUserId)

      likedUser.matches.push(currentUser.id);
      await Promise.all([await currentUser.save(), await likedUser.save()]);
    }
    res.status(200).json({ success: true, user: currentUser });
  } catch (error) {
    console.log("Error in sweepRight section");
    res.status(500).json({ message: "error is SweepRight section" });
  }
};
export const swipeLeft = async (req, res) => {
  try {
    const { dislikedUserId } = req.params;
    const currentUser = await User.findById(req.user.id);

    if (!currentUser.disLikes.includes(dislikedUserId)) {
      currentUser.disLikes.push(dislikedUserId);
      await currentUser.save();
    }

    //
    res.status(200).json({ success: true, user: currentUser });
  } catch (error) {
    console.error("Error in swipeLeft:", error);

    res.status(500).json({
      message: "internal server error in swipping left",
      success: false,
    });
  }
};
export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "matches",
      "name image"
    );
    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }
    res.status(200).json({
      success: true,
      matches: user.matches,
      message: "this are your matches",
    });
  } catch (error) {
    console.log(error, "error getting matches");
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
export const getUserProfiles = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) {
      return res
        .status(404)
        .json({ message: "user does not exixts", success: false });
    }
    const users = await User.find({
      $and: [
        { _id: { $ne: currentUser.id } },
        { _id: { $nin: currentUser.likes } },
        { _id: { $nin: currentUser.disLikes } },
        { _id: { $nin: currentUser.matches } },
        {
          gender:
            currentUser.genderPreference === "both"
              ? { $in: ["male", "female"] }
              : currentUser.genderPreference,
        },

        { genderPreference: { $in: [currentUser.gender, "both"] } },
      ],
    });
  } catch (error) {}
};
