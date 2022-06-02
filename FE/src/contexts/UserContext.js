import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: null,
  token: localStorage.getItem("token"),
  carts: [],
  totalCart: { subtotal: 0, orderQuantity: 0, total: 0 },
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case "REGISTER":
    case "AUTH_REGISTER":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case "LOGOUT":
    case "AUTH_ERROR":
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    case "ADD_TO_CART":
      const isCart = state.carts.filter(
        (product) => product.id === action.payload.id
      );
      if (isCart.length > 0) {
        const newCart = state.carts.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              orderQuantity: product.orderQuantity + 1,
            };
          } else {
            return product;
          }
        });
        return {
          ...state,
          carts: newCart,
        };
      }
      const newCart = [...state.carts, { ...action.payload, orderQuantity: 1 }];
      return {
        ...state,
        carts: newCart,
      };
    case "DESC_TO_CART":
      return {
        ...state,
        carts: state.carts.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              orderQuantity: product.orderQuantity - 1,
            };
          } else {
            return product;
          }
        }),
      };
    case "REMOVE_TO_CART":
      return {
        ...state,
        carts: state.carts.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    case "RESET_CART":
      localStorage.removeItem("cart");
      return {
        ...state,
        carts: [],
      };
    case "SAVE_CART":
      localStorage.setItem("cart", JSON.stringify(state.carts));
      return state;
    case "UPDATE_CART":
      const cart = localStorage.getItem("cart");
      if (!cart) {
        return state;
      }
      return {
        ...state,
        carts: JSON.parse(cart),
      };
    case "GET_TOTAL_CART":
      if (state.carts.length > 0) {
        let subtotal = 0,
          orderQuantity = 0,
          total = 0;
        state.carts.forEach((product) => {
          subtotal += product.price;
          orderQuantity += product.orderQuantity;
          total += product.orderQuantity * product.price;
        });
        return {
          ...state,
          totalCart: { subtotal, orderQuantity, total },
        };
      } else {
        return {
          state,
          totalCart: initialState.totalCart,
        };
      }
    default:
      throw new Error("unknown cases");
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
