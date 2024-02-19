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
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "../ui/command";
import { CommandItem } from "cmdk";
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

const formSchema = yup.object({
  eventName: yup.string(),
  date: yup.string(),
  time: yup.string(),
  description: yup.string(),
  // listMembers: z.array({
  //   required_error: "Please select a member.",
  // }),
  listMembers: yup.array(),
  notification: yup.array(),
  repeat: yup.string(),
});

const EventFormOne = () => {
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

  // console.log("Membersname", membersName);
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
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
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const handleCombobox = (field, item) => {
    const selectedMembers = field.value || [];
    const updatedMembers = selectedMembers.includes(item.value)
      ? selectedMembers.filter((member) => member !== item.value)
      : [...selectedMembers, item.value];

    form.setValue("listMembers", updatedMembers);
  };

  const handleSelectFramework = (selectedValue) => {
    const selectedFramework = members.find(
      (framework) => framework.value !== selectedValue
    );
    console.log("selectedFramework", selectedFramework);
    setSelectedUser((prevMembers) => [...prevMembers, selectedFramework]);
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.value !== selectedFramework?.value)
    );
  };

  const handleRemoveMember = (memberValue) => {
    const removedMember = selectedUser?.find(
      (member) => member.value === memberValue
    );
    if (removedMember) {
      setSelectedUser((prevMembers) =>
        prevMembers.filter((member) => member?.value !== memberValue)
      );
      form.setValue(
        "listMembers",
        selectedUser
          .filter((member) => member?.value !== memberValue)
          .map((member) => member.value)
      );
      setMembers((prevFrameworks) => [...prevFrameworks, removedMember]);
      // setMembers((prev) => [
      //   ...prev,
      //   selectedUser
      //     .filter((member) => member.value !== memberValue)
      //     .map((member) => member.value),
      // ]);
    }
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
              <div className="mt-2 mb-4">
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
                          <Input type="date" {...field} />
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
                <div className="grid grid-cols-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="listMembers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-start items-center">
                            Add Members
                          </FormLabel>

                          <Popover modal={true}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-[200px] justify-between"
                                >
                                  {!field.value
                                    ? members?.find(
                                        (item) => item.value === field.value
                                      )?.label
                                    : "Select Member"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search Members..."
                                  className="h-9"
                                />
                                <CommandEmpty>No member found.</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className="h-48 w-48 rounded-md border">
                                    {members?.map((item) => (
                                      <CommandItem
                                        value={item.label}
                                        key={item.value}
                                        className="px-2 py-1 hover:bg-slate-300 dark:hover:bg-slate-700"
                                        onSelect={(currentValue) => {
                                          handleCombobox(field, item);
                                          handleSelectFramework(currentValue);
                                        }}
                                      >
                                        {item.label}
                                      </CommandItem>
                                    ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>

                          <FormMessage className="flex justify-start items-center" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex -mt-1 -space-x-1 pl-1 justify-start items-center overflow-hidden">
                    {selectedUser.slice(0, 5).map((item, i) => (
                      <div
                        className="h-10 w-10 text-white bg-black rounded-full relative inline-block ring-2 ring-white"
                        key={i}
                      >
                        <button
                          onClick={() => handleRemoveMember(item.value)}
                          className="absolute bg-gray-400 rounded-full right-0 cursor-pointer"
                        >
                          <X size={15} color="black" />
                        </button>
                        <p className="flex text-white justify-center items-center h-10">
                          {item?.label.charAt(0).toUpperCase()}
                        </p>
                      </div>
                    ))}
                    {selectedUser.length > 5 && (
                      <div className="h-10 w-10 text-white bg-black/30 rounded-full">
                        <p className="flex justify-center items-center">
                          +{selectedUser.length - 5}
                        </p>
                      </div>
                    )}
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a repetition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="norepeat">
                                Does not repeat
                              </SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
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
              {/* <div>
                <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
              </div> */}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventFormOne;
