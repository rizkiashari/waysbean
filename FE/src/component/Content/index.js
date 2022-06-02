import React from "react";
import { useQuery } from "react-query";
import { API } from "../../config/API";

import { LoopCircleLoading } from "react-loadingg";
import not_found from "../../assets/icon/not-found.svg";
import { Col, Container, Image, Row } from "react-bootstrap";
import CardItem from "../CardItem/";
import Style from "./Content.module.css";

const Content = () => {
  const { isLoading, data, error } = useQuery("products", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  if (isLoading) {
    return (
      <Container style={{ margin: "20px auto" }}>
        <LoopCircleLoading />
      </Container>
    );
  }
  if (error) return <h1>Error occured: {error.response.data.message}</h1>;
  return (
    <div>
      {data.products.length <= 0 && (
        <Image
          src={not_found}
          className={Style.NotFound}
          width='100%'
          height='100%'
          alt='not_found'
        />
      )}
      <Container
        className='d-flex flex-wrap'
        style={{ marginLeft: "15.6rem", width: "74%" }}>
        <Row>
          {data.products.length > 0 &&
            data.products.map((item, idx) => (
              <Col key={idx}>
                <CardItem item={item} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default Content;
