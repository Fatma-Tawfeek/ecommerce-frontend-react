import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const client = new ApolloClient({
    uri: "http://ecommerce.local/graphql",
    cache: new InMemoryCache(),
});

// redux provider

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </StrictMode>
);
