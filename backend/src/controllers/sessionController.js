import Session from "../models/Session.js";

export const createSession = async (req, res) => {
  const session = await Session.create({
    userId: req.userId,
    content: "",
  });

  res.json(session);
};

export const getSessions = async (req, res) => {
  const sessions = await Session.find({ userId: req.userId }).sort({
    createdAt: -1,
  });

  res.json(sessions);
};

export const getSessionById = async (req, res) => {
  const session = await Session.findById(req.params.id);
  res.json(session);
};

export const updateSession = async (req, res) => {
  const session = await Session.findByIdAndUpdate(
    req.params.id,
    { 
      content: req.body.content,
      title: req.body.title,  
    },
    { returnDocument: 'after' }
  );

  res.json(session);
};

export const deleteSession = async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};