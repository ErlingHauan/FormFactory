import React from "react";
import '@digdir/design-system-tokens/brand/digdir/tokens.css';
import { Heading } from "@digdir/design-system-react";
import styles from "./App.module.css";

export const App = (): React.JSX.Element => {
    
    return (
        <>
            <header>
                <Heading level={1}>Form Factory</Heading>
            </header>
            <div>If you see this, then the main app has successfully loaded! 🚀</div>
        </>
    )};