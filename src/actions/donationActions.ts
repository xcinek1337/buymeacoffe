import { DonationModel } from '@/models/Donation';
import mongoose from 'mongoose';

export async function createDonation(formData: FormData): Promise<string> {
	//save to our db
	const { amount, crypto, name, message } = Object.fromEntries(formData);
	mongoose.connect(process.env.MONGODB_URI!);
	await DonationModel.create({
		amount,
		name,
		message,
		crypto,
	});
	//create invioce and return the url
	return '';
}
