import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BreadCrumb from "../Breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "sonner";
import axios from "axios";
const breadcrumbItems = [
  { title: "Member", link: "/dashboard/addmember" },
  { title: "Update", link: "/dashboard/addmember/update" },
];

const formSchema = yup.object({
  firstname: yup.string().min(1),
  lastname: yup.string().min(1),
  email: yup.string().email(),
  slackId: yup.string().min(1),
  phonenumber: yup.string().min(10).max(10),
});

const UpdateMember = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      firstname: state.firstname,
      lastname: state.lastname,
      email: state.email,
      phonenumber: state.phonenumber,
      slackId: state.slackId,
    },
    model: "all",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const finalData = { ...data, _id: state._id };
    try {
      await axios.put("/api/updatemember", finalData);
      toast.success("Member updated");
      navigate("/dashboard/addmember");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //   console.log("state", state);
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading title={`Update Member`} description={""} />
      </div>
      <Separator />

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
      <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      <Toaster position="bottom-left" />
    </div>
  );
};

export default UpdateMember;
