import Style from "./SignIn.module.css"

import { Modal, Form, Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"

import { API, setAuthToken } from "../../config/API"
const SignIn = (props) => {
  const router = useHistory()
  const { handleClose, showSignIn, handleSignIn, load, ToSignUp } = props
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  function toRegist() {
    handleClose()
    ToSignUp()
  }
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const config = {
        "Content-Type": "application/json",
      }
      const response = await API.post("/login", data, config)
      setAuthToken(response.data.data.user.token)
      localStorage.setItem("token", response.data.data.user.token)
      setIsLoading(false)
      handleSignIn({
        type: "LOGIN",
        payload: response.data.data,
      })
      if (response.data.data.user.listAs === "User") {
        window.location.href = "/"
      } else {
        window.location.href = "/dashboard"
      }
    } catch (error) {
      setIsError(true)
      setError(error.response.data.message)
      setIsLoading(false)
      setTimeout(() => {
        setIsError(false)
        setError("")
      }, 5000)
    }
  }

  return (
    <div id='signinmodal'>
      <Modal
        className={Style.ModalContainer}
        show={showSignIn}
        onHide={handleClose}
        handleSignIn={handleSignIn}
      >
        <div className={Style.FormCustom}>
          <h2 className={Style.Title}>Login</h2>
          {isError && (
            <div className='alert alert-danger mt-2 ' role='alert'>
              {error && <p>{error}</p>}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                className={Style.FormInput}
                type='email'
                name='email'
                onChange={handleChange}
                value={data.email}
                placeholder='Email'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control
                className={Style.FormInput}
                type='password'
                name='password'
                placeholder='Password'
                value={data.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              className={Style.ButtonSignIn}
              variant='primary'
              load={isLoading}
              type='submit'
            >
              {load ? "...loading" : "Login"}
            </Button>
          </Form>
          <p className={Style.Dont}>
            Don't have an account?
            <strong
              style={{ color: "#613D2B", cursor: "pointer", marginLeft: "5px" }}
              onClick={toRegist}
            >
              clik Here
            </strong>
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default SignIn
