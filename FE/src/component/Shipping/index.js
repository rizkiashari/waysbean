import React, { useContext, useState } from "react"

import Style from "./Shipping.module.css"

import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"

import attach from "../../assets/icon/pin.png"

import Test from "../../assets/Image/IconImage.jpg"
import { API } from "../../config/API"
import { UserContext } from "../../contexts/UserContext"
import CardOrder from "../CardOrder"
import { PopUpVerify } from "../PopUpModal"

const Shipping = () => {
  const { state, dispatch } = useContext(UserContext)
  //const router = useHistory();
  const [data, setData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    postCode: "",
  })
  const [attachment, setAttachment] = useState({
    attachment: null,
  })
  const [preview, setPreview] = useState({
    attachment: null,
  })
  const [showModal, setShowModal] = useState(false)
  const handleAttach = (e) => {
    setAttachment({
      ...attachment,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    })
    setPreview({
      attachment: URL.createObjectURL(e.target.files[0]),
    })
  }
  const products = JSON.stringify(
    state.carts.map((item) => {
      return {
        id: item.id,
        orderQuantity: item.orderQuantity,
      }
    })
  )
  const handleChange = (e) => {
    setData({
      ...data,
      attachment: attachment,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      localStorage.getItem("token")
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("address", data.address)
      formData.append("phone", data.phone)
      formData.append("email", data.email)
      formData.append("postCode", data.postCode)
      formData.append("attachment", attachment.attachment)
      formData.append("products", products)
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      const response = await API.post("/transaction", formData, config)
      dispatch({
        type: "RESET_CART",
      })
      setShowModal(true)
      return response.data.data
    } catch (error) {
      console.log("Error", error)
    }
  }
  return (
    <Container>
      <Form className={Style.Form} onSubmit={handleSubmit}>
        <Row>
          <Col>
            <p className={Style.Title}>Shipping</p>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Control
                name='name'
                value={data.name}
                onChange={handleChange}
                className={Style.FormInput}
                type='text'
                required
                placeholder='Name'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Control
                name='email'
                value={data.email}
                onChange={handleChange}
                className={Style.FormInput}
                type='email'
                required
                placeholder='Email'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='phone'>
              <Form.Control
                name='phone'
                className={Style.FormInput}
                value={data.phone}
                required
                onChange={handleChange}
                type='text'
                placeholder='Phone'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='postcode'>
              <Form.Control
                name='postCode'
                className={Style.FormInput}
                value={data.postCode}
                onChange={handleChange}
                type='text'
                required
                placeholder='Post Code'
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea'
            >
              <Form.Control
                name='address'
                placeholder='Address'
                value={data.address}
                onChange={handleChange}
                className={Style.FormInput}
                as='textarea'
                required
                rows={4}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPhone'>
              <Form.Control
                name='attachment'
                id='fileInput'
                required
                type='file'
                accept='image/*'
                onChange={handleAttach}
                className='btn btn-primary'
                style={{
                  zIndex: 10,
                  marginTop: "-10px",
                  position: "absolute",
                  display: "none",
                  cursor: "pointer",
                }}
              />
              <label htmlFor='fileInput' className={Style.Attach}>
                Attache of transaction
                <Image
                  src={attach}
                  style={{
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                  alt='./'
                />
              </label>
            </Form.Group>
          </Col>
          <Col style={{ marginTop: "5rem", marginLeft: "20px" }}>
            {state.carts
              ? state.carts.map((products, idx) => (
                  <CardOrder dataProduct={products} key={idx} />
                ))
              : null}
            <Col>
              <Button className={Style.Pay} type='submit'>
                Pay
              </Button>
            </Col>
            <PopUpVerify
              showModal={showModal}
              title='Thank you for ordering in us, please wait 1 x 24 hours to verify you order'
              handleClose={() => setShowModal(false)}
            />
            <Image
              style={{
                margin: "2em 6rem",
                width: "70%",
                height: "60%",
                objectFit: "cover",
              }}
              src={preview.attachment ? preview.attachment : Test}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default Shipping
