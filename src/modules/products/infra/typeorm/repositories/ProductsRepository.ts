/* eslint-disable no-restricted-syntax */
import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const productByName = await this.ormRepository.findOne({ where: { name } });

    return productByName;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productNew: Product[] = [];

    for (const product of products) {
      // eslint-disable-next-line no-await-in-loop
      const findProductID = await this.ormRepository.findOne({
        where: { id: product.id },
      });

      if (!findProductID) {
        throw new AppError('Non-existing Product!');
      }

      productNew.push(findProductID);
    }

    if (!productNew) {
      throw new AppError('Product requisition did not return data');
    }

    return productNew;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> { }
}

export default ProductsRepository;
