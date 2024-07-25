import { BrowserRouter } from "react-router-dom"
import { Layout } from "./layout/"
import { AppRouter } from "./router/AppRouter"

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  )
}

export default App