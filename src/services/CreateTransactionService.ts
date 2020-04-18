import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (value > total) {
        throw Error(
          'This transiction can`t be registred, the spend is more tham the bugnet',
        );
      }
    }

    const transatiction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transatiction;
  }
}

export default CreateTransactionService;
