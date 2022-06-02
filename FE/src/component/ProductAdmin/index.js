import React, { useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/API";
import { LoopCircleLoading } from "react-loadingg";
import Style from "./ProductAdmin.module.css";
import not_found from "../../assets/icon/not-found.svg";

import { PopUpModal } from "../PopUpModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProductAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useHistory();
  const { isLoading, data, refetch, error } = useQuery("products", async () => {
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
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await API.delete(`/product/${id}`);
      setShowModal(true);
      refetch();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    router.push("/product/edit/" + id);
  };

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
        style={{ marginLeft: "13rem", width: "74%", marginTop: "2.5rem" }}>
        <Row>
          {data.products.length > 0 &&
            data.products.map((item, idx) => (
              <Col key={idx}>
                <Card style={{ width: "15.5rem", marginBottom: "30px" }}>
                  <Card.Img src={item.photo} alt='./' variant='top' />
                  <Card.Body>
                    <Card.Title className={Style.Title}>{item.name}</Card.Title>
                    <Card.Title className={Style.Price}>
                      Rp.{item.price.toLocaleString("id-ID")}
                    </Card.Title>
                    <Card.Title className={Style.Stock}>
                      Stock: {item.stock}
                    </Card.Title>
                    <Row>
                      <Col>
                        <Button
                          variant='primary'
                          className={Style.Edit}
                          type='submit'
                          onClick={(e) => handleEdit(e, item.id)}>
                          Edit
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant='danger'
                          className={Style.Delete}
                          type='submit'
                          onClick={(e) => handleDelete(e, item.id)}>
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <PopUpModal
          showModal={showModal}
          title='Delete Product Berhasil'
          handleClose={() => setShowModal(false)}
        />
      </Container>
    </div>
  );
};

export default ProductAdmin;
