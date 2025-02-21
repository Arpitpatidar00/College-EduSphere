import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isMetroCity: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CityModel = mongoose.model("City", citySchema);
export default CityModel;
