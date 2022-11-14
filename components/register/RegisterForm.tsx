import React, {useState} from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import Button from '../Common/Button';
import TextField from '../Common/TextField'
import {
    Box,
    CircularProgress,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import router from 'next/router'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const url = process.env.NEXT_PUBLIC_API_URL

const registerSchema = Yup.object().shape({
    name: Yup.string().min(4, "Al menos 4 carácteres").max(20, "Hasta 20 carácteres").required("Requerido"),
    surname: Yup.string().min(4, "Al menos 4 carácteres").max(20, "Hasta 20 carácteres").required("Requerido"),
    phone: Yup.string().matches(new RegExp(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/), "Ingrese un número válido").required("Requerido"),
    email: Yup.string().email('Ingrese un email válido').required('Requerido'),
    password: Yup.string().required('Requerido'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required("Requerido"),

})

const initialValues: RegisterPayload = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
}

interface RegisterPayload {
    name: string,
    surname: string,
    phone: string,
    email: string
    password: string,
    confirmPassword: ''
}

const RegisterForm = () => {

    const [successfullyRegistered,setSuccessfullyRegistered] = useState(false);

    const mutation = useMutation(['register'], async (values: RegisterPayload) => {

        await axios.post(`${url}/users/register`, { ...values, role: "63711eda36e5d8de86be2116" }, {
            withCredentials: true
        });

        setSuccessfullyRegistered(true);
    })

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={values => mutation.mutate(values)}
                validationSchema={registerSchema}
            >
                {({ values, touched, errors }) => (
                    <Form>
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}
                        >
                            <Box>

                                <Field
                                    id="name"
                                    name="name"
                                    label="Nombre"
                                    as={TextField}
                                    fullWidth
                                    value={values.name}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                    margin="dense"
                                />


                                <Field
                                    id="surname"
                                    name="surname"
                                    label="Apellido"
                                    as={TextField}
                                    fullWidth
                                    value={values.surname}
                                    error={Boolean(touched.surname && errors.surname)}
                                    helperText={touched.surname && errors.surname}
                                    margin="dense"
                                />

                                <Field
                                    id="phone"
                                    name="phone"
                                    label="Teléfono"
                                    as={TextField}
                                    fullWidth
                                    value={values.phone}
                                    error={Boolean(touched.phone && errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                    margin="dense"
                                />

                                <Field
                                    id="email"
                                    name="email"
                                    label="Email"
                                    as={TextField}
                                    fullWidth
                                    value={values.email}
                                    error={(Boolean(touched.email && errors.email)) || (mutation.error && mutation.error.response.data.email !== null)}
                                    helperText={(touched.email && errors.email) || (mutation.error && mutation.error.response.email !== null ? "El mail ingresado ya está registrado" : null)}
                                    margin="dense"

                                />

                                <Field
                                    id="password"
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    as={TextField}
                                    fullWidth
                                    value={values.password}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                    margin="dense"

                                />


                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirmar Contraseña"
                                    type="password"
                                    as={TextField}
                                    fullWidth
                                    value={values.confirmPassword}
                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                    margin="dense"

                                />

                            </Box>

                            <Button
                                variant="contained"
                                type="submit"
                                disabled={mutation.isLoading}
                            >
                                {mutation.isLoading ? (
                                    <CircularProgress size={22} />
                                ) : (
                                    'Registrarse'
                                )}
                            </Button>

                        </Box>
                    </Form>
                )}
            </Formik>
            <Dialog
                open={successfullyRegistered}
                TransitionComponent={Slide}
            >
                <DialogTitle>
                    {"¡Bienvenido!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tu registro ha sido efectuado correctamente. Ya puede ingresar y comenzar a realizar pedidos.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant='contained' onClick={() => router.push("/login")}>Ir a Acceder</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RegisterForm
