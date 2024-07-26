import {BrowserRouter} from "react-router-dom"
import {Layout} from "./layout/"
import {AppRouter} from "./router/AppRouter"
import {Provider} from "react-redux";
import store from "./redux/Store.js";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <AppRouter/>
                </Layout>
            </BrowserRouter>
        </Provider>

    )
}

export default App