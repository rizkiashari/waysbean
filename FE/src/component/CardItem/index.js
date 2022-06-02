import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"

import { Card } from "react-bootstrap"
import Style from "./CardItem.module.css"
import { UserContext } from "../../contexts/UserContext"
import SignIn from "../SignIn"
import SignUp from "../SignUp"

const CardItem = ({ item }) => {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  const { state, dispatch } = useContext(UserContext)
  const router = useHistory()

  const handleDetail = (id) => {
    state.isLogin ? router.push(`/product/${id}`) : setShowSignIn(true)
  }

  return (
    <>
      <Card
        className={Style.Pointer}
        style={{ width: "15.5rem", marginBottom: "30px" }}
        onClick={() => handleDetail(item.id)}
      >
        <Card.Img src={item.photo} alt='./' variant='top' />
        <Card.Body className={Style.BodyImage}>
          <Card.Title className={Style.Title}>{item.name}</Card.Title>
          <Card.Title className={Style.Price}>
            Rp.{item.price.toLocaleString("id-ID")}
          </Card.Title>
          <Card.Title className={Style.Stock}>Stock: {item.stock}</Card.Title>
        </Card.Body>
      </Card>
      {!state.isLogin && (
        <>
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
    </>
  )
}

export default CardItem
