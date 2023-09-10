import React,{useState,useEffect} from 'react'
import { FormGroup, Form, Container, Row, Col, Button } from 'react-bootstrap'
import styles from './Login.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { registerAction } from '../../Store/actions/actions'
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../Store/actions/actions'

export default function Login() {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const authenticationState = useSelector((state)=>state.authenticateData.data)

    useEffect(()=>{
        authenticationState.access && navigate('/');
      },[authenticationState.access])

      let loginHandler=()=>{
        if(username !== '' && password !== ''){
           
            dispatch(loginAction(username,password))
        }else{
            alert('Please Enter Credentials')
        }
    }

  return (
    <Container className='d-flex w-100 justify-content-center flex-column align-items-center '>
    <Row>
        <Col md={12}>
            <h3 className='text-center text-primary fs-2 my-3 fw-bold'>Login</h3>
        </Col>
    </Row>
    <Row className={styles.form_row}>
       
        <Row >
            <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </Form.Group>
            </Col>
           
            <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="email" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
            </Col>
            
            <Col md={12} className='my-3'>
                <Button className='btn d-flex w-100 justify-content-center align-items-center' onClick={loginHandler}>Login</Button>
            </Col>
        </Row>
    </Row>
</Container>
  )
}
