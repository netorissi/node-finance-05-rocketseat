import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactionsIncome = this.transactions.reduce(
      (acc, current) =>
        current.type === 'income' ? acc + current.value : acc + 0,
      0,
    );
    const transactionsOutcome = this.transactions.reduce(
      (acc, current) =>
        current.type === 'outcome' ? acc + current.value : acc + 0,
      0,
    );

    return {
      income: transactionsIncome,
      outcome: transactionsOutcome,
      total: transactionsIncome - transactionsOutcome,
    };
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
