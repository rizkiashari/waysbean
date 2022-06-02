import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

import Style from "./AddProduct.module.css";

import Test from "../../assets/Image/IconImage.jpg";
import attach from "../../assets/icon/pin.png";

import { API } from "../../config/API";
import { PopUpModal } from "../PopUpModal";

const AddProduct = () => {
  const [dataProduct, setDataProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });
  const [preview, setPreview] = useState({
    photo: null,
  });

  const [photo, setPhoto] = useState({
    photo: null,
  });
  const [showModal, setShowModal] = useState(false);
  const handlePhoto = (e) => {
    setPhoto({
      ...photo,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
    setPreview({
      photo: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleChange = async (e) => {
    setDataProduct({
      ...dataProduct,
      photo: photo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", dataProduct.name);
      formData.append("price", dataProduct.price);
      formData.append("description", dataProduct.description);
      formData.append("stock", dataProduct.stock);
      formData.append("photo", photo.photo);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.post("/product", formData, config);
      setShowModal(true);
      return response.data.dataProduct;
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <p className={Style.Title}>Add Product</p>
          <Form onSubmit={handleSubmit} className={Style.Form}>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Control
                name='name'
                className={Style.FormInput}
                type='text'
                required
                value={dataProduct.name}
                onChange={handleChange}
                placeholder='Name'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control
                name='stock'
                className={Style.FormInput}
                type='number'
                value={dataProduct.stock}
                onChange={handleChange}
                required
                placeholder='Stock'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPrice'>
              <Form.Control
                name='price'
                className={Style.FormInput}
                type='number'
                value={dataProduct.price}
                onChange={handleChange}
                required
                placeholder='Price'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicTextArea'>
              <Form.Control
                name='description'
                placeholder='Description product'
                className={Style.FormInput}
                required
                value={dataProduct.description}
                onChange={handleChange}
                as='textarea'
                rows={4}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPhoto'>
              <Form.Control
                name='photo'
                id='fileInput'
                type='file'
                required
                accept='image/*'
                onChange={handlePhoto}
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
                Photo Product
                <Image
                  src={attach}
                  style={{
                    marginLeft: "20px",
                  }}
                  alt='./'
                />
              </label>
            </Form.Group>
            <Button className={Style.Add} variant='primary' type='submit'>
              Add Product
            </Button>
          </Form>
        </Col>
        <Col style={{ width: "80%" }}>
          <Image
            name='photo'
            className={Style.Image}
            src={preview.photo ? preview.photo : Test}
            alt='./'
          />
        </Col>
      </Row>
      <PopUpModal
        showModal={showModal}
        title='Add Product Berhasil'
        handleClose={() => setShowModal(false)}
      />
    </Container>
  );
};

export default AddProduct;
