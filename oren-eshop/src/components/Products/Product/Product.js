import { useNavigate } from "react-router-dom";
import { useCart } from "../../../StoreContext";
import "./Product.css";

const Product = ({ imgLink, productName, price, productId }) => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const addProductToCart = (newAmount) => {
    let currentProduct = cart.get(productId);
    if (currentProduct) {
      setCart((prevCart) => {
        return new Map(prevCart).set(productId, {
          imgLink,
          productName,
          price,
          amount: currentProduct.amount + newAmount,
        });
      });
    } else {
      setCart((prevCart) => {
        return new Map(prevCart).set(productId, {
          imgLink,
          productName,
          price,
          amount: newAmount,
        });
      });
    }
  };

  const removeProductFromCart = (newAmount) => {
    let currentProduct = cart.get(productId);
    if (currentProduct) {
      if (currentProduct.amount - newAmount > 0) {
        setCart((prevCart) => {
          return new Map(prevCart).set(productId, {
            imgLink,
            productName,
            price,
            amount: currentProduct.amount - newAmount,
          });
        });
      } else {
        setCart((prevCart) => {
          prevCart.delete(productId);
          return new Map(prevCart);
        });
      }
    }
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
          onClick={() => removeProductFromCart(1)}
          disabled={!cart.has(productId)}
        >
          -
        </button>
        <span>
          {cart.get(productId)?.amount ? cart.get(productId).amount : 0}
        </span>
        <button onClick={() => addProductToCart(1)}>+</button>
      </div>
    </div>
  );
};

export default Product;
