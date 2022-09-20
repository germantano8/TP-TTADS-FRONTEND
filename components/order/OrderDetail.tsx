import { Card, Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { useOrder } from './useOrder'

const OrderDetail = () => {
  const { subtotal } = useOrder()

  return (
    <Card
      elevation={2}
      sx={{
        display: 'inline-grid',
        gap: '3px',
        width: '260px',
        padding: '14px',
        margin: '5px'
      }}
    >
      <Box sx={{ display: 'inline-flex', justifyContent: 'space-between' }}>
        <Typography>Productos</Typography>
        <Typography>{`$${subtotal}`}</Typography>
      </Box>
      <Box sx={{ display: 'inline-flex', justifyContent: 'space-between' }}>
        <Typography>Envio</Typography>
        <Typography>{`$${0}`}</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: 'inline-flex', justifyContent: 'space-between' }}>
        <Typography fontWeight="bold">Total</Typography>
        <Typography fontWeight="bold">{`$${subtotal + 0}`}</Typography>
      </Box>
    </Card>
  )
}

export default OrderDetail
