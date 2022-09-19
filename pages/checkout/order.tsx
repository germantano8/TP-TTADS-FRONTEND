import { Box, Card, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useOrder } from '../../components/order/useOrder'

const OrderCheckoutPage = () => {
  const { order, subtotal, isEmpty } = useOrder()
  const router = useRouter()

  if (!order || isEmpty) {
    return (
      <Layout auth={null}>
        <Typography>No hay una orden activa</Typography>
      </Layout>
    )
  }

  return (
    <Layout auth={null}>
      <button type="button" onClick={router.back}>
        Atras
      </button>
      <h1>Checkout</h1>

      <Box sx={{ display: 'grid' }}>
        <Box
          sx={{
            display: 'inline-grid',
            gap: '7px',
            maxWidth: '400px'
          }}
        >
          <Typography>Estas llevando: </Typography>
          {order.products.map(p => (
            <Card
              sx={{
                display: 'inline-flex',
                padding: '10px',
                margin: '5px',
                justifyContent: 'space-between'
              }}
            >
              <p>{p.name}</p>
              <p>{`x ${p.quantity}`}</p>
              <p>{`$${p.quantity * p.price}`}</p>
            </Card>
          ))}
        </Box>

        <Card
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
      </Box>
    </Layout>
  )
}

export default OrderCheckoutPage
