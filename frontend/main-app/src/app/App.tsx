import React from "react";
import { Route, Routes } from "react-router-dom";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Signup } from "../components/Signup";
import { FormBuilder } from "../../../form-builder";
import { Login } from "../components/Login";
import { Dashboard } from "../components/Dashboard";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../../language/src/en.json";
import { FormViewer } from "../components/FormViewer";
import { SubHeader } from "../components/SubHeader";
import { NotFound } from "../components/NotFound";
import { CreateNewForm } from "./CreateNewForm";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: "en",
  fallbackLng: "en",
  react: {
    useSuspense: false,
  },
});

export const App = (): React.JSX.Element => {
  return (
    <div className={classes.layout}>
      <header>
        <Header />
        <SubHeader />
      </header>
      <main className={classes.main}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:authError" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/form-builder/new" element={<CreateNewForm />} />
          <Route path="/form-builder/:formId" element={<FormBuilder />} />
          <Route path="/view/:formId" element={<FormViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
