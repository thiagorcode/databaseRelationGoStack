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
    const productValidation = products.map(product => {
      const findProduct = this.ormRepository
        .findOne(product.id)
        .then(data => {
          console.log(data);
          return data;
        })
        .catch(err => {
          throw new AppError(
            `Product requisition did not return data - ${err}`,
          );
        });
      console.log(findProduct);
      return findProduct;
    });

    if (!productValidation) {
      throw new AppError('Product requisition did not return data');
    }

    return productValidation;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> { }
}

export default ProductsRepository;
