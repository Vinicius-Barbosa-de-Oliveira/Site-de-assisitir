// components/community/types.ts

export type CommunityMessageType = {
  id: string;

  content: string;

  createdAt: Date | string;

  deleted?: boolean;

  deletedAt?: Date | string | null;

  user: {
    name: string | null;
    role?: string | null;
  };
};