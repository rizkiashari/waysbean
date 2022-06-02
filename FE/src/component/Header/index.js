import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { UserContext } from "../../contexts/UserContext"
import { Link, useHistory } from "react-router-dom"

import {
  Navbar,
  Container,
  Image,
  Button,
  DropdownButton,
  Dropdown,
  Nav,
} from "react-bootstrap"

import iconBrand from "../../assets/icon/logo.png"
import userLogo from "../../assets/icon/userLogo.png"
import profileLogo from "../../assets/icon/logoProfie.png"
import logout from "../../assets/icon/logout.png"
import addProduct from "../../assets/icon/Addproduct.png"
import keranjang from "../../assets/icon/keranjang.png"
import AllProduct from "../../assets/icon/AllCoppie.jpg"

import Style from "./Header.module.css"

import { API, setAuthToken } from "../../config/API"
import SignIn from "../SignIn"
import SignUp from "../SignUp"

const Header = () => {
  const { state, dispatch } = useContext(UserContext)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  const { refetch } = useQuery("users", async () => {
    const response = await API.get(`/users/${state.user.id}`)
    return response.data.data
  })
  let profile = ""
  if (state.isLogin === true) {
    profile = state.user.profile
  }

  useEffect(() => {
    if (!state.isLogin) {
      setShowSignIn(false)
    }
    return () => {
      setShowSignIn(false)
      setShowSignUp(false)
      refetch()
    }
  }, [refetch, state.isLogin, state?.user])

  const handleSignOut = (e) => {
    dispatch({
      type: "LOGOUT",
    })
    setAuthToken()
  }

  return (
    <Navbar className={Style.Navbar}>
      <Container>
        {state?.isLogin && state?.user?.listAs === "User" ? (
          <Link to='/'>
            <Navbar.Brand>
              <Image src={iconBrand} alt='logoHeader' />
            </Navbar.Brand>
          </Link>
        ) : (
          <Link to='/dashboard'>
            <Navbar.Brand>
              <Image src={iconBrand} alt='logoHeader' />
            </Navbar.Brand>
          </Link>
        )}
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            {state?.isLogin ? (
              <>
                {state.user && state.user.listAs === "Owner" ? (
                  <div></div>
                ) : (
                  state.user.listAs === "User" &&
                  (state.carts.length === 0 ? (
                    <div></div>
                  ) : (
                    <>
                      <Link to='/transaction'>
                        <Image
                          // onClick={() => router.push("/transaction")}
                          style={{
                            marginTop: "20px",
                            marginRight: "-15px",
                            width: "35px",
                            height: "35px",
                            cursor: "pointer",
                          }}
                          src={keranjang}
                          alt='Logo'
                        />
                      </Link>
                      <p
                        style={{
                          position: "relative",
                          backgroundColor: "red",
                          borderRadius: "20px",
                          width: "15px",
                          height: "20px",
                          color: "white",
                          top: 35,
                          left: 5,
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        {state.carts.length}
                      </p>
                    </>
                  ))
                )}
                <DropdownButton
                  align='end'
                  title={
                    <Image
                      className='rounded-circle'
                      src={profile ? profile : userLogo}
                    />
                  }
                  variant='btn-secondary'
                  id='dropdown-menu-align-left'
                >
                  <div className={Style.Arrow}></div>
                  <>
                    {state?.user.listAs === "Owner" ? (
                      <>
                        <Dropdown.Item
                          className={Style.DropDown}
                          eventKey='2'
                          align='end'
                        >
                          <Link className={Style.BtnAdd} to='/add-product'>
                            <Image
                              style={{ marginRight: "10px" }}
                              src={addProduct}
                              alt='Logo'
                            />
                            Add Products
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={Style.DropDown}
                          eventKey='3'
                          align='end'
                        >
                          <Link
                            className={Style.BtnAdd}
                            to='/dashboard/product'
                          >
                            <Image
                              style={{
                                marginRight: "10px",
                                width: "40px",
                                borderRadius: "50px",
                              }}
                              src={AllProduct}
                              alt='Logo'
                            />
                            All Products
                          </Link>
                        </Dropdown.Item>
                      </>
                    ) : (
                      state?.user.listAs === "User" && (
                        <Dropdown.Item
                          className={Style.DropDown}
                          eventKey='3'
                          align='end'
                        >
                          <Link className={Style.BtnAdd} to='/profile'>
                            <Image
                              style={{ marginRight: "10px" }}
                              src={profileLogo}
                              alt='Logo'
                            />
                            Profile
                          </Link>
                        </Dropdown.Item>
                      )
                    )}
                  </>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey='4' align='end'>
                    <Button className={Style.LogoutBtn} onClick={handleSignOut}>
                      <Image
                        style={{ marginRight: "10px" }}
                        src={logout}
                        alt='Logo'
                      />
                      Logout
                    </Button>
                  </Dropdown.Item>
                </DropdownButton>
              </>
            ) : (
              <>
                <Button
                  className={Style.btnLogin}
                  onClick={() => setShowSignIn(true)}
                >
                  Login
                </Button>
                <Button
                  className={Style.btnRegister}
                  onClick={() => setShowSignUp(true)}
                >
                  Register
                </Button>
                <SignIn
                  showSignIn={showSignIn}
                  handleSignIn={dispatch}
                  ToSignUp={() => setShowSignUp(true)}
                  handleClose={() => setShowSignIn(false)}
                />
                <SignUp
                  handleClose={() => setShowSignUp(false)}
                  showSignUp={showSignUp}
                  ToSignIn={() => setShowSignIn(true)}
                  handleSignUp={dispatch}
                />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
