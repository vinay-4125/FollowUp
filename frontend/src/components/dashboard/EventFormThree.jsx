import * as yup from "yup";
import { Plus, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import makeAnimated from "react-select/animated";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useSelector } from "react-redux";
import axios from "axios";
import { ScrollArea } from "../ui/scroll-area";
import { toast, Toaster } from "sonner";

const formSchema = yup.object({
  reminderName: yup.string().required(),
  date: yup.string().required(),
  time: yup.string().required(),
  description: yup.string().required(),
  listMembers: yup.array().required(),
  notification: yup.array().required(),
  repeat: yup.string().required(),
  color: yup.string().required(),
});

const EventFormThree = () => {
  const animatedComponents = makeAnimated();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const queryClient = useQueryClient();
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

  const form = useForm({
    defaultValues: {
      reminderName: "",
      date: "",
      time: "",
      description: "",
      listMembers: [],
      notification: [],
      repeat: "",
      color: "",
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });
  const repeatData = [
    { label: "Does not repeat", value: "norepeat" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const [members, setMembers] = useState([]);

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
  const fetchMembers = async () => {
    const res = await axios.get(`/api/getmembers/${user._id}`);
    return res.data.member;
  };

  const { data: memberData } = useQuery({
    queryKey: ["getMembers"],
    queryFn: fetchMembers,
  });

  const handleToggleChange = (item) => {
    let filteredMembers = memberData;

    if (item.includes("Email")) {
      filteredMembers = filteredMembers.filter(
        (member) => member.email !== null
      );
      // .map((member) => ({
      //   value: `${member._id}`,
      //   label: `${member.email}`,
      // }));
    }

    if (item.includes("Whatsapp")) {
      filteredMembers = filteredMembers.filter(
        (member) =>
          member.phonenumber &&
          member.phonenumber !== null &&
          member.phonenumber !== ""
      );
      // .map((member) => ({
      //   value: `${member._id}`,
      //   label: `${member.phonenumber}`,
      // }));
    }

    if (item.includes("Slack")) {
      filteredMembers = filteredMembers.filter(
        (member) => member.slackId !== null && member.slackId !== ""
      );
      // .map((member) => ({
      //   value: `${member._id}`,
      //   label: `${member.slackId}`,
      // }));
    }
    const formattedData = filteredMembers.map((member) => ({
      value: `${member._id}`,
      label: `${member.firstname} ${member?.lastname}`,
    }));
    form.setValue("notification", item);
    setMembers(formattedData);
  };
  const handleMemberListChange = (data) => {
    const valueData = data.map((item) => item.value);
    setSelectedOption(valueData);
    form.setValue("listMembers", valueData);
  };

  const handleMissingFields = () => {
    navigate("/dashboard/settings");
    setOpen(false);
  };

  const handleDeleteMember = async (data) => {
    try {
      const res = await axios.delete("/api/deletereminder", {
        params: { _id: data._id, userId: user._id },
      });
      await queryClient.invalidateQueries({
        queryKey: ["getAllReminders"],
        refetchType: "active",
      });
      await queryClient.invalidateQueries({
        queryKey: ["fetchUpcomingReminder"],
        refetchType: "active",
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      data.userId = user._id;
      console.log(data);
      const res = await axios.post("/api/reminder", data);
      console.log("EVENTTWOFORM", res);
      toast("Event has been created", {
        description: `Reminder Set for ${res.data.reminder.reminderName} at ${res.data.reminder.date}/${res.data.reminder.time}`,
        action: {
          label: "Undo",
          onClick: () => handleDeleteMember(res.data.reminder), //! To implement undo function to undo the event.
        },
      });
      await queryClient.invalidateQueries({
        queryKey: ["fetchUpcomingReminder"],
        refetchType: "active",
      });
      await queryClient.invalidateQueries({
        queryKey: ["getAllReminders"],
        refetchType: "active",
      });
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button className="hidden sm:flex">
          <Plus />
          Create Reminder
        </Button>
        <Button className="sm:hidden">
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-full sm:min-w-[540px] md:min-w-[740px] rounded-l-lg">
        <ScrollArea className="h-full">
          <SheetHeader>
            <SheetTitle className="text-2xl">Create Reminder</SheetTitle>
            <SheetDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mt-2 mb-4 grid sm:grid-cols-4 gap-10">
                    <div className="col-span-4 sm:col-span-3">
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
                    <div className="col-span-4 sm:col-span-1">
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
                    <div className="col-span-4 sm:col-span-4">
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
                    <div className="col-span-4 sm:col-span-2">
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
                    <div className="col-span-4 sm:col-span-2">
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
                    <div className="col-span-4 sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="notification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex justify-start items-center">
                              Notification
                            </FormLabel>
                            <FormControl>
                              <ToggleGroup
                                variant="outline"
                                type="multiple"
                                className="md:-ml-28 pt-1.5"
                                onValueChange={(item) => {
                                  field.onChange;
                                  handleToggleChange(item);
                                }}
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
                    <div className="col-span-4 sm:col-span-2 my-1.5">
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
                                  className="my-react-select-container"
                                  classNamePrefix="my-react-select"
                                  defaultValue={selectedOption}
                                  options={repeatData}
                                  components={animatedComponents}
                                  placeholder="Select Repetition"
                                  closeMenuOnSelect={false}
                                  onChange={(data) => {
                                    form.setValue("repeat", data.value);
                                  }}
                                />
                              </FormControl>
                            </FormControl>
                            <FormMessage className="flex justify-start items-center" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
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
                                defaultValue={selectedOption}
                                onChange={(data) =>
                                  handleMemberListChange(data)
                                }
                                className="my-react-select-container"
                                classNamePrefix="my-react-select"
                                options={members}
                                isMulti={true}
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
                  <div className="flex justify-end gap-5">
                    <Button
                      variant="outline"
                      key={"cancel"}
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Form>
            </SheetDescription>
          </SheetHeader>
        </ScrollArea>
      </SheetContent>
      <Toaster />
    </Sheet>
  );
};

export default EventFormThree;
