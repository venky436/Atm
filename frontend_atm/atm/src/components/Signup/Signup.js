import React,{useState,useEffect} from 'react'
import { FormGroup, Form, Container, Row, Col, Button } from 'react-bootstrap'
import styles from './Signup.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { registerAction } from '../../Store/actions/actions'
import { useNavigate } from 'react-router-dom';

let Signup = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const authenticationState = useSelector((state)=>state.authenticateData.data)

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [cpassword,setCPassword] = useState('')

    useEffect(()=>{
      authenticationState.access && navigate('/');
    },[authenticationState.access])

    let signupHandler=()=>{
        let obj = {first_name : firstName,last_name:lastName,email : email,username : username}
        if(firstName !== '' && lastName !== '' && email !== '' && password == cpassword){
            obj['password'] = password
            dispatch(registerAction(obj))
            let token = localStorage.getItem('token')
            console.log(token)
            
        }
    }
    return (
        <Container className='d-flex w-100 justify-content-center flex-column align-items-center '>
            <Row>
                <Col md={12}>
                    <h3 className='text-center text-primary fs-2 my-3 fw-bold'>Signup here</h3>
                </Col>
            </Row>
            <Row className={styles.form_row}>
                <Row >
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="email" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="email" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="email" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="email" placeholder="Confirm Password" value={cpassword} onChange={(e)=>setCPassword(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col md={12} className='my-3'>
                        <Button className='btn d-flex w-100 justify-content-center align-items-center' onClick={signupHandler}>Signup</Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}
export default Signup;
