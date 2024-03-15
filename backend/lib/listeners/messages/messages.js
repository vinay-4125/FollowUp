const sampleMessageCallback = async ({ message, say }) => {
  try {
    console.log("Context", message);
    // const greeting = context.matches[0];
    await say(`hi <@${message.user}>`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleMessageCallback };
