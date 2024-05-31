'use client'
import Link from "next/link";

import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";

export default function Header() {
	return (
		<header className='mb-16'>
			<div className='flex justify-between max-w-2xl px-4 py-4 mx-auto'>
				<Link
					className='inline-flex items-center gap-1'
					href={'/'}
				>
					<FontAwesomeIcon
						className='h-8'
						icon={faMugHot}
					/>
					<span className='mt-2'>Buy me a coffe</span>
				</Link>
				<nav className='mt-2 flex gap-6 items-center'>
					<Link href={'/about'}>About </Link>
					<Link href={'/about'}>FAQ </Link>
					<Link href={'/about'}>Contact </Link>

					<div className='flex gap-4'>
						<button
							onClick={() => signIn('google')}
							className='border-2 rounded-full px-4 py-2 ml-4'
						>
							Login
						</button>
						<button className='bg-yellow-300 rounded-full px-4 py-2'>Sign up</button>
					</div>
				</nav>
			</div>
		</header>
	);
}
