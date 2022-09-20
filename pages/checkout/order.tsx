import React from 'react'
import { useRouter } from 'next/router'
import { KeyboardArrowLeft } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Typography
} from '@mui/material'
import Layout from '../../components/Layout/Layout'
import ProductMultiplier from '../../components/order/ProductMultiplier'
import { useOrder } from '../../components/order/useOrder'
import OrderCheckoutStepper from '../../components/order/OrderCheckoutStepper'

const OrderCheckoutPage = () => {
  const { order, subtotal, isEmpty } = useOrder()
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

      <Button
        variant="contained"
        color="secondary"
        onClick={() => router.push('payment')}
      >
        Pagar
      </Button>
    </Layout>
  )
}

export default OrderCheckoutPage
