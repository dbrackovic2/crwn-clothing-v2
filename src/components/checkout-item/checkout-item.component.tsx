import { FC, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";
import { CartItem } from "../../store/cart/cart.types";

type CheckoutItemProps = {
    cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemToCartHandler = () =>
    dispatch(addItemToCart(cartItems, cartItem));
  const removeItemFromCartHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemFromCartHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;
