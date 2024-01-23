import React from "react";
import { createRoot } from "react-dom/client";

const App = (): React.JSX.Element => (
  <div>If you see this, then form-viewer has successfully loaded! 🚀</div>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

