import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z
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
    resolver: zodResolver(formSchema),
  });
  return <>
    
  </>;
};

export default NewInput;
