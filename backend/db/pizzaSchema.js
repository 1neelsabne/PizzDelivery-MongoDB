import mongoose from "mongoose";
const pizzaSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});
export default mongoose.model("pizza", pizzaSchema);
