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
    // const transactionWithBalance = {
    //   this.transactions,
    //   this.transactions.getBalance(),
    // };

    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acumulated: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            acumulated.income += transaction.value;
            break;
          case 'outcome':
            acumulated.outcome += transaction.value;
            break;
          default:
            break;
        }
        return acumulated;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    // const somaIncome = this.transactions.reduce((acumulated, transaction) => {
    //   if (transaction.type === 'income') {
    //     return acumulated + transaction.value;
    //   }
    // }, 0);

    // const balance = {
    //   income: somaIncome,
    //   outcome: somaOutcome,
    //   total: somaIncome - somaOutcome,
    // };
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
