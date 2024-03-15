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
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateUserLocalStorage } from "@/redux/slice/userSlice";
import ProfilePicture from "./ProfilePicture";

const formSchema = yup.object({
  username: yup.string().min(1),
  email: yup.string().email(),
  slackId: yup.string().min(1),
  phonenumber: yup.string().min(10).max(10),
});

const PersonalDetails = ({ user }) => {
  const dispatch = useDispatch();

  // const state1 = {
  //   username: "abc",
  //   email: "abc@gmail.com",
  //   phonenumber: "1231231231",
  //   slackId: "abc@slack.com",
  // };
  const form = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      phonenumber: user?.phonenumber,
      slackId: user?.slackId,
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      _id: user._id,
    };
    // console.log(finalData);
    try {
      await axios.put("/api/updateUser", finalData);
      // console.log(finalData);
      dispatch(updateUserLocalStorage(finalData));
      toast.success("Profile Updated");
    } catch (error) {
      // console.log(error);
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
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user && <ProfilePicture user={user} />}
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start items-center">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="flex justify-start items-center " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start items-center">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="flex justify-start items-center " />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start items-center">
                    Phone (Whatsapp)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="9191919191" type="number" {...field} />
                  </FormControl>
                  <FormMessage className="flex justify-start items-center " />
                </FormItem>
              )}
            />
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
      {/* <div className="mt-5">
        <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      </div> */}
      <Toaster position="bottom-left" />
    </>
  );
};

export default PersonalDetails;
