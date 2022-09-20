import React from 'react'
import { Card, CardActionArea, CardMedia, Typography, Box } from '@mui/material'

const ProductCard = ({ product, handleOpen }: any) => {
  const img = product.img ?? '/thumbnail-default.jpg'
  return (
    // eslint-disable-next-line no-underscore-dangle
    <Card sx={{ width: 345 }} key={product._id}>
      <CardActionArea sx={{ p: '6px' }} onClick={() => handleOpen(product)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '7px'
          }}
        >
          <Box sx={{ width: 70 }}>
            <CardMedia
              component="img"
              sx={{ width: 70, height: 70, borderRadius: '1rem' }}
              image={img}
              alt={product.alt}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}
          >
            <Box>
              <Typography fontWeight="bold">{product.name}</Typography>
              <Typography fontWeight="lighter" fontSize="14px">
                {product.description}
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight="bold">${product.price}</Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
