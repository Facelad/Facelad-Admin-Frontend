import * as React from "react";
import { cn } from "./utils";

export function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  // Este componente debe recibir formDescriptionId como prop o contexto externo
  return (
    <p
      data-slot="form-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}