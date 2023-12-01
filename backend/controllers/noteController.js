import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import NoteModel from "../models/noteModel.js";

// @desc    Get Notes
// @route   GET /api/notes
// @access  Private
export const getNotes = asyncHandler(async (req, res) => {
  const notes = await NoteModel.find({ user: req.user.id });

  res.status(200).send(notes);
});

// @desc    Create Note
// @route   POST /api/notes
// @access  Private
export const createNote = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add text fields");
  }

  const { title, description, text } = req.body;
  const note = await NoteModel.create({
    title,
    description,
    text,
    user: req.user.id,
  });

  res.status(201).send(note);
});

// @desc    Update Note
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = asyncHandler(async (req, res) => {
  const note = await NoteModel.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make sure the logged in user matches notes user
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const updatedNote = await NoteModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).send(updatedNote);
});

// @desc    Delete Note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await NoteModel.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make sure the logged in user matches notes user
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  await note.remove();

  res.status(200).send({ id: req.params.id });
});
