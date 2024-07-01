import { Schema, model, models } from 'mongoose';

export type Donation = {
	amount: number;
	name: string;
	message?: string;
	paid:boolean
};

const donationsSchema = new Schema<Donation>({
	amount: { type: Number, required: true },
	message: { type: String, required: true },
	name: { type: String, required: false },
});

export const DonationModel = models?.Donation || model<Donation>('Donation', donationsSchema);
 