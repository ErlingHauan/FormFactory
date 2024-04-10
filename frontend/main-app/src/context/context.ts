import React, { createContext } from "react";

export const UserContext = createContext(null);
export const FormContext: React.Context<null | Form> = createContext(null);
