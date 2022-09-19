import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import React from 'react'

const ProductCard = ({ product, handleOpen }: any) => (
  // eslint-disable-next-line no-underscore-dangle
  <Card sx={{ width: 345 }} key={product._id}>
    <CardActionArea onClick={() => handleOpen(product)}>
      {product.img && (
        <CardMedia
          component="img"
          height="140"
          image={product.img}
          alt={product.alt}
        />
      )}
      <CardContent>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </CardContent>
    </CardActionArea>
  </Card>
)

export default ProductCard
