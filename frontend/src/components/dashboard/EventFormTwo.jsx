import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import makeAnimated from "react-select/animated";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
import { Toaster, toast } from "sonner";
import Select from "react-select";
import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = yup.object({
  eventName: yup.string().required(),
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

const EventFormTwo = () => {
  const animatedComponents = makeAnimated();

  const [selectColor, setSelectColor] = useState("");

  const fetchMembers = async () => {
    const res = await axios.get("/api/getMemberFullname");
    const { fullname } = res.data;
    const formattedData = fullname.map((member) => ({
      value: `${member.firstname} ${member.lastname}`,
      label: `${member.firstname} ${member.lastname}`,
    }));

    return formattedData;
  };

  const { data: membersName } = useQuery({
    queryKey: ["getMembersForEventForm"],
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
  ];

  const repeatData = [
    { label: "Does not repeat", value: "norepeat" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const [members, setMembers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => setMembers(membersName), [membersName]);
  const form = useForm({
    defaultValues: {
      eventName: "",
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

  const handleMemberListChange = (data) => {
    const valueData = data.map((item) => item.value);
    setSelectedOption(valueData);
    form.setValue("listMembers", valueData);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await axios.post("/api/reminder", data);
      toast.success("Member added");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>
            <Plus />
            Create Event
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Create Event</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mt-2 mb-4 grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start items-center">
                          Event Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Event name" {...field} />
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
                            <SelectTrigger className={`bg-[${field.value}]`}>
                              <SelectValue placeholder="Select a Color" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Event Colors</SelectLabel>
                                {colors.map((item) => (
                                  <SelectItem
                                    key={item}
                                    className={`bg-[${item}] rounded-full`}
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
                        <Textarea placeholder="Event Description" {...field} />
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
                              defaultValue={selectedOption}
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
                              className="react-select-class"
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
                        <FormControl>
                          <ToggleGroup
                            variant="outline"
                            type="multiple"
                            className="-ml-4 pt-1.5"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <ToggleGroupItem
                              value="email"
                              aria-label="Toggle bold"
                            >
                              Email
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="whatsapp"
                              aria-label="Toggle strikethrough"
                            >
                              Whatsapp
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="slack"
                              aria-label="Toggle italic"
                            >
                              Slack
                            </ToggleGroupItem>
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
              <div className="flex justify-end gap-5">
                <Button
                  variant="outline"
                  key={"cancel"}
                  type="button"
                  // onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
              <div>
                <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventFormTwo;
