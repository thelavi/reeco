import { createSlice } from "@reduxjs/toolkit";

import StoreDetails from "./initialState";

const ReecoSlice = createSlice({
  name: "ReecoSlice",
  initialState: StoreDetails,
  reducers: {
    updateStatus: (state, action) => {
      const { selectedItem, status } = action.payload;

      const productIndex = state.cartList.findIndex(
        (item: { productName: string }) =>
          item.productName === selectedItem.productName
      );

      if (productIndex !== -1) {
        state.cartList[productIndex].status = status;
      }
    },

    editCart: (state, action) => {
      const { productName, price, quantity, reason } = action.payload;

      const productIndex = state.cartList.findIndex(
        (item: { productName: string }) => item.productName === productName
      );

      if (productIndex !== -1) {
        state.cartList[productIndex].quantity = parseInt(quantity);
        state.cartList[productIndex].price = price;
        state.cartList[productIndex].reason = reason;
      }
    },
    orderStatus: (state) => {
      state.OrderApproval_status = true;
    },
    addtoCart: (state, action) => {
      const { brand, image, price, productName, quantity, status } =
        action.payload;
      const newItem = {
        id: state.cartList.length + 1,
        productName: productName,
        brand: brand,
        price: price,
        quantity: parseInt(quantity),
        status: status,
        image: image,
        reason: "",
      };
      state.cartList.push(newItem);
    },
  },
});

export const { updateStatus, editCart, orderStatus, addtoCart } =
  ReecoSlice.actions;
export default ReecoSlice.reducer;
