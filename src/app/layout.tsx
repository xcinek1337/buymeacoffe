import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Buy me a Coffe',
	description: 'Donate and grow your idols.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Toaster />
				<Header session={session} />
				{children}
			</body>
		</html>
	);
}
