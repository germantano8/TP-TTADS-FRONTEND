/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { Box, IconButton } from '@mui/material'
import { BiMinus, BiPlus, BiTrash } from 'react-icons/bi'
import { useOrder } from './useOrder'

const ProductMultiplier = ({ product, limit = 10 }: any) => {
  const [count, setCount] = React.useState<number>(product.quantity)
  const { updateItem, removeItem } = useOrder()

  useEffect(() => {
    updateItem(product._id, count)
  }, [count])

  const reachedMaxItems = count === limit

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        borderRadius: '1rem'
      }}
    >
      {count === 1 ? (
        <IconButton onClick={() => removeItem(product._id)}>
          <BiTrash fontSize="small" color="black" />
        </IconButton>
      ) : (
        <IconButton onClick={() => setCount(prev => Math.max(1, prev - 1))}>
          <BiMinus fontSize="small" color="black" />
        </IconButton>
      )}

      <Box sx={{ width: '20px', textAlign: 'center', fontWeight: '600' }}>
        {count}
      </Box>

      <IconButton
        onClick={() => setCount(prev => Math.min(limit, prev + 1))}
        disabled={reachedMaxItems}
      >
        <BiPlus fontSize="small" color={reachedMaxItems ? 'gray' : 'black'} />
      </IconButton>
    </Box>
  )
}

export default ProductMultiplier
