import { CatalogComponent } from '../composite/catalog-component';

export interface CatalogIterator<T> {
  current(): T;
  next(): T;
  hasNext(): boolean;
  reset(): void;
}
