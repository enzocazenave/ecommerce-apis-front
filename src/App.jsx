import {BrowserRouter} from "react-router-dom"
import {Layout} from "./layout/"
import {AppRouter} from "./router/AppRouter"
import {Provider} from "react-redux";
import Store from "./redux/Store.js";

const App = () => {
    return (
        <Provider store={Store}>
            <BrowserRouter>
                <Layout>
                    <AppRouter/>
                </Layout>
            </BrowserRouter>
        </Provider>

    )
}

export default App