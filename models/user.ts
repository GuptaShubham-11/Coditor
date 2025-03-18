import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role: "subscriber" | "admin" | "root";
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 32
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false // Prevent sending it in queries
        },
        avatar: {
            type: String,
            default: "https://default-avatar.com/default.png"
        },
        role: {
            type: String,
            default: "subscriber",
            enum: ["subscriber", "admin", "root"]
        }
    },
    {
        timestamps: true
    }
);

// Hash password before saving
userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 11);
    next();
});

// Compare Password Method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
export default User;
