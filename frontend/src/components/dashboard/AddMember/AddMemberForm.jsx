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
import axios from "axios";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const breadcrumbItems = [
  { title: "Member", link: "/dashboard/addmember" },
  { title: "Add", link: "/dashboard/addmember/new" },
];

const formSchema = yup.object({
  firstname: yup.string().min(1),
  lastname: yup.string().min(1),
  email: yup.string().email(),
  slackId: yup.string(),
  phonenumber: yup
    .string()
    .min(10, "Phone number must be exactly 10 characters")
    .max(10, "Phone number must be exactly 10 characters")
    .nullable()
    .transform((value, originalValue) => {
      // Transform empty string to null to make it optional
      return originalValue === "" ? null : originalValue;
    })
    .optional(),
});

const AddMemberForm = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      slackId: "",
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const finalData = { ...data, userId: user._id };
    try {
      await axios.post("/api/addmember", finalData);
      toast.success("Member added");
      queryClient.invalidateQueries({
        queryKey: ["getMembersForReminderForm"],
      });
      navigate("/dashboard/addmember");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading title={`Add Member`} description={""} />
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
      <Toaster position="bottom-left" />
    </div>
  );
};

export default AddMemberForm;
