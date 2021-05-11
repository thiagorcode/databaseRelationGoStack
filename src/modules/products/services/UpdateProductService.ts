import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  public async execute({
    id,
    name,
    quantity,
    price,
  }: IRequest): Promise<Product> {
    const existingProduct = await this.productsRepository.findById({ id });

    if (!existingProduct) {
      throw new AppError('Product do not existing for atualizing!');
    }

    const nameProductExisting = await this.productsRepository.findByName(name);
    // Valida se o nome existe e o nome é diferente do nome atual
    if (nameProductExisting && nameProductExisting.name !== name) {
      throw new AppError('Is name product already existing!', 400);
    }

    const updatedProduct = await this.productsRepository.updateProduct({
      id,
      name,
      price,
      quantity,
    });

    return updatedProduct;
  }
}

export default UpdateProductService;
