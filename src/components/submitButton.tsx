"use client";

import { useFormStatus } from "react-dom";
import Button from "react-bootstrap/Button";

export function SubmitButton({ normalLabel, pendingLabel }: any) {
  const { pending } = useFormStatus();
  return (
    <Button variant="primary" type="submit" disabled={pending}>
      {pending ? pendingLabel : normalLabel}
    </Button>
  );
}
