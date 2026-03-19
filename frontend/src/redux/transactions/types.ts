export interface Transaction {
  _id: string;
  type: 'income' | 'expense';
  category?: string;
  amount: number;
  date: string;
  comment?: string;
  userId: string;
}

// Add these API response types
export interface ApiResponse<T> {
  status: string;
  code: number;
  data: T;
}

export interface TransactionResponse {
  transaction: Transaction;
}

export interface TransactionsListResponse {
  transactions: Transaction[];
}

export interface EditTransactionResponse {
  updatedTransaction: Transaction;
  oldTransaction: Transaction;
}

export interface FetchTransactionsParams {
  page?: number;
  limit?: number;
  userId: string;
}

export interface DeleteTransactionParams {
  id: string;
  userId: string;
}

export interface AddTransactionParams {
  type: 'income' | 'expense';
  category?: string;
  amount: number;
  date: string;
  comment?: string;
  userId: string;
}

export interface EditTransactionParams {
  id: string;
  userId: string;
  updatedTransaction: {
    type: 'income' | 'expense';
    category?: string;
    amount: number;
    date: string;
    comment?: string;
  };
}

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  transactionId: string | null;
}