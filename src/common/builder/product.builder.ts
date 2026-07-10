import { Product } from '../interfaces';

export class ProductBuilder {
  private id: string = '';
  private sku: string = '';
  private name: string = '';
  private description: string = '';
  private price: number = 0;
  private currency: string = 'USD';
  private categoryId: string = '';
  private attributes: Record<string, string> = {};
  private stock: number = 0;

  withId(id: string): ProductBuilder {
    this.id = id;
    return this;
  }

  withSku(sku: string): ProductBuilder {
    this.sku = sku;
    return this;
  }

  withName(name: string): ProductBuilder {
    this.name = name;
    return this;
  }

  withDescription(description: string): ProductBuilder {
    this.description = description;
    return this;
  }

  withPrice(price: number): ProductBuilder {
    this.price = price;
    return this;
  }

  withCurrency(currency: string): ProductBuilder {
    this.currency = currency;
    return this;
  }

  withCategory(categoryId: string): ProductBuilder {
    this.categoryId = categoryId;
    return this;
  }

  withAttribute(key: string, value: string): ProductBuilder {
    this.attributes[key] = value;
    return this;
  }

  withStock(stock: number): ProductBuilder {
    this.stock = stock;
    return this;
  }

  build(): Product {
    if (!this.id || !this.sku || !this.name) {
      throw new Error('Product must have id, sku, and name');
    }
    return {
      id: this.id,
      sku: this.sku,
      name: this.name,
      description: this.description,
      price: this.price,
      currency: this.currency,
      categoryId: this.categoryId,
      attributes: { ...this.attributes },
      stock: this.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
