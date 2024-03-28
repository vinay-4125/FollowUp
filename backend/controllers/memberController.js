const Member = require("../models/memberModel");
const User = require("../models/userModel");

module.exports.addMembers = async (req, res) => {
  const { firstname, lastname, email, phonenumber, slackId, userId } = req.body;
  try {
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
  try {
    const name = await Member.find().select(["firstname", "lastname", "email"]);
    res.status(200).json({ fullname: name });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateMember = async (req, res) => {
  const { _id, firstname, lastname, email, phonenumber, slackId } = req.body;
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      { _id },
      { firstname, lastname, email, phonenumber, slackId }
    );
    if (!updatedMember) {
      res.status(400).json({ message: "Internal server error" });
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
