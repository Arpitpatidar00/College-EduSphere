import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    continent: { type: String, required: true },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const StateModel = mongoose.model("State", stateSchema);
export default StateModel;
