import mongoose from 'mongoose';
import { XPMember } from '../types/types';

const XPMemberModel = new mongoose.Schema<XPMember>({
  UserID: { type: String, required: true },
  GuildID: { type: String, required: true },
  XP: { type: Number, required: true },
  Level: { type: Number, required: true },
});

export default mongoose.model<XPMember>('XPMember', XPMemberModel);
