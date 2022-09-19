/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import type { NextPageContext } from 'next'
import { Box } from '@mui/system'
import {
  InfoOutlined,
  ShoppingBagOutlined,
  Star,
  Store
} from '@mui/icons-material'
import {
  Backdrop,
  Badge,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  Grid,
  Modal
} from '@mui/material'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Layout from '../../components/Layout/Layout'
import withAuth from '../../utils/withAuth'
import { useOrder } from '../../components/order/useOrder'

const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
}

const url = process.env.NEXT_PUBLIC_API_URL

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

const Restaurant = ({ restaurant: data, auth }: any) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<any>()
  const [amount, setAmount] = React.useState(1)
  const { addToOrder, subtotal, quantity } = useOrder()

  const handleOpen = (meal: any) => {
    setAmount(1)
    setOpen(true)
    setSelected(meal)
  }

  const handleClose = () => {
    setOpen(false)
    setSelected(null)
  }

  return (
    <Layout auth={auth}>
      <div className={styles.container}>
        <Box sx={{ marginBottom: 7 }}>
          <Box
            sx={{
              height: 233,
              background: '#22344f'
            }}
          />
          <Box
            component="img"
            sx={{
              width: 150,
              display: 'block',
              left: '132px',
              transform: 'translate(-40%, -65%)',
              position: 'absolute',
              borderRadius: '17px'
            }}
            src={data.image}
            alt={`${data.name} logo`}
          />
        </Box>

        <h1>{data.name}</h1>

        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <Star style={{ opacity: 0.55, color: '#faaf00' }} />
          <p>4.2</p> |<p>Delivery: ${data.deliveryPriceBase}</p>
        </Box>

        <p>{data.description}</p>

        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <Store style={{ opacity: 0.55 }} />
          {`${data.location.street} ${data.location.number}`}
          <Button
            type="button"
            onClick={() => window.alert(JSON.stringify(data.location, null, 2))}
          >
            <InfoOutlined style={{ opacity: 0.55 }} />
          </Button>
        </Box>

        {data.tags
          ? data.tags.map((m: any) => (
              // eslint-disable-next-line no-underscore-dangle
              <div key={m._id}>
                <p>{m.description}</p>
              </div>
            ))
          : 'No tags'}

        <div>
          {data.meals.length === 0 && (
            <Box sx={{ color: 'error.main' }}>No meals</Box>
          )}

          {data.meals && (
            <Grid container sx={{ gap: '30px' }}>
              {data.meals.map((m: any) => (
                // eslint-disable-next-line no-underscore-dangle
                <Grid item key={m._id}>
                  <Card sx={{ width: 345 }}>
                    <CardActionArea onClick={() => handleOpen(m)}>
                      {m.img && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={m.img}
                          alt={m.alt}
                        />
                      )}
                      <CardContent>
                        <h2>{m.name}</h2>
                        <p>{m.description}</p>
                        <p>${m.price}</p>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>

        {selected && (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={open}>
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
                    <Button
                      onClick={() => setAmount(prev => Math.max(1, prev - 1))}
                    >
                      <BiMinus />
                    </Button>
                    <Box sx={{ width: '20px', textAlign: 'center' }}>
                      {amount}
                    </Box>
                    <Button
                      onClick={() => setAmount(prev => Math.min(10, prev + 1))}
                    >
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
            </Fade>
          </Modal>
        )}

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
      </div>
    </Layout>
  )
}

export const getServerSideProps = withAuth(
  async (auth: Auth | null, context: NextPageContext) => {
    const { id } = context.query
    const data = await fetch(
      `${url}/restaurants/${id}?detailed=true`,
      requestOptions
    ).then(res => res.json())

    return {
      props: {
        restaurant: data,
        auth
      }
    }
  },
  false
)

export default Restaurant
