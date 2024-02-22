const { default: mongoose } = require("mongoose");

module.exports.allEvents = async (req, res) => {
  try {
    const allData = await mongoose.connection.db
      .collection("agendaJobs")
      .find()
      .toArray();
    // const allData = await AgendaJobs.findById("65c2098622558beb690ab9d9");
    // console.log(allData);
    res.status(200).json({ allData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.allEventsById = async (req, res) => {
  const { id } = req.params;
  try {
    const allData = await mongoose.connection.db
      .collection("agendaJobs")
      .find({ "data.reminder._userId": new mongoose.Types.ObjectId(id) })
      .toArray();
    res.status(200).json({ allData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
