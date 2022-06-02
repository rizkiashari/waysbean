import { useEffect, useState } from "react"
import { Button, Col, Image, Row } from "react-bootstrap"
import { API } from "../../config/API"
import Style from "./ProductBox.module.css"

import Trash from "../../assets/Image/trash.png"
const BoxProduct = ({ dataProduct, dispatch }) => {
  const [product, setProduct] = useState(null)
  useEffect(() => {
    dataProduct &&
      (async () => {
        const data = await API.get(`/product/${dataProduct.id}`)
        if (!data) {
          return
        }
        const product = data.data.data.product
        setProduct(product)
      })()
  }, [dataProduct])
  const addTrans = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: dataProduct,
    })
    saveCart()
  }
  const saveCart = () => {
    dispatch({
      type: "SAVE_CART",
    })
    dispatch({
      type: "GET_TOTAL_CART",
    })
  }
  const Desc = () => {
    if (dataProduct.orderQuantity > 1) {
      dispatch({
        type: "DESC_TO_CART",
        payload: dataProduct,
      })
      saveCart()
    } else {
      // dispatch({
      //   type: "REMOVE_TO_CART",
      //   payload: dataProduct,
      // })
      Remove()
    }
  }
  const Remove = () => {
    dispatch({
      type: "REMOVE_TO_CART",
      payload: dataProduct,
    })
  }
  return product ? (
    <Row style={{ marginBottom: "10px" }} key={product.id}>
      <Col>
        <Image
          src={product.photo}
          style={{
            objectFit: "cover",
            width: "70px",
            marginLeft: "15px",
          }}
        />
      </Col>
      <Col>
        <h4
          style={{
            color: "#613D2B",
            marginLeft: "-5rem",
            fontSize: "12px",
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          {product.name}
        </h4>
        <Row>
          <Col>
            <Button
              onClick={Desc}
              style={{ marginLeft: "-5.7rem" }}
              className={Style.BtnMin}
            >
              -
            </Button>
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <p
              style={{
                marginLeft: "-7rem",
                background: "#f3dac7",
                width: "30px",
                textAlign: "center",
                color: "#613D2B",
                borderRadius: "5px",
              }}
            >
              {dataProduct.orderQuantity}
            </p>
          </Col>
          <Col>
            <Button
              onClick={addTrans}
              style={{ marginLeft: "-8.7rem" }}
              className={Style.BtnMin}
            >
              +
            </Button>
          </Col>
        </Row>
      </Col>
      <Col>
        <h4 style={{ fontSize: "12px" }} className={Style.Total}>
          Rp.
          {(product.price * dataProduct.orderQuantity).toLocaleString("id-ID")}
        </h4>
        <Button className={Style.BtnTrash} onClick={Remove}>
          <Image src={Trash} alt='/.' className={Style.Trash} />
        </Button>
      </Col>
    </Row>
  ) : (
    <div>not found</div>
  )
}

export default BoxProduct
