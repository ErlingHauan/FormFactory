import React from "react";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { PlaceholderText } from "../components/PlaceHolderText/PlaceHolderText";

export const App = (): React.JSX.Element => {
  return (
    <>
      <Header />
      <main className={classes.main}>
        {/* PlaceholderText will be replaced with Login, Form Builder, etc." */}
        <PlaceholderText />
      </main>
      <Footer />
    </>
  );
};
