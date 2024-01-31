/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Heading } from "@digdir/design-system-react";

export const PlaceholderText = (): React.JSX.Element => {
  return (
    <>
    <section>
        <Heading level={1}>Welcome to the Form Factory</Heading>
        <p>The ultimate destination for effortless form creation and management. Our platform, powered by the robust combination of React for the frontend and .Net Core for the backend, offers a seamless drag-and-drop system that simplifies the form creation process for users of all skill levels.</p>
    </section>

    <section>
        <Heading level={2} size="medium">Open-Source Platform</Heading>
        <p>At Form Factory, we believe in the power of open-source technology. Our platform is fully open-source, inviting developers and tech enthusiasts around the world to contribute, customize, and enhance the capabilities of Form Factory. Whether you're looking to create simple contact forms, complex surveys, or anything in between, our intuitive interface makes the process straightforward and efficient.</p>
    </section>

    <section>
        <Heading level={2} size="medium">User-Friendly Design</Heading>
        <p>Our drag-and-drop system is designed to be user-friendly, eliminating the need for coding knowledge. With a wide range of customizable fields and elements, users can easily tailor their forms to meet specific needs. From text inputs, radio buttons, and checkboxes to file uploads and dropdown menus, Form Factory provides all the tools you need to collect information effectively.</p>
    </section>

    <section>
        <Heading level={2} size="medium">Security and Performance</Heading>
        <p>Security and reliability are at the core of Form Factory. Leveraging the strengths of .Net Core, we ensure that all forms are processed with high performance and robust security measures. React's dynamic and responsive design capabilities mean that forms created with Form Factory are not only functional but also visually appealing across all devices.</p>
    </section>

    <section>
        <Heading level={2} size="medium">Join Our Community</Heading>
        <p>As an open-source platform, Form Factory thrives on community contribution. We encourage developers to dive into our codebase, submit features, fix bugs, and help us evolve. Our comprehensive documentation and supportive community make it easy for anyone to get started.</p>
        <p>Whether you're a business owner, event organizer, or a developer looking for an efficient way to gather data, Form Factory is your go-to solution. Join our community today and start creating forms the easy way. With Form Factory, the possibilities are endless, and the process is simpler than ever.</p>
    </section>
    </>
  );
};
