'use server';

import { DonationModel } from '@/models/Donation';

export async function createDonation(formData: FormData): Promise<string> {
	const { amount, name, message, donateOwner } = Object.fromEntries(formData);

	try {
		const donation = await DonationModel.create({ donateOwner, name, amount, message, paid: false });
		const id = donation._id.toString();
		console.log('Donation ID:', id);
		return id;
	} catch (error) {
		console.error('donation creating error:', error);
		return '';
	}
}

export async function donationPaidSuccessfully(donationId: string): Promise<boolean> {
	try {
		const donation = await DonationModel.findById(donationId);
		if (donation) {
			donation.paid = true;
			await donation.save();
			return true;
		} else {
			console.error('donation doesnt exist');
			return false;
		}
	} catch (error) {
		console.error('error during updating status payment:', error);
		return false;
	}
}
