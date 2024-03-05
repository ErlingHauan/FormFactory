import React from "react";
import { Heading, Paragraph } from "@digdir/design-system-react";

interface CustomParagraphProps {
  heading: string;
  content: string | number;
}

export const CustomParagraph: React.FC<CustomParagraphProps> = ({ heading, content }) => (
  <>
    <Heading level={6} size="xxsmall">
      {heading}
    </Heading>
    <Paragraph spacing={true}>{content}</Paragraph>
  </>
);
