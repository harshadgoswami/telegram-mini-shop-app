import mongoose, { model, Document } from 'mongoose';

export interface IFood extends Document {
    title: string;
    price: number;
    image: string;
}

const FoodSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
});

const Food = mongoose.models.food || model<IFood>("food", FoodSchema);

export default Food;