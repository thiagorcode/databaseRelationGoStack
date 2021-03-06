import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) { }

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerEmailExists = await this.customersRepository.findByEmail(
      email,
    );

    if (customerEmailExists) {
      throw new AppError(
        'Informed email already registered. Sign up with another email.',
      );
    }

    const customer = this.customersRepository.create({ name, email });

    return customer;
  }
}

export default CreateCustomerService;
