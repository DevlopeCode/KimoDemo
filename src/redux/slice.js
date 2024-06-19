import {createSlice} from '@reduxjs/toolkit';
const calculateTotalPrice = items => {
  return items?.reduce((total, item) => total + item.count * item.price, 0);
};
const dataSlice = createSlice({
  name: 'apidata',
  initialState: {
    items: [],
    loading: false,
    error: null,
    cart: [],
    totalPrice: 0,
  },
  reducers: {
    fetchDataStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.cart.push({...action.payload, count: 1});
      }
      state.totalPrice = calculateTotalPrice(state.cart);
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cart.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        // Decrease the quantity, and remove the item if it reaches 0
        existingItem.count -= 1;

        if (existingItem.count === 0) {
          state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
      }

      // Recalculate the total price
      state.totalPrice = calculateTotalPrice(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
      state.totalPrice = calculateTotalPrice(state.cart);
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  addToCart,
  removeFromCart,
  decreaseQuantity,
} = dataSlice.actions;
export default dataSlice.reducer;
