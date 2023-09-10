import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import styles from './NavBar.module.css'
import { loginAction, logOut, registerAction, accountAction } from '../../Store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

let NavbarComponent = () => {
    let user = useSelector((state) => state.authenticateData.data.user)
    const [username, setUsername] = useState('')
    const [token, setToken] = useState('')

    const authenticationState = useSelector((state) => state.authenticateData.data)
    const accountState = useSelector((state) => state.accountDetails.data)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    let too = localStorage.getItem('token')
    useEffect(() => {
        if (too) {
            setToken(too)
            dispatch(accountAction())
        } else {
            setToken('')
        }
    }, [too])
    let logoutHandler = () => {
        dispatch(logOut())
        navigate('/')
    }
    return (
        <Container >
            <Row className='d-flex w-100 bg-light justify-content-around ' style={{ height: '80px' }}>
                <Col md={4} className='d-flex justify-content-start align-items-center'>
                    <Link to={'/'}>
                        <h3 className={styles.bank}>Bank</h3>
                    </Link>
                </Col>
                <Col md={7} className='d-flex justify-content-end align-items-center gap-3 '>
                    {
                        token ? <>
                            <h4 className={styles.btn} >{accountState?.user?.username}</h4>
                            <h4 className={styles.btn} onClick={logoutHandler}>Logout</h4>
                        </> : (<>
                            <Link to='/login'>
                                <h4 className={styles.btn}>Login</h4>
                            </Link>
                            <Link to='/signup'>
                                <h4 className={styles.btn} >Signup</h4>
                            </Link>
                        </>)
                    }

                </Col>
            </Row>

        </Container>

    )
}

export default NavbarComponent
