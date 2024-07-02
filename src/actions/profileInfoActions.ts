'use server';

import { authOptions } from '@/lib/authOptions';
import { ProfileInfoModel } from '@/models/ProfileInfo';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export async function saveProfile(formData: FormData) {
	await mongoose.connect(process.env.MONGODB_URI!);

	const session = await getServerSession(authOptions);
	if (!session) throw 'you need to be logged in';
	const email = session.user?.email;

	const { username, displayName, bio, coverUrl, avatarUrl } = Object.fromEntries(formData);

	try {
		let profileInfoDoc = await ProfileInfoModel.findOne({ email });

		if (profileInfoDoc) {
			profileInfoDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
			await profileInfoDoc.save();
		} else {
			await ProfileInfoModel.create({ username, displayName, bio, email, coverUrl, avatarUrl });
		}

		return true;
	} catch (error) {
		console.error('Error saving profile:', error);
		return false;
	}
}

