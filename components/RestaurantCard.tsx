import React from 'react'
import {
  Card,
  CardMedia,
  Box,
  CardContent,
  Typography,
  CardActionArea
} from '@mui/material'
import { useRouter } from 'next/router'
import getDeliveryTime from '../utils/getDeliveryTime'
import getPrice from '../utils/getPrice'

interface Props {
  restaurant: any
  userLocation: any
}
const RestaurantCard = ({ restaurant, userLocation }: Props) => {
  const router = useRouter()
  return (
    <Card sx={{ marginTop: '2rem' }}>
      <CardActionArea
        sx={{ display: 'flex', justifyContent: 'flex-start' }}
        onClick={() =>
          // eslint-disable-next-line no-underscore-dangle
          router.push(`restaurant/${restaurant._id}`)
        }
      >
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={restaurant.image}
          alt={`${restaurant.name} logo`}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {restaurant.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {restaurant.description}
            </Typography>
            <br />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {getDeliveryTime(userLocation, restaurant)}
              <br />
              {getPrice(userLocation, restaurant)}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default RestaurantCard
