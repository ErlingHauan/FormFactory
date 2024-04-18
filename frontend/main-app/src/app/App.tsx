import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import classes from "./App.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../../language/src/en.json";
import { SubHeader } from "../components/SubHeader";
import { FormBuilderContextProvider } from "../../../form-builder/src/context/FormBuilderContextProvider";

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

const Login = lazy(() => import("../components/Login"));
const Signup = lazy(() => import("../components/Signup"));
const Dashboard = lazy(() => import("../components/Dashboard"));
const FormBuilder = lazy(() => import("../../../form-builder"));
const FormViewer = lazy(() => import("../components/FormViewer"));
const NotFound = lazy(() => import("../components/NotFound"));

export const App = (): React.JSX.Element => {
  return (
    // Context needed by both SubHeader and FormBuilder
    <FormBuilderContextProvider>
      <div className={classes.layout}>
        <header>
          <Header />
          <SubHeader />
        </header>
        <main className={classes.main}>
          <Suspense>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/:authError" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/form-builder/:formId" element={<FormBuilder />} />
              <Route path="/view/:formId" element={<FormViewer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </FormBuilderContextProvider>
  );
};
