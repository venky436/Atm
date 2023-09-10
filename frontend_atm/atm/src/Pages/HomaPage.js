import React, { useEffect } from 'react'
import { Col, Container, Row,Spinner } from 'react-bootstrap'
import Navbar from '../components/NavBar/Navbar'
import Signup from '../components/Signup/Signup'
import styles from './HomePage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { accountAction, transactionsAction } from '../Store/actions/actions'
import empty_transaction_img from '../public/images/empty_transactions.png'
let HomaPage = () => {

  const accountState = useSelector((state) => state.accountDetails.data)
  const transactions = useSelector((state) => state.transactions.transactions)
  let dispatch = useDispatch()


  let token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      dispatch(accountAction())
    }

  }, [])

  useEffect(()=>{
    if(accountState?.account_number){
      dispatch(transactionsAction(accountState?.account_number))
    }
  },[accountState])
  return !token ? <div></div> :
    <Container className='position-relative'>
      <Row >
        {
          accountState?.user ? <Col md={6} className={`bg-light my-5 p-5`}>
            <span className='fs-5 fw-bold'>Name :</span> <span className='fs-4 fw-bold text-primary'>{accountState?.user?.username}</span> <br />
            <span className='fs-5 fw-bold'>Account Number :</span> <span className='fs-4 fw-bold text-primary'>{accountState?.account_number}</span><br />
            <span className='fs-5 fw-bold'>Balance :</span> <span className='fs-4 fw-bold text-primary'>₹{accountState?.amount}</span>
          </Col> : <Col md={6} className={styles.account_card}>
          <Spinner animation="border" />
          </Col>
        }
      </Row>
      <Row>
        <Col md={6} className='d-flex gap-2'>
          <Link to={'/transaction?use=deposite'} className='btn btn-primary'>
            Deposite
          </Link>
          <Link to={'/transaction?use=withdrawl'} className='btn btn-primary'>
            withdrawl
          </Link>
        </Col>
      </Row>


      <Row>
        <Col md={11} className='d-flex align-items-center justify-content-between'>
            <h1 className='mt-5 mb-4 text-success fw-bold '>Transactions</h1>
            {transactions?.length > 0 && <h6 className='mt-5 mb-4 text-success fw-bold '>Last 5 transactions</h6>}
        </Col>
        {
          transactions?.length > 0 ? transactions?.reverse((a,b)=>b-a)?.slice(0,5).map((each, index) => (
            <Col md={11} className={styles.transaction}>
               <h5 style={{
                color : each?.isCredited ? "green" : "red"
               }}>{each?.isCredited ? "DEPOSITE" : "WITHDRAWL"}</h5>
               <h5 style={{
                color : each?.isCredited ? "green" : "red"
               }}>{each?.created_at}</h5>

               <div>

               <h5 style={{
                color : each?.isCredited ? "green" : "red"
               }}>₹{each?.amount}</h5>

               <span style={{
                color : each?.isCredited ? "green" : "red"
               }}>
                 existing total : ₹{each?.existAmount}
               </span>
               </div>

            </Col>
          )) : <Col md={10} className={styles.account_card}>
               <div className='d-flex flex-column justify-content-center align-items-center'>
                 <img src={empty_transaction_img} width={'500px'} height={"400px"}/>
                 <span className='mb-2'>You don't have any transactions</span>
               </div>
          </Col>
        }

      </Row>



    </Container>
  
}

export default HomaPage
