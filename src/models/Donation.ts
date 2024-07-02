import { Schema, model, models } from 'mongoose';

export type Donation = {
	amount: number;
	donateOwner: string;
	name: string;
	message?: string;
	paid: boolean;
};

const donationsSchema = new Schema<Donation>({
	amount: { type: Number, required: true },
	message: { type: String, required: false },
	donateOwner: { type: String, required: true },
	name: { type: String, required: true },
	paid: { type: Boolean, required: true },
});

export const DonationModel = models?.Donation || model<Donation>('Donation', donationsSchema);
