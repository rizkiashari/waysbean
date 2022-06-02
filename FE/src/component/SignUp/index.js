import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

import { API, setAuthToken } from "../../config/API"

import Style from "./SignUp.module.css"
const SignUp = (props) => {
  const { handleClose, showSignUp, handleSignUp, ToSignIn } = props

  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    fullname: "",
    listId: "",
  })
  function toLogin() {
    handleClose()
    ToSignIn()
  }

  const router = useHistory()

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const config = {
        "Content-Type": "application/json",
      }
      const response = await API.post("/register", data, config)
      setAuthToken(response.data.data.user.token)
      localStorage.setItem("token", response.data.data.user.token)
      handleSignUp({
        type: "REGISTER",
        payload: response.data.data,
      })
      handleClose(true)
      router.push("/")
    } catch (error) {
      setIsError(true)
      setError(error.response.data.message)
      setTimeout(() => {
        setIsError(false)
        setError("")
      }, 5000)
    }
  }

  return (
    <Modal
      show={showSignUp}
      className={Style.ModalContainer}
      onHide={handleClose}
      handleSignUp={handleSignUp}
    >
      <div className={Style.FormCustom}>
        <h2 className={Style.Title}>Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicFullname'>
            <Form.Control
              type='email'
              className={Style.FormInput}
              required
              name='email'
              onChange={handleChange}
              value={data.email}
              placeholder='Email'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicUsername'>
            <Form.Control
              type='password'
              required
              className={Style.FormInput}
              name='password'
              onChange={handleChange}
              value={data.password}
              placeholder='Password'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control
              type='text'
              required
              name='fullname'
              className={Style.FormInput}
              onChange={handleChange}
              value={data.fullname}
              placeholder='Full name'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='inputListAs'>
            <select
              name='listId'
              className={Style.SelectInput}
              onChange={handleChange}
            >
              <option value=''>Pilih salah satu</option>
              <option value='1'>User</option>
              <option value='2'>Owner</option>
            </select>
          </Form.Group>
          {isError && (
            <div className='alert alert-danger mt-2 ' role='alert'>
              {error && <p>{error}</p>}
            </div>
          )}
          <Button
            variant='primary'
            type='submit'
            className={Style.ButtonSignUp}
          >
            Sign Up
          </Button>
          <p className={Style.Dont}>
            Don't have an account?
            <strong
              onClick={toLogin}
              style={{
                color: "#613D2B",
                cursor: "pointer",
                marginLeft: "5px",
              }}
            >
              click Here
            </strong>
          </p>
        </Form>
      </div>
    </Modal>
  )
}

export default SignUp
