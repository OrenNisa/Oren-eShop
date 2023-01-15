import { useNavigate } from "react-router-dom";
import { useCart } from "../../../StoreContext";
import "./Product.css";

const Product = ({ imgLink, productName, price, productId }) => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, isInCart } = useCart();
  let prodIndex = cart.findIndex((product) => product.id === productId);

  const addProductToCart = () => {
    let tempCart = [...cart];
    if (prodIndex !== -1) {
      tempCart[prodIndex].amount++;
    } else {
      let newProduct = { id: productId, amount: 1 };
      tempCart.push(newProduct);
    }
    prodIndex = tempCart.findIndex((product) => product.id === productId);
    addToCart(tempCart);
  };

  const removeProductFromCart = () => {
    let tempCart = [...cart];
    if (prodIndex !== -1) {
      if (tempCart[prodIndex].amount === 1) {
        tempCart.splice(prodIndex, 1);
      } else {
        tempCart[prodIndex].amount--;
      }
    }

    addToCart(tempCart);
  };
  return (
    <div className="product-card">
      <div className="product-image">
        <img
          onClick={() => {
            navigate(`product/${productId}`);
          }}
          src={imgLink}
          alt=""
        />
      </div>
      <div className="product-info">
        <h5>{productName}</h5>
        <h6>${price}</h6>
      </div>
      <div>
        <button
          onClick={() => {
            removeProductFromCart();
            console.log(prodInCart);
          }}
          //disabled={!prodInCart.productId}
        >
          -
        </button>
        <span>{cart?.[prodIndex]?.amount ? cart[prodIndex].amount : 0}</span>
        <button
          onClick={() => {
            addProductToCart();
            console.log(cart?.[prodIndex]?.amount);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
