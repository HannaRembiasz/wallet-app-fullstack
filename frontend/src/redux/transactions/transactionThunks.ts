import api from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTransactionId } from "./transactionSlice";
import { changeBalance, editBalance } from "../user/userSlice";
import {
  FetchTransactionsParams,
  DeleteTransactionParams,
  AddTransactionParams,
  EditTransactionParams,
  ApiResponse,
  TransactionResponse,
  TransactionsListResponse,
  EditTransactionResponse,
  Transaction,
} from "./types";

export const fetchTransactions = createAsyncThunk<
  { transactions: Transaction[]; hasMore: boolean },
  FetchTransactionsParams
>(
  "transaction/fetchTransactions",
  async ({ page = 1, limit = 10, userId }: FetchTransactionsParams) => {
    const response = await api.get<ApiResponse<TransactionsListResponse>>("/home", {
      params: {
        limit,
        offset: (page - 1) * limit,
        userId,
      },
    });

    return {
      transactions: response.data.data.transactions,
      hasMore: response.data.data.transactions.length >= limit,
    };
  }
);

export const deleteTransaction = createAsyncThunk<
  { id: string; transaction: Transaction },
  DeleteTransactionParams
>(
  "transaction/deleteTransaction",
  async ({ id, userId }: DeleteTransactionParams, { dispatch }) => {
    const response = await api.delete<ApiResponse<TransactionResponse>>(`/home/${id}`, {
      params: { userId },
    });
    
    if (response.status === 200) {
      const transaction = response.data.data.transaction;
      if (transaction) {
        dispatch(
          changeBalance({
            amount: transaction.amount,
            type: transaction.type === "income" ? "minus" : "plus",
          }),
        );
      }
      dispatch(setTransactionId(null));
      return { id, transaction };
    }
    throw new Error("Failed to delete transaction");
  }
);

export const addTransaction = createAsyncThunk<Transaction, AddTransactionParams>(
  "transaction/addTransaction",
  async (transactionData: AddTransactionParams, { dispatch }) => {
    const response = await api.post<ApiResponse<TransactionResponse>>("/home", transactionData);
    
    if (response.status === 201) {
      const newTransaction = response.data.data.transaction;
      if (newTransaction) {
        dispatch(
          changeBalance({
            amount: newTransaction.amount,
            type: newTransaction.type === "income" ? "plus" : "minus",
          }),
        );
      }
      return newTransaction;
    }
    throw new Error("Failed to add transaction");
  }
);

export const editTransaction = createAsyncThunk<
  { updatedTransaction: Transaction; oldTransaction: Transaction },
  EditTransactionParams
>(
  "transaction/editTransaction",
  async ({ id, userId, updatedTransaction }: EditTransactionParams, { dispatch }) => {
    const response = await api.put<ApiResponse<EditTransactionResponse>>(`/home/${id}`, updatedTransaction, {
      params: { userId },
    });
    
    if (response.status === 200) {
      const newTransaction = response.data.data.updatedTransaction;
      const oldTransaction = response.data.data.oldTransaction;
      
      if (newTransaction && oldTransaction) {
        dispatch(
          editBalance({
            oldamount: oldTransaction.amount,
            newamount: newTransaction.amount,
            type: newTransaction.type,
          }),
        );
      }
      dispatch(setTransactionId(null));
      return { updatedTransaction: newTransaction, oldTransaction };
    }
    throw new Error("Failed to edit transaction");
  }
);
