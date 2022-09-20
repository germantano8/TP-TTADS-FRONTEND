import React from 'react'
import { CardMedia, Box, Button, IconButton, Typography } from '@mui/material'
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
  const [count, setCount] = React.useState(1)
  const { addToOrder } = useOrder()

  const limit = 10
  const reachedMaxItems = count === limit
  const reachedMinItems = count === 1
  const img = selected.img ?? '/thumbnail-default.jpg'

  return (
    <Box sx={style}>
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
            alt={selected.alt}
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
            <Typography fontWeight="bold">{selected.name}</Typography>
            <Typography fontWeight="lighter" fontSize="14px">
              {selected.description}
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight="bold">${selected.price}</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#d9d9d9',
            borderRadius: '1rem',
            height: 'fit-content'
          }}
        >
          <IconButton
            onClick={() => setCount(prev => Math.max(1, prev - 1))}
            disabled={reachedMinItems}
          >
            <BiMinus
              fontSize="small"
              color={reachedMinItems ? 'gray' : 'black'}
            />
          </IconButton>

          <Box sx={{ width: '20px', textAlign: 'center', fontWeight: '600' }}>
            {count}
          </Box>

          <IconButton
            onClick={() => setCount(prev => Math.min(limit, prev + 1))}
            disabled={reachedMaxItems}
          >
            <BiPlus
              fontSize="small"
              color={reachedMaxItems ? 'gray' : 'black'}
            />
          </IconButton>
        </Box>

        <Button
          variant="contained"
          onClick={() => {
            addToOrder(selected, count)
            handleClose()
          }}
        >
          {`Agregar $${selected.price * count}`}
        </Button>
      </Box>
    </Box>
  )
}

export default OrderItemModal
