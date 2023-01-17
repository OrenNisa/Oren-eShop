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
    // <Card className="product-card">
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       height="140"
    //       image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
    //       alt="green iguana"
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="div">
    //         Lizard
    //       </Typography>
    //       <Typography variant="body2" color="text.secondary">
    //         Lizards are a widespread group of squamate reptiles, with over 6,000
    //         species, ranging across all continents except Antarctica
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button size="small" color="primary">
    //       Share
    //     </Button>
    //   </CardActions>
    // </Card>

    <Card className="product-card">
      <CardActionArea>
        <CardMedia component="img" image={imgLink} alt="" />
        <CardContent className="product-info">
          <Typography gutterBottom sx={{ fontSize: "1.5em" }} component="div">
            {productName}
          </Typography>
          <Typography gutterBottom variant="h9" component="div">
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className="buttons-section">
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
      </CardActions>
    </Card>
  );
};

export default Product;
