import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoBrand from "../../assets/icon/logo.png";
// Image Sementara
import ProductImage from "../../assets/icon/Test.png";
import moment from "moment";
import { API } from "../../config/API";
const CardOrder = ({ dataProduct }) => {
  const [product, setProduct] = useState({});
  console.log("dataProducts", dataProduct);
  console.log("dataProduct", product);
  useEffect(() => {
    dataProduct &&
      (async () => {
        const data = await API.get(`/product/${dataProduct.id}`);
        if (!data) {
          return;
        }
        const product = data.data.data.product;
        setProduct(product);
      })();
  }, [dataProduct]);
  const today = moment(product.createdAt).format("dddd");
  const todayDate = moment(product.createdAt).format("D MMMM YYYY");
  if (product.photo === null) {
    return <p>...loading</p>;
  }

  return (
    <Link
      to={`/product/${dataProduct.id}`}
      style={{ textDecoration: "none", cursor: "zoom-in" }}>
      <Row
        style={{
          background: "#F6E6DA",
          marginTop: "10px",
          padding: "14px 0px 0px 14px",
        }}>
        <Col>
          <Image
            src={product.photo ? product.photo : ProductImage}
            alt={product.id}
            style={{ objectFit: "cover", width: "90px" }}
          />
        </Col>
        <Col style={{ marginLeft: "-4rem" }}>
          <h4 style={{ color: "#613D2B", fontSize: "14px" }}>{product.name}</h4>
          <p style={{ fontSize: "12px", marginBottom: "15px" }}>
            <span style={{ color: "#613D2B" }}> {today}, </span> {todayDate}
          </p>
          <p
            style={{
              color: "#613D2B",
              fontSize: "10px",
              marginBottom: "2px",
            }}>
            Price : {dataProduct.price}
          </p>
          <p
            style={{
              color: "#613D2B",
              fontSize: "10px",
              marginBottom: "2px",
            }}>
            Qty : {dataProduct.orderQuantity}
          </p>
          <p
            style={{
              color: "#613D2B",
              fontWeight: "700",
              fontSize: "10px",
            }}>
            Sub Total: {dataProduct.price * dataProduct.orderQuantity}
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
        </Col>
      </Row>
    </Link>
  );
};

export default CardOrder;
