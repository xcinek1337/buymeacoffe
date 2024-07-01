import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function PaymentSuccess({ searchParams: { amount } }: { searchParams: { amount: string } }) {
	// jakis motywujace zdanie ze sie rozwija przyszlych sigmamale
	//duzy przycisk powrotu do proflu lub do glownej strony /

	return (
		<section className='max-w-lg mt-6 mx-auto text-center'>
			<h1 className='text-3xl font-bold'>
				You have successfully transmitted donation
				<br />
				Your name and message will be displayed
			</h1>
			<div className='flex mt-4 items-center justify-center'>
				<span className='font-bold'>{amount} x </span>
				<FontAwesomeIcon icon={faCoffee} />
			</div>
			<h2 className='text-xl mt-4 mb-8'>
				Thank you for your generosity! <br />
				Your support empowers future stars to inspire the world. Keep believing in their journey!
			</h2>

			<Link
				href={'/'}
				className='bg-yellow-300 px-8 py-4 font-bold rounded-full'
			>
				Get back
			</Link>
		</section>
	);
}
