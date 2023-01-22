import "./Product.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../StoreContext";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

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
    <Card className="product-card">
      <CardActionArea
        onClick={() => {
          navigate(`product/${productId}`);
        }}
      >
        <CardMedia
          className="product-image"
          component="img"
          image={imgLink}
          alt=""
        />
        <CardContent className="product-info">
          <Typography className="product-name" gutterBottom component="div">
            {productName}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className="buttons-section">
        <Typography gutterBottom variant="h6" component="div">
          ${price}
        </Typography>
        <div>
          <Button
            onClick={() => removeProductFromCart(1)}
            disabled={!cart.has(productId)}
          >
            -
          </Button>
          <span>
            {cart.get(productId)?.amount ? cart.get(productId).amount : 0}
          </span>
          <Button onClick={() => addProductToCart(1)}>+</Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default Product;
