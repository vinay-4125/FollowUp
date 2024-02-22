import { Button } from "@/components/ui/button";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const formSchema = yup.object({
  firstname: yup.string().min(1),
  lastname: yup.string().min(1),
  email: yup.string().email(),
  slackId: yup.string().min(1),
  phonenumber: yup.string().min(10).max(10),
});

const PersonalDetails = () => {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      //   firstname: state.firstname,
      //   lastname: state.lastname,
      //   email: state.email,
      //   phonenumber: state.phonenumber,
      //   slackId: state.slackId,
    },
    model: "all",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const finalData = { ...data };
    try {
      await axios.put("/api/updatemember", finalData);
      toast.success("Member updated");
      navigate("/dashboard/addmember");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full  xl:w-2/3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start items-center">
                    Firstname
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Luke" {...field} />
                  </FormControl>
                  <FormMessage className="flex justify-start items-center " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start items-center">
                    Lastname
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Wallace" {...field} />
                  </FormControl>
                  <FormMessage className="flex justify-start items-center " />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start items-center">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="abc@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage className="flex justify-start items-center " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start items-center">
                    Phone (Whatsapp)
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="+9191919191" {...field} />
                  </FormControl>
                  <FormMessage className="flex justify-start items-center " />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="slackId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start items-center">
                    SlackId
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="slackId" {...field} />
                  </FormControl>
                  <FormMessage className="flex justify-start items-center " />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Update</Button>
        </form>
      </Form>
      <div className="mt-5">
        <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      </div>
      <Toaster position="bottom-left" />
    </>
  );
};

export default PersonalDetails;
