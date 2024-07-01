'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { convertToSubcurrency } from '@/lib/convertToSubcurrency';
import CheckoutPage from '@/components/CheckoutPage';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
	throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Stripe({ amount }: { amount: number}) {
	return (
		<main className='max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-red-400 to-yellow-200'>
			<div className='mb-10'>
				<h1 className='text-4xl font-extrabold mb-2'>pwred by Stripe</h1>
				<h2 className='text-2xl'>
					has requested <span className='font-bold'>${amount * 3}</span>
				</h2>
			</div>

			<Elements
				stripe={stripePromise}
				options={{
					mode: 'payment',
					amount: convertToSubcurrency(amount * 3),
					currency: 'usd',
				}}
			>
				<CheckoutPage
					
					amount={amount * 3}
				/>
			</Elements>
		</main>
	);
}
