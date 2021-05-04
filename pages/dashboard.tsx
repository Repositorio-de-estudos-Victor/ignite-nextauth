import { destroyCookie } from "nookies";
import { useContext, useEffect } from "react"
import { AuthContext, singOut } from "../Contexts/AuthContext"
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get('/me').then(response => console.log(response)).catch(() => {
      singOut();
    })
  }, [])

  return (
    <h1>Dashboard: { user?.email }</h1>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context);
  const response = await apiClient.get('/me');

  return {
    props: {}
  }
})