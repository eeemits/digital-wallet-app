export * from './database';

export type QuickAction = {
  id: string;
  title: string;
  icon: string;
  route: string;
  color: string;
};

export type TransferFormData = {
  recipient: string;
  amount: number;
  note?: string;
};

export type AuthSession = {
  userId: string;
  email: string;
  fullName?: string;
};
