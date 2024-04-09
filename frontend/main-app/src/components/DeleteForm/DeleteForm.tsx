import { Modal } from "@digdir/design-system-react";
import React, { ReactNode } from "react";
import { DeleteDialog } from "./DeleteDialog";

interface DeleteFormProps {
  children: ReactNode;
  color: string;
  className?: string;
  size?: string;
  variant?: string;
}

export const DeleteForm: React.FC<DeleteFormProps> = ({
  children,
  color,
  className,
  size,
  variant,
}) => {
  return (
    <Modal.Root>
      <Modal.Trigger className={className} variant={variant} size={size} color={color}>
        {children}
      </Modal.Trigger>
      <DeleteDialog />
    </Modal.Root>
  );
};
