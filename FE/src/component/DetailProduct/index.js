import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { UserContext } from "../../contexts/UserContext"

import { Button, Container, Image } from "react-bootstrap"

import { API } from "../../config/API"

import Style from "./DetailProduct.module.css"
// Image
import not_found from "../../assets/icon/not-found.svg"
import { PopUpModal } from "../PopUpModal"

const DetailProduct = () => {
  const params = useParams()
  const { state, dispatch } = useContext(UserContext)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const getProduct = async () => {
    const response = await API.get(`/product/${params.id}`)
    setData(response.data.data)
    setLoading(false)
  }

  useEffect(() => {
    getProduct()
    return () => {
      setData(null)
    }
  }, [params.id])
  if (loading) return <p>loading...</p>
  if (!data) {
    return (
      <>
        <Image src={not_found} alt='./' />
      </>
    )
  }

  const AddToCart = () => {
    if (state.isLogin) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          price: data.product.price,
          id: data.product.id,
        },
      })
      dispatch({
        type: "SAVE_CART",
      })
      setShowModal(true)
    }
  }

  return (
    <Container>
      <div className={Style.Conter}>
        <div>
          <Image className={Style.Image} src={data.product.photo} />
        </div>
        <Container style={{ marginLeft: "50px", width: "70%" }}>
          <h3
            style={{
              fontWeight: "700",
              fontSize: "50px",
              marginBottom: "30px",
            }}
          >
            {data.product.name}
          </h3>
          <p style={{ color: "#974A4A" }}>Stock: {data.product.stock}</p>
          <p style={{ width: "50% !important" }}>{data.product.description}</p>
          <p
            style={{
              textAlign: "end",
              fontSize: "30px",
              color: "#974A4A",
              marginBottom: "30px",
            }}
          >
            Rp.{data.product.price.toLocaleString("id-ID")}
          </p>
          <Button className={Style.BtnCart} onClick={AddToCart}>
            Add Cart
          </Button>
        </Container>
      </div>
      <PopUpModal
        showModal={showModal}
        title='Succes Add Product'
        handleClose={() => setShowModal(false)}
      />
    </Container>
  )
}

export default DetailProduct
