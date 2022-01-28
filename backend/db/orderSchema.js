import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    orderuser: { type: String, required: true },
    cardnumber: { type: Number, required: true },
    total: { type: Number, required: true },
});
export default mongoose.model("order", orderSchema);
