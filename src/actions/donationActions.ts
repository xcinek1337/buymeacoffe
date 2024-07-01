import { DonationModel } from '@/models/Donation';
import { ProfileInfoModel } from '@/models/ProfileInfo';
import mongoose from 'mongoose';
const { MONGODB_URI } = process.env;

export async function createDonation(formData: FormData, email: string): Promise<string | false> {
	try {
		await mongoose.connect(MONGODB_URI!);

		const { amount, name, message } = Object.fromEntries(formData);

		let profileInfoDoc = await ProfileInfoModel.findOne({ email });

		if (!profileInfoDoc) {
			throw new Error(`Nie znaleziono profilu użytkownika dla email: ${email}`);
		}

		const donationData = {
			amount,
			name,
			message,
			paid: false,
		};

		const donationDoc = await DonationModel.create(donationData);
		profileInfoDoc.donations.push(donationDoc);
		await profileInfoDoc.save();

		mongoose.disconnect();

		return 'Darowizna została pomyślnie utworzona.';
	} catch (error) {
		console.error('Błąd podczas tworzenia darowizny:', error);
		return false;
	}
}
