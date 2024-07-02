'use server';

import ProfileInfoForm from '@/components/ProfileInfoForm';
import { authOptions } from '@/lib/authOptions';
import { Donation, DonationModel } from '@/models/Donation';
import { ProfileInfoModel } from '@/models/ProfileInfo';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export default async function ProfilePage() {
	const session = await getServerSession(authOptions);
	if (!session || !session.user?.email) {
		return (
			<section className='text-center'>
				<h1 className='font-bold text-4xl my-6'>Log in first</h1>
				<p className='text-lg'>Or sign up, and give them a way to support your work</p>
			</section>
		)
	}

	const email = session.user?.email;
	await mongoose.connect(process.env.MONGODB_URI!);
	const profileInfoDoc = JSON.parse(JSON.stringify(await ProfileInfoModel.findOne({ email })))


	let donationList: Donation[] = [];
	if (profileInfoDoc) {
		donationList = await DonationModel.find({
			donateOwner: profileInfoDoc.email,
			paid: true,
		}).exec();
	}

	return (
		<div className='max-w-2xl mx-auto px-4'>
			<ProfileInfoForm profileInfo={profileInfoDoc} />
			<div>
				<h2 className='w-full font-bold my-6 text-center'>Donation list</h2>
				<ul className='flex flex-col gap-4'>
					{donationList.map((d,i)=>{
						return(
							<li className='bg-white shadow-sm rounded-lg p-2' key={i}>
							<h3><span className='font-bold'>{d.name}</span> send you {d.amount}$</h3>
							<p className='font-mono'>{d.message}</p>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	);
}
