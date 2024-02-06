import React from "react";
import {Route, Routes} from "react-router-dom";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Signup} from "../components/Signup";
import {FormBuilder} from "../../../form-builder";
import {Login} from "../components/Login";

export const App = (): React.JSX.Element => {
    return (
        <>
            <Header/>
            <main className={classes.main}>
                <Routes>
                    <Route path="/" element={<h1>Home</h1>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/form-builder" element={<FormBuilder/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
};
