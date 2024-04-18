const Member = require("../models/memberModel");
const User = require("../models/userModel");

module.exports.addMembers = async (req, res) => {
  let { firstname, lastname, email, phonenumber, slackId, userId } = req.body;
  try {
    if (phonenumber === null) phonenumber = "";

    const member = await Member.create({
      firstname,
      lastname,
      email,
      phonenumber,
      slackId,
      userId,
    });
    const updateUserDocument = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      { $push: { members: member } }
    );
    res.status(200).json({ message: "Member added" });
  } catch (error) {
    // console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "ID's already exists" });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports.getMembers = async (req, res) => {
  const { userId } = req.params;
  try {
    const member = await Member.find({ userId });
    res.status(200).json({ member });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.getMemberFullname = async (req, res) => {
  const { userId } = req.query;
  try {
    const name = await Member.find({ userId }).select([
      "firstname",
      "lastname",
      "email",
    ]);
    res.status(200).json({ fullname: name });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateMember = async (req, res) => {
  let { _id, firstname, lastname, email, phonenumber, slackId } = req.body;
  if (phonenumber === null) phonenumber = "";
  try {
    // if (phonenumber !== "") {
    //   const findUniquePhonenumber = await Member.findOne({ phonenumber });
    //   if (findUniquePhonenumber) {
    //     return res
    //       .status(400)
    //       .json({ message: "Phonenumber should be unique" });
    //   }
    // }
    // if (slackId !== "") {
    //   const findUniqueSlackId = await Member.findOne({ slackId });
    //   if (findUniqueSlackId) {
    //     return res.status(400).json({ message: "SlackId should be unique" });
    //   }
    // }
    const updatedMember = await Member.findByIdAndUpdate(
      { _id },
      { firstname, lastname, email, phonenumber, slackId }
    );
    if (!updatedMember) {
      return res.status(400).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Member updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.deleteMember = async (req, res) => {
  const { _id, userId } = req.query;
  try {
    const deletedMember = await Member.findByIdAndDelete({ _id });
    const deleteMemberFromUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { members: _id } }
    );
    if (!deletedMember || !deleteMemberFromUser) {
      res.status(400).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Member deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.getMemberbyUserNotification = async (req, res) => {
  let { fields } = req.query;
  // const fields = ["slackId"];

  try {
    const query = {};
    fields.forEach((field) => {
      query[field] = { $exists: true, $ne: "" };
    });

    const members = await Member.find(query);

    if (members.length === 0) {
      res
        .status(404)
        .json({ message: "No members found with the selected fields" });
    } else {
      res.json({ members });
    }
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
