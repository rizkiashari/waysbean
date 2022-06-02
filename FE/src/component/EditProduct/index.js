import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { API } from "../../config/API";

import not_found from "../../assets/icon/not-found.svg";
import Style from "./EditProduct.module.css";
import { PopUpModal } from "../PopUpModal";

const EditProduct = () => {
  const params = useParams();
  const router = useHistory();
  const [data, setData] = useState(null);
  const [dataEdit, setDataEdit] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const getProduct = async () => {
    const response = await API.get(`/product/${params.id}`);
    setData(response.data.data);
    setLoading(false);
  };
  useEffect(() => {
    getProduct();
    return () => {
      setData(null);
    };
  }, [params.id]);
  if (loading) return <p>loading...</p>;
  if (!data) {
    return (
      <>
        <Image src={not_found} alt='./' />
      </>
    );
  }
  const handleChange = (e) => {
    e.preventDefault();
    setDataEdit({
      ...dataEdit,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setLoading(false);
      const response = await API.patch(`/product/${params.id}`, dataEdit);
      console.log("response", response);
      setShowModal(true);
      return response.data.dataEdit;
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container style={{ marginTop: "5rem" }}>
      <h3 style={{ marginBottom: "1rem" }}>Edit Product {data.product.name}</h3>
      <Form className={Style.Form} onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Control
            type='text'
            name='name'
            required
            onChange={handleChange}
            defaultValue={data.product.name}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPrice'>
          <Form.Control
            type='number'
            name='price'
            required
            onChange={handleChange}
            placeholder='Price'
            defaultValue={data.product.price}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicStock'>
          <Form.Control
            type='number'
            required
            name='stock'
            onChange={handleChange}
            defaultValue={data.product.stock}
            placeholder='Stock'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicDesc'>
          <Form.Control
            type='text'
            required
            name='description'
            onChange={handleChange}
            defaultValue={data.product.description}
            placeholder='Description'
          />
        </Form.Group>
        <Row>
          <Col>
            <Button
              variant='primary'
              className={Style.Submit}
              style={{
                backgroundColor: "#ffff",
                color: "#613D2B",
                border: "#613D2B 2px solid",
              }}
              onClick={() => router.push("/dashboard/product")}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              variant='primary'
              type='submit'
              style={{ backgroundColor: "#613D2B", border: "none" }}
              className={Style.Submit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <PopUpModal
        showModal={showModal}
        title='Edit Product Berhasil'
        handleClose={() => setShowModal(false)}
      />
    </Container>
  );
};

export default EditProduct;
