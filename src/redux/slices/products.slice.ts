import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFilters, ProductPageState } from '../../features/products/type';
import { ENDPOINTS } from '../../constants/endpoint';
import { http } from '../../utils/http';
import { addAlert } from './stackAlert.slice';
import { hideLoading, showLoading } from './loading.slice';

const initialFilters: ProductFilters = {
  page: 1,
  limit: 10,
  status: 'active',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const initialState: ProductPageState = {
  items: [],
  pagination: {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  },
  filters: initialFilters,
  loading: false,
  error: null,
  selectedProduct: null,
  deleteTarget: null,
  formMode: 'create',
  isDialogOpen: false,
  isDeleteDialogOpen: false,
};

const buildQueryString = (filters: ProductFilters) => {
  const params = new URLSearchParams();

  params.set('page', String(filters.page || 1));
  params.set('limit', String(filters.limit || 10));
  params.set('sortBy', filters.sortBy || 'createdAt');
  params.set('sortOrder', filters.sortOrder || 'desc');

  if (filters.search?.trim()) {
    params.set('search', filters.search.trim());
  }

  if (filters.categories?.length) {
    params.set('category', filters.categories.join(','));
  }

  if (filters.minPrice !== undefined) {
    params.set('minPrice', String(filters.minPrice));
  }

  if (filters.maxPrice !== undefined) {
    params.set('maxPrice', String(filters.maxPrice));
  }

  if (filters.priceRanges?.length) {
    params.set('priceRange', filters.priceRanges.join(','));
  }

  if (filters.sizes?.length) {
    params.set('size', filters.sizes.join(','));
  }

  if (filters.colors?.length) {
    params.set('color', filters.colors.join(','));
  }

  if (filters.brands?.length) {
    params.set('brand', filters.brands.join(','));
  }

  if (filters.styles?.length) {
    params.set('style', filters.styles.join(','));
  }

  if (filters.status && filters.status !== 'all') {
    params.set('status', filters.status);
  }

  return params.toString();
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(showLoading());
      const state = getState() as { products: ProductPageState };
      const queryString = buildQueryString(state.products.filters);
      const resp = await http.get(`${ENDPOINTS.ADMIN_PRODUCTS}?${queryString}`);

      if (!resp.success) {
        dispatch(addAlert({ message: resp.message || 'Failed to load products', severity: 'error' }));
        return rejectWithValue(resp);
      }

      const data = resp.data as {
        products?: Product[];
        pagination?: ProductPageState['pagination'];
      } | undefined;

      dispatch(setProducts(data?.products || []));
      if (data?.pagination) {
        dispatch(setPagination(data.pagination));
      }

      return resp;
    } catch (error: any) {
      dispatch(addAlert({ message: error.message || 'Failed to load products', severity: 'error' }));
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
      dispatch(hideLoading());
    }
  }
);

export type SaveProductPayload = {
  mode: 'create' | 'edit';
  id?: string;
  values: Omit<Product, '_id' | 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>;
};

export const saveProduct = createAsyncThunk(
  'products/saveProduct',
  async (payload: SaveProductPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(showLoading());

      const requestData = {
        ...payload.values,
        sku: payload.values.sku?.trim() || undefined,
      };

      const resp =
        payload.mode === 'create'
          ? await http.post(ENDPOINTS.ADMIN_PRODUCTS, requestData)
          : await http.put(ENDPOINTS.ADMIN_PRODUCT_BY_ID(payload.id || ''), requestData);

      if (!resp.success) {
        dispatch(addAlert({ message: resp.message || 'Unable to save product', severity: 'error' }));
        return rejectWithValue(resp);
      }

      dispatch(addAlert({ message: resp.message || 'Product saved successfully', severity: 'success', autoHidden: true }));
      await dispatch(fetchProducts());
      dispatch(setDialogOpen(false));
      dispatch(setSelectedProduct(null));
      return resp;
    } catch (error: any) {
      dispatch(addAlert({ message: error.message || 'Unable to save product', severity: 'error' }));
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
      dispatch(hideLoading());
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(showLoading());
      const resp = await http.delete(ENDPOINTS.ADMIN_PRODUCT_BY_ID(id));

      if (!resp.success) {
        dispatch(addAlert({ message: resp.message || 'Unable to delete product', severity: 'error' }));
        return rejectWithValue(resp);
      }

      dispatch(addAlert({ message: resp.message || 'Product updated successfully', severity: 'success', autoHidden: true }));
      dispatch(setDeleteDialogOpen(false));
      dispatch(setDeleteTarget(null));
      await dispatch(fetchProducts());
      return resp;
    } catch (error: any) {
      dispatch(addAlert({ message: error.message || 'Unable to delete product', severity: 'error' }));
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
      dispatch(hideLoading());
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    setPagination(state, action: PayloadAction<ProductPageState['pagination']>) {
      state.pagination = action.payload;
      state.filters.page = action.payload.page;
      state.filters.limit = action.payload.limit;
    },
    setFilters(state, action: PayloadAction<Partial<ProductFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setSelectedProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
      state.formMode = action.payload ? 'edit' : 'create';
    },
    setDeleteTarget(state, action: PayloadAction<Product | null>) {
      state.deleteTarget = action.payload;
    },
    setDialogOpen(state, action: PayloadAction<boolean>) {
      state.isDialogOpen = action.payload;
      if (!action.payload) {
        state.selectedProduct = null;
        state.formMode = 'create';
      }
    },
    setDeleteDialogOpen(state, action: PayloadAction<boolean>) {
      state.isDeleteDialogOpen = action.payload;
      if (!action.payload) {
        state.deleteTarget = null;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetFilters(state) {
      state.filters = initialFilters;
    },
    resetProductsState() {
      return initialState;
    },
  },
});

export const {
  setProducts,
  setPagination,
  setFilters,
  setSelectedProduct,
  setDeleteTarget,
  setDialogOpen,
  setDeleteDialogOpen,
  setLoading,
  setError,
  resetFilters,
  resetProductsState,
} = productsSlice.actions;

export default productsSlice.reducer;