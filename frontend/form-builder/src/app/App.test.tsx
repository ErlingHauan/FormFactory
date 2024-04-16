import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { FormBuilderContext } from "../context";

const mockedForm = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  user: "user@example.com",
  organization: "string",
  title: "string",
  description: "string",
  status: "string",
  published: "2024-04-11T07:58:48.939Z",
  expires: "2024-04-11T07:58:48.939Z",
  components: [],
};

jest.mock("../../../main-app/src/hooks/useAuthorization", () => ({
  useAuthorization: jest.fn(),
}));

jest.mock("../hooks/useGetForm", () => ({
  useGetForm: jest.fn(),
}));

describe("Form Builder App component", () => {
  it("should render the form builder when form is available", () => {
    render(
      <FormBuilderContext.Provider value={{ form: mockedForm, setForm: jest.fn() }}>
        <App />
      </FormBuilderContext.Provider>,
    );
    expect(screen.getByRole("heading", { name: "toolbar_tools" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "form_builder.preview" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "settings_side_bar" })).toBeInTheDocument();
  });

  it("should render the NotFound component when form is not available", () => {
    render(
      <FormBuilderContext.Provider value={{ form: null, setForm: jest.fn() }}>
        <App />
      </FormBuilderContext.Provider>,
    );

    expect(screen.getByRole("heading", { name: "not_found.title.page" })).toBeInTheDocument();
  });
});
