import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  placeholder,
}) => {
  return (
    <>
      <Field name={name}>
        {({ field, form }: any) => (
          <FormControl>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input type={type} {...field} placeholder={placeholder} id={name} />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </>
  );
};

export default InputField;
