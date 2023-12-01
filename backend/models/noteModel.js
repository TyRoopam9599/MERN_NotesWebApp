import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title value"],
    },
    description: {
      type: String,
      required: [true, "Please write description"],
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("NoteModel", noteSchema);
export default NoteModel;
