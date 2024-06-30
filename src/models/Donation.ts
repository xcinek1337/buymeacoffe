import { Schema, model, models } from 'mongoose';

type Donation = {
	amount: number;
	name: string;
	message?: string;
	crypto: 'BTC' | 'ETH' | 'LTC';
	paid: boolean;
};

const donationsSchema = new Schema({
	amount: { type: Number, required: true },
	message: { type: String, required: true },
	name: { type: String, required: false },
	crypto: {
		type: String,
		required: true,
		validate: {
			validator: function (v: string) {
				return ['BTC', 'ETH', 'LTC'].includes(v);
			},
		},
	},
	paid: { type: Boolean, default: false },
});

export const DonationModel = models?.Donation || model<Donation>('Donation', donationsSchema);
// import { model, models, Schema } from 'mongoose';

// export type ProfileInfo = {
// 	email: string;
// 	username: string;
// 	displayName: string;
// 	bio: string;
// 	avatarUrl: string;
// 	coverUrl: string;
// };

// const profileInfoSchema = new Schema<ProfileInfo>(
// 	{
// 		email: { type: String, unique: true, required: true },
// 		username: { type: String, unique: true, required: true },
// 		displayName: { type: String },
// 		bio: { type: String },
// 		avatarUrl: { type: String },
// 		coverUrl: { type: String },
// 	},
// 	{ timestamps: true }
// );

// export const ProfileInfoModel = models?.ProfileInfo || model<ProfileInfo>('ProfileInfo', profileInfoSchema);
