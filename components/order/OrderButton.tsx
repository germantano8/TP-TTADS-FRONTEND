import { ShoppingBagOutlined } from '@mui/icons-material'
import { Badge, Box, Button } from '@mui/material'
import router from 'next/router'
import React from 'react'
import { useOrder } from './useOrder'

const OrderButton = () => {
  const { subtotal, quantity } = useOrder()

  return (
    <Box my={3} position="absolute" bottom="0px">
      <Button
        variant="outlined"
        sx={{
          width: '200px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
        onClick={() => router.replace('/checkout/order')}
      >
        <Badge
          badgeContent={quantity}
          color="primary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <ShoppingBagOutlined />
        </Badge>
        <h4>Pedido</h4>
        {`$${subtotal}`}
      </Button>
    </Box>
  )
}

export default OrderButton
