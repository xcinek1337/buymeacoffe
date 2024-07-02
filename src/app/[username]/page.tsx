'use server';

import DonationForm from '@/components/DonationForm';
import { Donation, DonationModel } from '@/models/Donation';
import { ProfileInfo, ProfileInfoModel } from '@/models/ProfileInfo';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

type Props = {
	params: { username: string };
};
export default async function SingleProfilePage({ params }: Props) {
	const username = params.username;

	const profileInfoDoc: ProfileInfo | null = await ProfileInfoModel.findOne({ username });

	let donationList: Donation[] = [];
	if (profileInfoDoc) {
		donationList = await DonationModel.find({
			donateOwner: profileInfoDoc.email,
			paid: true,
		}).exec();
	}
	if (!profileInfoDoc) {
		return <div>404 - profile not found</div>;
	}

	return (
		<div>
			<div>
				<Image
					src={profileInfoDoc.coverUrl}
					width={2048}
					height={2048}
					alt={`cover image`}
					className='object-cover object-center h-48'
				/>
			</div>
			<div className='max-w-2xl px-4 mx-auto relative -mt-16'>
				<div className='flex items-end gap-2'>
					<div className='size-36 overflow-hidden border-2 border-white rounded-xl'>
						<Image
							src={profileInfoDoc.avatarUrl}
							width={256}
							height={256}
							alt={`cover image`}
							className='size-36 object-cover object-center'
						/>
					</div>
					<div className='mb-1'>
						<h1 className='text-4xl font-semibold'>{profileInfoDoc.displayName}</h1>
						<h2 className='flex gap-1 items-center '>
							<FontAwesomeIcon icon={faCoffee} />
							<span>/</span>
							<span>{profileInfoDoc.username}</span>
						</h2>
					</div>
				</div>
				<div className='grid grid-cols-2 gap-4 mt-4'>
					<div className='bg-white rounded-xl p-4 shadow-sm'>
						<h3 className='font-semibold'>About {profileInfoDoc.username}</h3>
						<p>{profileInfoDoc.bio}</p>
						<hr className='my-4' />
						<h3 className='font-semibold'>Recent supporeters</h3>
						{!donationList && <p>no recent donations</p>}
						{donationList && (
							<ul className='p-4 flex flex-col gap-2'>
								{donationList.map((d, i) => (
									<li
										className='border-b-2 border-yellow-300 flex flex-col gap-2'
										key={i}
									>
										{d.message && <p className='font-mono'>{d.message}</p>}
										<div className='flex justify-end items-center p-2'>
											<h4 className='font-bold mr-1'>{d.name} </h4>
											<span className='font-bold font-mono'> {d.amount}x </span>
											<FontAwesomeIcon size={'xs'} icon={faCoffee} />
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
					<div className='bg-white rounded-xl p-4 shadow-sm'>
						<DonationForm email={profileInfoDoc.email} />
					</div>
				</div>
			</div>
		</div>
	);
}
