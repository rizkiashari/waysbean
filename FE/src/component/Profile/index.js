import React, { useContext, useEffect, useState } from "react"

import { Button, Col, Container, Image, Row } from "react-bootstrap"

import Style from "./Profile.module.css"
import moment from "moment"
import logoBrand from "../../assets/icon/logo.png"
// Image Sementara
import QRCode from "../../assets/Image/QrCode.png"
import ProfileImage from "../../assets/Image/Profile.png"
import { useQuery } from "react-query"
import { API } from "../../config/API"
import { UserContext } from "../../contexts/UserContext"

const Profile = () => {
  const [dataUser, setDataUser] = useState({})
  const [loading, setLoading] = useState(true)
  const { state } = useContext(UserContext)
  const { isLoading, data, error } = useQuery("my-transactions", async () => {
    const response = await API.get("/my-transactions")
    return response.data.data
  })

  console.log(state)

  const getUser = async () => {
    const response = await API.get(`/users/${state.user.id}`)
    setDataUser(response.data.data)
    setLoading(false)
  }
  useEffect(() => {
    getUser()
    return () => {
      setDataUser({})
    }
  }, [])

  if (isLoading) return <p>... loading</p>

  console.log(data)
  if (error)
    return (
      <Container className={Style.Custome}>
        <Row>
          <Col className={Style.Profile}>
            <h3 className={Style.Title}>My Profile</h3>

            <Row key={dataUser.id}>
              <Col className={Style.Image}>
                <Image
                  src={dataUser.profile ? dataUser.profile : ProfileImage}
                  alt='../'
                  style={{
                    borderRadius: "5px",
                    objectFit: "cover",
                    width: "160px",
                  }}
                />
              </Col>
              <Col className={Style.MyProfile}>
                <h4 style={{ color: "#613D2B" }}>Full Name</h4>
                <p>{dataUser.fullname}</p>
                <h4 style={{ color: "#613D2B" }}>Email</h4>
                <p>{dataUser.email}</p>
              </Col>
            </Row>
          </Col>
          <Col>Your Order Not Found</Col>
        </Row>
      </Container>
    )

  const handleCompleted = async (e, id) => {
    e.preventDefault()
    try {
      const config = {
        "Content-Type": "application/json",
      }

      await API.patch(
        `/transaction/${id}`,
        {
          status: "Success",
        },
        config
      )
      window.location.reload()
    } catch (error) {
      console.log("error", error)
    }
  }
  if (isLoading) {
    ;<p>{loading}</p>
  }
  return (
    <Container className={Style.Custome}>
      <>
        <Row>
          <Col className={Style.Profile}>
            <h3 className={Style.Title}>My Profile</h3>

            <Row key={dataUser.id}>
              <Col className={Style.Image}>
                <Image
                  src={dataUser.profile ? dataUser.profile : ProfileImage}
                  alt='../'
                  style={{
                    borderRadius: "5px",
                    objectFit: "cover",
                    width: "160px",
                  }}
                />
              </Col>
              <Col className={Style.MyProfile}>
                <h4 style={{ color: "#613D2B" }}>Full Name</h4>
                <p>{dataUser.fullname}</p>
                <h4 style={{ color: "#613D2B" }}>Email</h4>
                <p>{dataUser.email}</p>
              </Col>
            </Row>
          </Col>
          <Col>
            <h3 className={Style.Title}>My Transaction</h3>
            {data.transactions?.map((trans, idx) =>
              trans.Products?.map((product, idx) => (
                <Container key={idx} style={{ marginTop: "10px" }}>
                  <Row
                    style={{
                      background: "#F6E6DA",
                      padding: "14px 0px 0px 14px",
                    }}
                  >
                    <Col>
                      <Image
                        src={product.photo}
                        alt='../'
                        style={{ objectFit: "cover", width: "90px" }}
                      />
                    </Col>
                    <Col style={{ marginLeft: "-4rem" }}>
                      <h4 style={{ color: "#613D2B", fontSize: "14px" }}>
                        {product.name}
                      </h4>
                      <p style={{ fontSize: "12px", marginBottom: "15px" }}>
                        <span style={{ color: "#613D2B" }}>
                          {moment(trans.createdAt).format("dddd")},{" "}
                        </span>
                        {moment(trans.createdAt).format("D MMMM YYYY")}
                      </p>
                      <p
                        style={{
                          color: "#613D2B",
                          fontSize: "10px",
                          marginBottom: "2px",
                        }}
                      >
                        Price : Rp.{product.price.toLocaleString("id-ID")}
                      </p>
                      <p
                        style={{
                          color: "#613D2B",
                          fontSize: "10px",
                          marginBottom: "2px",
                        }}
                      >
                        Qty : {product.orderQuantity.qty}
                      </p>
                      <p
                        style={{
                          color: "#613D2B",
                          fontWeight: "700",
                          fontSize: "10px",
                        }}
                      >
                        Sub Total: Rp.
                        {(
                          product.orderQuantity.qty * product.price
                        ).toLocaleString("id-ID")}
                      </p>
                    </Col>
                    <Col>
                      <Image
                        src={logoBrand}
                        alt='./'
                        style={{
                          objectFit: "cover",
                          width: "100px",
                          marginLeft: "30px",
                        }}
                      />
                      <Image
                        src={QRCode}
                        alt='./'
                        style={{
                          objectFit: "cover",
                          width: "50px",
                          margin: "10px 0 0 50px",
                        }}
                      />
                      {trans.status === "Cancel" && (
                        <p
                          className={Style.Cancel}
                          style={{ textAlign: "center" }}
                        >
                          {trans.status}
                        </p>
                      )}
                      {trans.status === "On The Way" ? (
                        <Button
                          onClick={(e) => handleCompleted(e, trans.id)}
                          className={Style.Completed}
                        >
                          Completed
                        </Button>
                      ) : (
                        <>
                          {trans.status === "Waiting Approve" ? (
                            <p
                              className={Style.Waiting}
                              style={{ textAlign: "center" }}
                            >
                              {trans.status}
                            </p>
                          ) : (
                            trans.status === "Success" && (
                              <p
                                className={Style.Success}
                                style={{ textAlign: "center" }}
                              >
                                {trans.status}
                              </p>
                            )
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
                </Container>
              ))
            )}
          </Col>
        </Row>
      </>
    </Container>
  )
}

export default Profile
