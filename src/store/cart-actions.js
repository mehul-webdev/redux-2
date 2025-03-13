import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

// Redux thunk API calls
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart Data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-learning-7d24d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error while sending failed");
      }

      const data = await response.json();
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent Cart Data sucessfully",
        })
      );
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error while sending data",
        })
      );
    }
  };
};

// Method 1: To create thunk
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-learning-7d24d-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }

      const data = response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error while sending data",
        })
      );
    }
  };
};

// Method 2

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (_, { dispatch }) => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          "https://redux-learning-7d24d-default-rtdb.firebaseio.com/cart.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const data = response.json();

        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Sent Cart Data sucessfully",
          })
        );

        return data;
      };

      const cartData = await fetchData();

      return cartData;
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Error while sending data",
        })
      );
    }
  }
);
