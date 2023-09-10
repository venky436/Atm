import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styles from './Deposite.module.css'
import { depositeAction, withdrawlAction } from '../../Store/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export default function Transaction() {


    const accountState = useSelector((state) => state.accountDetails.data)
    const [amount, setAmount] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    // const [password, setPassword] = useState('')
    const navigate = useNavigate()

    let depositeHandler = async () => {
        switch (searchParams.get("use")) {
            case 'deposite':
                if (amount && accountNumber) {

                    let res = await depositeAction({ accountNumber, amount })
                    if (res) {
                        toast.success(`${res?.message}`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setTimeout(() => {
                            navigate('/')
                        }, 2000)
                    }
                } else {
                    toast.error('Please enter details', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                break;
            case 'withdrawl':
                if (amount && accountNumber) {
                    if (amount > accountState?.amount) {
                        toast.error(`You don't have enough balance in you account`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                    } else {
                        let res = await withdrawlAction({ accountNumber, amount })
                        if (res) {
                            toast.success(`${res?.message}`, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            setTimeout(() => {
                                navigate('/')
                            }, 2000)
                        }

                    }

                } else {
                    toast.error('Please enter details', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                break;
            default:
                return navigate('/')

        }
    }

    return (
        <Container className='d-flex w-100 justify-content-center flex-column align-items-center '>
            <Row>
                <Col md={7}>
                    <h3 className='text-center text-primary fs-2 my-3 fw-bold'>Deposite</h3>
                </Col>
            </Row>
            <Row className={styles.form_row}>
                <Col md={7}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control type="text" placeholder="enter account number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </Form.Group>
                </Col>
                {/* <Col md={7}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Col> */}
                <Col md={7}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="enter deposite amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={7} className='my-3'>
                    <Button className='btn d-flex w-100 justify-content-center align-items-center' onClick={depositeHandler}>{searchParams.get("use") == "deposite" ? 'Deposite' : "Withdrawl"}</Button>
                </Col>
            </Row>
            <ToastContainer />

        </Container>
    )
}
