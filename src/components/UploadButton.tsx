import { uploadToS3 } from '@/actions/uploadActions';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent } from 'react';

export default function UploadButton({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
	async function upload(ev: ChangeEvent) {
		const target = ev.target as HTMLInputElement;
		if (target.files?.length) {
			const file = target.files[0];
			const formData = new FormData();
			formData.set('file', file);
			const result = await uploadToS3(formData);
			onUploadComplete(result.url!);
		}
	}
	return (
		<label className='cursor-pointer rounded-lg bg-gray-200 p-2'>
			<FontAwesomeIcon icon={faUpload} />
			<input
				type='file'
				className='hidden'
				onChange={(ev) => upload(ev)}
			/>
		</label>
	);
}
