import * as React from "react";
import { FormItemContext } from "./form-helpers";

export const useFormField = () => {
  const itemContext = React.useContext(FormItemContext);
  // const { getFieldState } = useFormContext(); // Eliminado porque no se usa
  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItemContext.Provider>");
  }
  const { id } = itemContext;
  return {
    id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
};