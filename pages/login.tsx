import React from 'react'
import type { NextPage } from 'next'
import { Box, Card, Typography } from '@mui/material'
import withAuth from '../utils/withAuth'
import LoginForm from '../components/login/LoginForm'
import { globalTheme } from '../styles/theme/globalTheme'

const LoginPage: NextPage<{ auth: Auth }> = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: globalTheme.palette.primary.main,
      }}
    >
      <Card sx={{ width: "650px", padding: "2rem", overflowY: "auto" }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">Bienvenido</Typography>
          <Typography fontWeight="light">Inicia sesión en tu cuenta</Typography>
        </Box>
        <Box>
          <LoginForm />
        </Box>
      </Card>
    </Box>
  )
}

export const getServerSideProps = withAuth(async (auth: Auth | null) => {
  if (auth) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return { props: { auth } }
}, false)

export default LoginPage
