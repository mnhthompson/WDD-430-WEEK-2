const express = require("express");
const router = express.Router();

const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");


router.get("/", async (req, res) => {
  try {
    const msgs = await Message.find();
    res.status(200).json({
      message: "Retrieved messages from database.",
      messageObjs: msgs,
    });
  } catch (err) {
    res.status(500).json({
      message: "There was a problem retrieving messages from the database.",
      error: err,
    });
  }
});


router.post("/", async (req, res) => {
  console.log("Incoming message body:", req.body); 
  try {
    const maxMessageId = await sequenceGenerator.nextId("messages");

    if (maxMessageId === null) throw new Error("Failed to generate message ID");

    const msg = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender,  
    });

    const createdMsg = await msg.save();
    res.status(201).json({
      message: "Message added successfully.",
      messageObj: createdMsg,
    });
  } catch (err) {
    console.error("Error creating message:", err);
    res.status(500).json({
      message: "There was a problem creating the message.",
      error: err,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const msg = await Message.findOne({ id: req.params.id });
    if (!msg) {
      return res.status(404).json({ message: "Message not found." });
    }

    msg.subject = req.body.subject;
    msg.msgText = req.body.msgText;
    msg.sender = req.body.sender;

    await Message.updateOne({ id: req.params.id }, msg);
    res.status(204).json({ message: "Message updated successfully." });
  } catch (err) {
    res.status(500).json({
      message: "There was a problem updating the message.",
      error: err,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const msg = await Message.findOne({ id: req.params.id });
    if (!msg) {
      return res.status(404).json({ message: "Message not found." });
    }

    await Message.deleteOne({ id: req.params.id });
    res.status(204).json({ message: "Message deleted successfully." });
  } catch (err) {
    res.status(500).json({
      message: "There was a problem deleting the message.",
      error: err,
    });
  }
});

module.exports = router;