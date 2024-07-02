'use client';

import { createDonation } from '@/actions/donationActions';
import Stripe from '@/components/Stripe';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function DonationForm({ email }: { email: string }) {
	const [numberInValue, setNumberInValue] = useState('');
	const [amount, setAmount] = useState(1);
	const [confirmationSupp, setConfirmationSupp] = useState(false);
	const [idDonation, setIdDonation] = useState('');

	useEffect(() => {
		if (numberInValue) {
			const intValue = parseInt(numberInValue);
			if (intValue > 0 && intValue <= 1000) {
				setAmount(intValue);
			}
		} else {
			setAmount(1);
		}
	}, [numberInValue]);

	async function handleFormSubmit(formData: FormData) {
		formData.set('amount', amount.toString());
		formData.set('donateOwner', email);
		const createAndId = await createDonation(formData);
		setIdDonation(createAndId);
		setConfirmationSupp(true);
	}

	return (
		<>
			<form action={handleFormSubmit}>
				<div className='border gap-2 bg-yellow-300/10 border-yellow-300 rounded-xl p-4 flex items-center'>
					<FontAwesomeIcon icon={faCoffee} />
					<span>x</span>
					<button
						type='button'
						className={'amount ' + (amount === 1 ? 'active' : '')}
						onClick={() => {
							setAmount(1);
							setNumberInValue('1');
						}}
					>
						1
					</button>
					<button
						type='button'
						className={'amount ' + (amount === 3 ? 'active' : '')}
						onClick={() => {
							setAmount(3);
							setNumberInValue('3');
						}}
					>
						3
					</button>
					<button
						type='button'
						className={'amount ' + (amount === 5 ? 'active' : '')}
						onClick={() => {
							setAmount(5);
							setNumberInValue('5');
						}}
					>
						5
					</button>
					<input
						className='w-12 h-12 border border-yellow-300 rounded-xl text-center'
						type='number'
						placeholder='10'
						onChange={(ev) => setNumberInValue(ev.target.value)}
						value={numberInValue}
					/>
				</div>
				<div className='flex flex-col mt-2 gap-2'>
					<input
						required={true}
						name='name'
						type='text'
						placeholder='Your Name'
					/>
					<textarea
						name='message'
						placeholder='Say something nice'
						id=''
					/>

					<button className='font-semibold bg-yellow-300 w-full rounded-xl py-2'>Support ${amount * 3}</button>
				</div>
			</form>
			{confirmationSupp && (
				<div className='absolute left-0 p-4 w-full mt-4'>
					<Stripe
						idDonation={idDonation}
						amount={amount}
					/>
				</div>
			)}
		</>
	);
}
