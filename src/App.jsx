import { BrowserRouter } from "react-router-dom";
import { Layout } from "./layout/";
import { AppRouter } from "./router/AppRouter";
import { Provider } from "react-redux";
import Store from "./redux/Store.js";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
      <Provider store={Store}>
        <Toaster position="top-right" />
        <BrowserRouter>
          <Layout>
            <AppRouter />
          </Layout>
        </BrowserRouter>
      </Provider>
  );
};

export default App;
