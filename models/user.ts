import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'subscriber' | 'admin' | 'root';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://default-avatar.com/default.png',
    },
    role: {
      type: String,
      default: 'subscriber',
      enum: ['subscriber', 'admin', 'root'],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Ensure password is not already hashed
  if (!this.password.startsWith('$2b$')) {
    this.password = await bcrypt.hash(this.password, 11);
  }

  next();
});

const User = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);
export default User;
