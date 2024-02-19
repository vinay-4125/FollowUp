import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object({
  username: yup.string(),
  email: yup.string().email(),
  password: yup
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

const NewInput = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });
  return <></>;
};

export default NewInput;
