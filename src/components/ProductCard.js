import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
    <CardMedia
    component="img"
    image = {product.image}
    alt = "Product"
    />

    <CardContent>
    <Typography component={"div"}>{product.name}</Typography>
    <Typography>{product.cost}</Typography>
    <Rating
            // name="read-only"
            value={product.rating}
            readOnly
            // size="small"
          />
    <CardActions><Button fullWidth variant="contained" onClick={handleAddToCart}>Add to Cart</Button></CardActions>
    </CardContent>
    </Card>
  );
};

export default ProductCard;
