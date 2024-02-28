import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import axios from "axios";

const formSchema = yup.object({
  currentPassword: yup.string().min(6).required("Current Password is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .notOneOf(
      [yup.ref("currentPassword")],
      "New Password must not be equal to Current Password"
    ),
});

const Password = ({ user }) => {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const finalData = { ...data, _id: user._id };
    console.log(finalData);
    try {
      const res = await axios.put("/api/updatepass", finalData);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full  xl:w-2/3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start items-center">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="flex justify-start items-center " />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start items-center">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="flex justify-start items-center " />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Update</Button>
        </form>
      </Form>
      {/* <div className="mt-5">
        <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      </div> */}
      <Toaster position="bottom-left" />
    </>
  );
};

export default Password;
