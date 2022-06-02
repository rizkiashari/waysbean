import Style from "./Dashboard.module.css"

import { Button, Container, Image, Table } from "react-bootstrap"
import { useQuery } from "react-query"
import { API } from "../../config/API"

import { LoopCircleLoading } from "react-loadingg"

// Image
import not_found from "../../assets/icon/not-found.svg"
import success from "../../assets/icon/Success.png"
import cancel from "../../assets/icon/Cancel.png"

const Dashboard = () => {
  const { isLoading, data, error } = useQuery("transactions", async () => {
    const response = await API.get("/transactions")
    return response.data.data
  })

  const handleSuccess = async (transId, Products) => {
    try {
      const config = {
        "Content-Type": "application/json",
      }
      const response = await API.patch(
        `/edit-stock/${transId}`,
        {
          Products,
          status: "On The Way",
        },
        config
      )
      window.location.reload()
      return response.data.data
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleCancel = async (transId) => {
    try {
      const config = {
        "Content-Type": "application/json",
      }

      await API.patch(
        `/transaction/${transId}`,
        {
          status: "Cancel",
        },
        config
      )
      window.location.reload()
    } catch (error) {
      console.log("error", error)
    }
  }

  if (isLoading) {
    return (
      <Container style={{ margin: "20px auto" }}>
        <LoopCircleLoading />
      </Container>
    )
  }
  if (error) return <h1>Error occured: {error.response.data.message}</h1>

  return (
    <Container>
      <p className={Style.Title}>Income transaction</p>
      {data.transactions.length <= 0 && (
        <Image
          src={not_found}
          className={Style.NotFound}
          width='100%'
          height='100%'
          alt='not_found'
        />
      )}
      <Table responsive bordered hover>
        <thead style={{ background: "#ddd" }}>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Post Code</th>
            <th>Products Order</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.transactions.length > 0 &&
            data.transactions.map((trx, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{trx.name}</td>
                <td>{trx.address}</td>
                <td>{trx.postCode}</td>
                <td>{trx.Products?.map((product) => product.name + ", ")}</td>
                {trx.status === "Waiting Approve" && (
                  <td className={Style.WaitingApprove}>{trx.status}</td>
                )}
                {trx.status === "Cancel" && (
                  <td className={Style.Cancel}>{trx.status}</td>
                )}
                {trx.status === "Success" && (
                  <td className={Style.Success}>{trx.status}</td>
                )}
                {trx.status === "On The Way" && (
                  <td className={Style.OnTheWay}>{trx.status}</td>
                )}
                <td style={{ textAlign: "center" }}>
                  {trx.status === "Success" && <Image src={success} alt='./' />}
                  {trx.status === "On The Way" && (
                    <Image src={success} alt='./' />
                  )}
                  {trx.status === "Cancel" && <Image src={cancel} alt='./' />}
                  {trx.status === "Waiting Approve" && (
                    <>
                      <Button
                        className={Style.BtnCancel}
                        onClick={() => handleCancel(trx.id)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className={Style.BtnApprove}
                        onClick={() => handleSuccess(trx.id, trx.Products)}
                      >
                        Approve
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Dashboard
