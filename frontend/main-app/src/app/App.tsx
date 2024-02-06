import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FormBuilder } from "../../../form-builder";

export const App = (): React.JSX.Element => {
  return (
    <>
      <Header />
      <main className={classes.main}>
      <FormBuilder />
      </main>
      <Footer />
    </>
  );
};
