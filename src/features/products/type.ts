export type ProductStatus = 'active' | 'inactive';

export interface ProductMedia {
  url: string;
  alt?: string;
  isPrimary?: boolean;
  sortOrder?: number;
}

export interface ProductVariantOption {
  value: string;
  label?: string;
  available?: boolean;
  swatchHex?: string;
}

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  media?: ProductMedia[];
  price: number;
  category: 'electronics' | 'fashion' | 'home' | 'books' | 'others';
  size?: string;
  color?: string;
  sizeOptions?: ProductVariantOption[];
  colorOptions?: ProductVariantOption[];
  brand?: string;
  style?: string;
  stock: number;
  sku?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilters {
  page: number;
  limit: number;
  search?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  priceRanges?: string[];
  sizes?: string[];
  colors?: string[];
  brands?: string[];
  styles?: string[];
  sortBy?: 'createdAt' | 'price' | 'name';
  sortOrder?: 'asc' | 'desc';
  status?: ProductStatus | 'all';
}

export interface ProductPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface ProductPageState {
  items: Product[];
  pagination: ProductPagination;
  filters: ProductFilters;
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  deleteTarget: Product | null;
  formMode: 'create' | 'edit';
  isDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
}

export interface ProductFormValues extends Omit<Product, '_id' | 'id' | 'createdAt' | 'updatedAt'> {
  category: Product['category'];
}
