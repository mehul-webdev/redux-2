import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { items } = useSelector((state) => state.cart);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((ele) => {
          return (
            <CartItem
              key={ele.id}
              item={{
                title: ele.title,
                quantity: ele.quantity,
                total: ele.totalPrice,
                price: ele.price,
                id: ele.id,
              }}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
