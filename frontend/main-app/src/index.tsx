import React from "react";
import {createRoot} from "react-dom/client";
import {App} from "./app";
import {MemoryRouter} from "react-router-dom";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <MemoryRouter>
        <App/>
    </MemoryRouter>);
