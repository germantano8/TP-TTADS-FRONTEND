import React from 'react'
import type { NextPage } from 'next'
import { Box, Card, Typography } from '@mui/material'
import withAuth from '../utils/withAuth'
import RegisterForm from '../components/register/RegisterForm';
import { globalTheme } from '../styles/theme/globalTheme';

const RegisterPage: NextPage<{ auth: Auth }> = () => {
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
                <Card sx={{ width: "650px", padding: "2rem", height:"600px" ,overflowY: "auto"}}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4">Registrarse</Typography>
                        <Typography fontWeight="light">Por favor, registra los siguientes datos: </Typography>
                    </Box>
                    <Box>
                        <RegisterForm />
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

export default RegisterPage
