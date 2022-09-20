import React from 'react'
import { useRouter } from 'next/router'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Box, Button, Card, IconButton, Typography } from '@mui/material'
import Layout from '../../components/Layout/Layout'
import ProductMultiplier from '../../components/order/ProductMultiplier'
import { useOrder } from '../../components/order/useOrder'
import OrderCheckoutStepper from '../../components/order/OrderCheckoutStepper'
import OrderDetail from '../../components/order/OrderDetail'

const OrderCheckoutPage = () => {
  const { order, isEmpty } = useOrder()
  const router = useRouter()

  if (!order || isEmpty) {
    return router.back()
  }

  return (
    <Layout auth={null}>
      <Box sx={{ display: 'flex' }}>
        <IconButton onClick={router.back}>
          <KeyboardArrowLeft />
        </IconButton>

        <h1>Checkout</h1>
      </Box>

      <OrderCheckoutStepper />

      <Box sx={{ display: 'inline-block' }}>
        <Typography>Estas llevando: </Typography>
        <Box
          sx={{
            display: 'inline-grid',
            gap: '7px',
            maxWidth: '400px'
          }}
        >
          {order.products.map(p => (
            <Card
              // eslint-disable-next-line no-underscore-dangle
              key={p._id}
              sx={{
                display: 'inline-flex',
                padding: '10px',
                margin: '5px',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ width: '200px', textAlign: 'left' }}>
                <p>{p.name}</p>
              </Box>
              <ProductMultiplier product={p} />
              <Box sx={{ width: '70px', textAlign: 'right' }}>
                <p>{`$${p.quantity * p.price}`}</p>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography fontWeight="bold">Resumen del pedido</Typography>
        <OrderDetail />
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => router.push('payment')}
      >
        Continuar
      </Button>
    </Layout>
  )
}

export default OrderCheckoutPage
