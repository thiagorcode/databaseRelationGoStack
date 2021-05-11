/* eslint-disable no-restricted-syntax */
import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';
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

  public async findById(product: IFindProducts): Promise<Product[]> {
    const findProduct = await this.ormRepository.find({
      where: { id: product.id },
    });

    return findProduct;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const productIds = products.map(product => product.product_id);
    const product = await this.ormRepository.find({
      where: { id: In(productIds) },
    });

    const productWithQuantityAltered = products.map(p => {
      return {
        id: p.product_id,
        quantity:
          product.filter(prd => prd.id === p.product_id)[0].quantity -
          p.quantity,
      };
    });

    return this.ormRepository.save(productWithQuantityAltered);
  }

  public async updateProduct(product: IUpdateProductDTO): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
