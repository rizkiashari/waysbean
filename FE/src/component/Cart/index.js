import React, { useContext, useEffect } from "react"

import { Container, Row, Col, Image } from "react-bootstrap"

import Style from "./Cart.module.css"

// Image
import not_found from "../../assets/icon/not-found.svg"

// Image Sementara
import { Link } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"
import BoxProduct from "../ProductBox"

const Cart = () => {
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    dispatch({
      type: "GET_TOTAL_CART",
    })
  }, [dispatch])

  return (
    <Container className={Style.Custome}>
      {state.carts.length === 0 && (
        <>
          <Image style={{ width: "60%", margin: "0 20%" }} src={not_found} />
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginTop: "20px",
            }}
          >
            Not Found
          </p>
        </>
      )}
      <>
        {state.carts.length > 0 && (
          <>
            <p className={Style.Title}>My Cart</p>
            <p className={Style.SubTitle}>Review Your Order</p>
            <Row>
              <Col>
                <hr />
                {state.carts.map((cart, idx) => (
                  <BoxProduct
                    key={idx}
                    dispatch={dispatch}
                    dataProduct={cart}
                  />
                ))}
                <hr />
              </Col>
              <Col>
                <hr />
                <>
                  <Row>
                    <Col>
                      <h4 style={{ fontSize: "12px" }} className={Style.Total}>
                        Subtotal
                      </h4>
                      <h4 style={{ fontSize: "12px" }} className={Style.Total}>
                        Qty
                      </h4>
                    </Col>
                    <Col md={{ span: 3, offset: 3 }}>
                      <p style={{ fontSize: "12px" }}>
                        {state.totalCart.total.toLocaleString("id-ID")}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        {state.totalCart.orderQuantity}
                      </p>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      <h4 style={{ fontSize: "12px" }} className={Style.Total}>
                        Total
                      </h4>
                    </Col>
                    <Col md={{ span: 3, offset: 3 }}>
                      <p style={{ fontSize: "12px" }}>
                        {state.totalCart.total.toLocaleString("id-ID")}
                      </p>
                    </Col>
                  </Row>

                  <Row>
                    <Link to='/shipping' className={Style.BtnProcces}>
                      Procced To Checkout
                    </Link>
                  </Row>
                </>
              </Col>
            </Row>
          </>
        )}
      </>
    </Container>
  )
}

export default Cart
