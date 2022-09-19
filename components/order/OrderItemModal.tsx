import React from 'react'
import { CardContent, CardMedia, Box, Button } from '@mui/material'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { useOrder } from './useOrder'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const OrderItemModal = ({ handleClose, selected }: any) => {
  const [amount, setAmount] = React.useState(1)
  const { addToOrder } = useOrder()

  return (
    <Box sx={style}>
      {selected.img && (
        <CardMedia
          component="img"
          height="140"
          image={selected.img}
          alt={selected.alt}
        />
      )}
      <CardContent>
        <h2>{selected.name}</h2>
        <p>{selected.description}</p>
        <p>${selected.price}</p>
      </CardContent>

      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Button onClick={() => setAmount(prev => Math.max(1, prev - 1))}>
            <BiMinus />
          </Button>
          <Box sx={{ width: '20px', textAlign: 'center' }}>{amount}</Box>
          <Button onClick={() => setAmount(prev => Math.min(10, prev + 1))}>
            <BiPlus />
          </Button>
        </Box>

        <Button
          onClick={() => {
            addToOrder(selected, amount)
            handleClose()
          }}
        >
          {`Agregar $${selected.price * amount}`}
        </Button>
      </Box>
    </Box>
  )
}

export default OrderItemModal
