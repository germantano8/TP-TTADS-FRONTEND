import { KeyboardArrowLeft } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter } from 'next/router'
import React from 'react'
import { Formik, Form } from 'formik'
import Layout from '../../components/Layout/Layout'
import OrderCheckoutStepper from '../../components/order/OrderCheckoutStepper'
import { useOrder } from '../../components/order/useOrder'
import OrderDetail from '../../components/order/OrderDetail'

const PaymentCheckoutPage = () => {
  const { order } = useOrder()
  const router = useRouter()

  const handlePayment = () => {
    window.alert(JSON.stringify(order, null, 2))
  }

  return (
    <Layout auth={null}>
      <Box sx={{ display: 'flex' }}>
        <IconButton onClick={router.back}>
          <KeyboardArrowLeft />
        </IconButton>

        <h1>Checkout</h1>
      </Box>

      <OrderCheckoutStepper step={2} />

      <Box>
        <Typography fontWeight="bold">Resumen del pedido</Typography>
        <OrderDetail />
      </Box>

      <Formik initialValues={{}} onSubmit={handlePayment}>
        {({ isSubmitting }) => (
          <Form>
            <LoadingButton
              type="submit"
              variant="contained"
              color="secondary"
              loading={isSubmitting}
            >
              Finalizar
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default PaymentCheckoutPage
