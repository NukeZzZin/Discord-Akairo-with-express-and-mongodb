import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
    Id: number;
    Username: string;
    Avatar: string;
    Discriminator: number;
    Flags?: number | null;
    Email?: string | null;
    Locale: string;
    Verified: boolean;
    Mfa_Enabled: boolean;
    Provider: string;
    Guilds?: Object[];
    RefreshToken: string;
    AccessToken: string
};

const UserModelSchema: Schema = new Schema({
    Id: { type: Number, required: true, Unique: true },
    Username: { type: String, required: true },
    Avatar: { type: String, required: true },
    Discriminator: { type: Number, required: true },
    Flags: { type: Number, required: true },
    Email: { type: String, required: true },
    Locale: { type: String, required: true },
    Verified: { type: Boolean, required: true },
    Mfa_Enabled: { type: Boolean, required: true },
    Provider: { type: String, required: true },
    Guilds: { type: Array, required: true },
    RefreshToken: { type: String, required: true },
    AccessToken: { type: String, required: true },
});

const User = mongoose.model<UserInterface>("UserModel", UserModelSchema);
export default User;