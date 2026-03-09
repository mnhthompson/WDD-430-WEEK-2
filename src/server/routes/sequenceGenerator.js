const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;
let initialized = false;

async function initializeSequence() {
  try {
    let sequence = await Sequence.findOne();
    if (!sequence) {
      sequence = new Sequence({
        maxDocumentId: 0,
        maxMessageId: 0,
        maxContactId: 0
      });
      await sequence.save();
    }

    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId;
    maxMessageId = sequence.maxMessageId;
    maxContactId = sequence.maxContactId;
    initialized = true;
  } catch (err) {
    console.error("Error initializing SequenceGenerator:", err);
  }
}

initializeSequence();

function SequenceGenerator() {}

SequenceGenerator.prototype.nextId = async function(collectionType) {
  while (!initialized) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = { maxDocumentId };
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = { maxMessageId };
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = { maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  try {
    await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
  } catch (err) {
    console.error("nextId error =", err);
    return null;
  }

  return nextId;
}

module.exports = new SequenceGenerator();