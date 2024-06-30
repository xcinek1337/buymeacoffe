'use client';

import { createDonation } from '@/actions/donationActions';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function DonationForm() {
	const [numberInValue, setNumberInValue] = useState('');
	const [amount, setAmount] = useState(1);
	const [crypto, setCrypto] = useState('BTC');

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
		formData.set('crypto', crypto);
		const url = await createDonation(formData);
		if(window && window.location){
			window.location.href = url
		}
	}

	return (
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
					name='name'
					type='text'
					placeholder='Your Name'
				/>
				<textarea
					name='message'
					placeholder='Say something nice'
					id=''
				/>
				<div className='flex flex-col gap-1 '>
					<h3 className='text-xs text-center text-gray-500 my-1'>pay with crypto</h3>
					<div className='flex gap-1'>
						<button
							type='button'
							onClick={() => setCrypto('BTC')}
							className={'crypto ' + (crypto === 'BTC' ? 'active' : '')}
						>
							<span>BTC</span>
							<p>Bitcoin</p>
						</button>
						<button
							type='button'
							onClick={() => setCrypto('ETH')}
							className={'crypto ' + (crypto === 'ETH' ? 'active' : '')}
						>
							<span>ETH</span>
							<p>Ethereum</p>
						</button>
						<button
							type='button'
							onClick={() => setCrypto('LTC')}
							className={'crypto ' + (crypto === 'LTC' ? 'active' : '')}
						>
							<span>LTC</span>
							<p>Litecoin</p>
						</button>
					</div>
				</div>
				<button className='font-semibold bg-yellow-300 w-full rounded-xl py-2'>Support ${amount * 3}</button>
			</div>
		</form>
	);
}
