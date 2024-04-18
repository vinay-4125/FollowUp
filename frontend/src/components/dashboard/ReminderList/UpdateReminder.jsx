import * as yup from "yup";
import { Heading } from "@/components/ui/heading";
import BreadCrumb from "../Breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { toast, Toaster } from "sonner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "lucide-react";

const breadcrumbItems = [
  { title: "Reminder", link: "/dashboard/reminderlist" },
  { title: "Update", link: "/dashboard/reminder/update" },
];

const formSchema = yup.object({
  reminderName: yup.string().required(),
  date: yup.string().required(),
  time: yup.string().required(),
  description: yup.string().required(),
  // listMembers: z.array({
  //   required_error: "Please select a member.",
  // }),
  listMembers: yup.array().required(),
  notification: yup.array().required(),
  repeat: yup.string().required(),
  color: yup.string().required(),
});

const UpdateReminder = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const animatedComponents = makeAnimated();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ["getMembers"],
    refetchType: "active",
  });

  const fetchReminderData = async () => {
    const res = await axios.get(`/api/getReminderDataById/${id}`);
    return res.data.result;
  };

  const { data: formData } = useQuery({
    queryKey: ["getReminderById"],
    queryFn: fetchReminderData,
  });
  // console.log("STATE", formData);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const fetchMembers = async () => {
    const res = await axios.get("/api/getMemberFullname", {
      params: { userId: user._id },
    });
    const { fullname } = res.data;
    // const formattedData = fullname.map((member) => ({
    //   value: `${member.firstname} ${member.lastname}`,
    //   label: `${member.firstname} ${member.lastname}`,
    // }));

    const formattedData = fullname.map((member) => ({
      value: `${member.email}`,
      label: `${member.email}`,
    }));

    return formattedData.reverse();
  };

  const { data: membersName } = useQuery({
    queryKey: ["getMembersForReminderForm"],
    queryFn: fetchMembers,
    // staleTime: 1000 * 10,
  });
  let colors = [
    "#FF5733",
    "#FFD700",
    "#4CAF50",
    "#3498DB",
    "#9B59B6",
    "#E74C3C",
    "#578885",
    "#94a3b8",
    "#f87171",
    "#fb923c",
    "#fbbf24",
    "#34d399",
    "#22d3ee",
    "#818cf8",
    "#e879f9",
    "#fb7185",
  ];
  const repeatData = [
    { label: "Does not repeat", value: "norepeat" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const fields = ["email", "phonenumber", "slackId"];
  const existingFields = Object.keys(user)
    .filter((field) => fields.includes(field))
    .map((field) => {
      if (field === "email") {
        return "Email";
      } else if (field === "phonenumber") {
        return "Whatsapp";
      } else if (field === "slackId") {
        return "Slack";
      } else {
        return field;
      }
    });
  const missingFields = fields
    .filter((field) => !Object.prototype.hasOwnProperty.call(user, field))
    .map((field) => {
      // Map field names to desired names
      if (field === "email") {
        return "Email";
      } else if (field === "phonenumber") {
        return "Whatsapp";
      } else if (field === "slackId") {
        return "Slack";
      } else {
        return field;
      }
    });
  const form = useForm({
    defaultValues: async () =>
      await axios
        .get(`/api/getReminderDataById/${id}`)
        .then((res) => res.data.result),

    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const handleMissingFields = () => {
    navigate("/dashboard/settings");
  };

  const [members, setMembers] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => setMembers(membersName), [membersName]);

  const handleMemberListChange = (data) => {
    const valueData = data.map((item) => item.value);
    setSelectedOption(valueData);
    form.setValue("listMembers", valueData);
  };
  const onSubmit = async (data) => {
    try {
      data.userId = user._id;
      data.id = id;
      // console.log(data);
      const res = await axios.put("/api/updatereminder", data);
      console.log("UPDATEREMINDER", res);
      await queryClient.invalidateQueries({
        queryKey: ["fetchUpcomingReminder"],
        refetchType: "active",
      });
      await queryClient.invalidateQueries({
        queryKey: ["getAllReminders"],
        refetchType: "active",
      });
      navigate("/dashboard/reminderlist");
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {formData && (
        <div className="flex-1  overflow-hidden space-y-4 p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex items-start justify-between">
            <Heading title={`Update Reminder`} />
          </div>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mt-2 mb-4 grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="reminderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center">
                          Reminder Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Reminder name" {...field} />
                        </FormControl>
                        <FormMessage className="flex justify-start items-center" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center">
                          Color
                        </FormLabel>
                        <FormControl>
                          <ShadSelect
                            onValueChange={field.onChange}
                            value={field.value}
                            required={true}
                          >
                            <SelectTrigger
                              style={{ backgroundColor: field.value }}
                              className={`bg-[${field.value}]`}
                            >
                              <SelectValue placeholder="Select a Color" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {/* <SelectLabel>Reminder Colors</SelectLabel> */}
                                {colors.map((item) => (
                                  <SelectItem
                                    key={item}
                                    style={{ backgroundColor: item }}
                                    className="rounded-md h-full"
                                    // className={`bg-[${item}] rounded-full`}
                                    value={item}
                                  >
                                    {item}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </ShadSelect>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid w-full gap-1 5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-start items-center">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Reminder Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="flex justify-start items-center" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 my-4">
                <div>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center">
                          Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className=""
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </FormControl>
                        <FormMessage className="flex justify-start items-center" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center">
                          Time
                        </FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage className="flex justify-start items-center" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="my-4">
                <div className="grid">
                  <div>
                    <FormField
                      control={form.control}
                      name="listMembers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-start items-center">
                            Add Members
                          </FormLabel>
                          <FormControl>
                            <Select
                              // defaultValue={state.listMembers}
                              // value={state.listMembers}
                              onChange={(data) => handleMemberListChange(data)}
                              options={members}
                              isMulti={true}
                              // styles={{
                              //   control: (base) => ({
                              //     ...base,
                              //     border: "none",
                              //     boxShadow: "none",
                              //     "&:hover": {
                              //       border: "1px solid black",
                              //   },
                              //   }),
                              // }}
                              components={animatedComponents}
                              noOptionsMessage={() => "No more members"}
                              placeholder="Select Members..."
                              closeMenuOnSelect={false}
                            />
                          </FormControl>
                          <FormMessage className="flex justify-start items-center" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="my-4 grid sm:grid-cols-2">
                <div>
                  <FormField
                    control={form.control}
                    name="notification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center">
                          Notification
                        </FormLabel>
                        <FormControl className="flex justify-start px-4">
                          <ToggleGroup
                            variant="outline"
                            type="multiple"
                            className="-ml-4 pt-1.5"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            {existingFields &&
                              existingFields.map((item, index) => (
                                <ToggleGroupItem key={index} value={item}>
                                  {item}
                                </ToggleGroupItem>
                              ))}
                            {existingFields.length !== fields.length && (
                              <Popover>
                                <PopoverTrigger className="border w-10 h-10 rounded-md flex justify-center items-center">
                                  <PlusIcon className="font-light text-slate-600 h-6 w-6" />
                                </PopoverTrigger>
                                <PopoverContent className="w-fit h-fit">
                                  {missingFields &&
                                    missingFields.map((item, index) => (
                                      <Button
                                        variant="outline"
                                        onClick={handleMissingFields}
                                        key={index}
                                      >
                                        Add {item}
                                      </Button>
                                    ))}
                                </PopoverContent>
                              </Popover>
                            )}
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage className="flex justify-start items-center" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-1.5">
                  <FormField
                    control={form.control}
                    name="repeat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center -mt-1.5 mb-3.5">
                          Repeat
                        </FormLabel>
                        <FormControl>
                          <FormControl>
                            <Select
                              defaultValue={selectedOption}
                              options={repeatData}
                              components={animatedComponents}
                              placeholder="Select Repetition"
                              closeMenuOnSelect={false}
                              onChange={(data) => {
                                form.setValue("repeat", data.value);
                              }}
                              className="focus:border-none focus:outline-none border-input"
                            />
                          </FormControl>
                        </FormControl>
                        <FormMessage className="flex justify-start items-center" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit">Update</Button>

              <div className="mt-5">
                {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
              </div>
            </form>
          </Form>
          <Toaster/>
        </div>
      )}
    </>
  );
};

export default UpdateReminder;
