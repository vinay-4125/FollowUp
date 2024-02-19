import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
// import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import { Toaster } from "../ui/sonner";

const EventForm = () => {
  const fetchMembers = async () => {
    const res = await axios.get("/api/getMemberFullname");
    const { fullname } = res.data;
    const formattedData = fullname.map((member) => ({
      value: `${member.firstname} ${member.lastname}`.toLowerCase(),
      label: `${member.firstname} ${member.lastname}`,
    }));

    return formattedData;
  };

  const { data: frameworkData } = useQuery({
    queryKey: ["getMembersForEventForm"],
    queryFn: fetchMembers,
  });

  // const [frameworks, setFrameworks] = useState(frameworkData || []);

  const [frameworks, setFrameworks] = useState([
    {
      value: "john",
      label: "John",
    },
    {
      value: "jane",
      label: "Jane",
    },
    {
      value: "sam",
      label: "Sam",
    },
    {
      value: "ron",
      label: "Ron",
    },
    {
      value: "roy",
      label: "Roy",
    },
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "james",
      label: "James",
    },
  ]);

  const [members, setMembers] = useState([]);

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState("");

  const [data, setData] = useState({
    eventName: "",
    date: "",
    listMembers: [],
    message: "",
  });

  const handleSelectFramework = (selectedValue) => {
    const selectedFramework = frameworks.find(
      (framework) => framework.value === selectedValue
    );

    setMembers((prevMembers) => [...prevMembers, selectedFramework]);
    setFrameworks((prevFrameworks) =>
      prevFrameworks.filter(
        (framework) => framework.value !== selectedFramework.value
      )
    );
    setData((prev) => ({
      ...prev,
      listMembers: [...prev.listMembers, selectedFramework],
    }));
  };

  const handleRemoveMember = (memberValue) => {
    const removedMember = members.find(
      (member) => member.value === memberValue
    );

    if (removedMember) {
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.value !== memberValue)
      );

      setData((prev) => ({
        ...prev,
        listMembers: prev.listMembers.filter(
          (member) => member.value !== memberValue
        ),
      }));

      setFrameworks((prevFrameworks) => [...prevFrameworks, removedMember]);
    }
  };

  const handleNotification = (val) => {
    setData((prev) => ({ ...prev, notification: val }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeToggle = (e) => {
    setData((prev) => ({ ...prev, repeat: e }));
  };

  const handleSaveButton = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const res = await axios.post("/api/reminder", data);
      setData({
        eventName: "",
        date: "",
        message: "",
        listMembers: [],
        notification: [],
        repeat: "",
      });
      console.log(members);
      setOpenModal(false);
      // toast.success(res.data.message, {
      //   duration: 3000,
      //   style: {
      //     minWidth: "250px",
      //   },
      // });
      // toast.promise(_, {
      //   loading: "Saving...",
      //   // success: <b>`${res.data.message}`</b>,
      //   success: <b>Success</b>,
      //   error: <b>Could not save.</b>,
      // });

      // toast("Event has been created", {
      //   description: res.data.message,
      //   action: {
      //     label: "Undo",
      //     onClick: () => console.log("Undo"), //! To implement undo function to undo the event.
      //   },
      // });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
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

          <div className="grid gap-4">
            <form onSubmit={handleSubmit}>
              {/* <form> */}
              <div className="mt-2 mb-4">
                <Label
                  htmlFor="eventName"
                  className="font-semibold my-2 inline-block"
                >
                  Event Name
                </Label>
                <Input
                  id="eventName"
                  placeholder="Event name"
                  className="col-span-3"
                  name="eventName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label
                  htmlFor="message"
                  className="font-semibold my-2 inline-block"
                >
                  Description
                </Label>
                <Textarea
                  placeholder="Type your message here."
                  id="message"
                  name="message"
                  className="resize-none"
                  onChange={handleChange}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 my-4">
                <div>
                  <Label
                    htmlFor="date"
                    className="font-semibold my-2 inline-block"
                  >
                    Date
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    name="date"
                    onChange={handleChange}
                    required
                  ></Input>
                </div>
                <div>
                  <Label
                    htmlFor="date"
                    className="font-semibold my-2 inline-block"
                  >
                    Time
                  </Label>
                  <Input
                    type="time"
                    id="date"
                    name="time"
                    onChange={handleChange}
                    required
                  ></Input>
                </div>
              </div>
              <div className="my-4">
                <Label
                  htmlFor="members"
                  className="font-semibold my-2 inline-block"
                >
                  Add Members
                </Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between"
                        >
                          {value
                            ? frameworks.find(
                                (framework) => framework.value === value
                              )?.label
                            : "Select Members..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Members..." />
                          <CommandEmpty>No member found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-48 w-48 rounded-md border">
                              {frameworkData &&
                                frameworks.map((framework) => (
                                  <div key={framework.value}>
                                    <CommandItem
                                      key={framework.value}
                                      value={framework.value}
                                      onSelect={(currentValue) => {
                                        setValue(
                                          currentValue === value
                                            ? ""
                                            : currentValue
                                        );
                                        setOpen(false);
                                        //   setMembers((prev) => [...prev, currentValue]);
                                        handleSelectFramework(currentValue);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          value === framework.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {framework.label}
                                    </CommandItem>
                                  </div>
                                ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex -mt-1 -space-x-1 overflow-hidden">
                    {members.slice(0, 5).map((item, i) => (
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
                        <p className="flex justify-center items-center">
                          {item.label.charAt(0)}
                        </p>
                      </div>
                    ))}
                    {members.length > 5 && (
                      <div className="h-10 w-10 text-white bg-black/30 rounded-full">
                        <p className="flex justify-center items-center">
                          +{members.length - 5}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="my-4 grid sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="notification"
                    className="font-semibold my-2 inline-block"
                  >
                    Notification
                  </Label>
                  {/* <div className=" bg-slate-100 py-1 w-1/2 px-0"> */}
                  <ToggleGroup
                    type="multiple"
                    variant="outline"
                    id="notification"
                    className="-ml-4 pt-1.5"
                    //   name="notification"
                    onValueChange={handleNotification}
                  >
                    <ToggleGroupItem value="email" key="email">
                      Email
                    </ToggleGroupItem>
                    <ToggleGroupItem value="whatsapp" key="whatsapp">
                      Whatsapp
                    </ToggleGroupItem>
                    <ToggleGroupItem value="slack" key="slack">
                      Slack
                    </ToggleGroupItem>
                  </ToggleGroup>
                  {/* </div> */}
                </div>
                <div>
                  <Label
                    htmlFor="repeat"
                    className="font-semibold mb-4 inline-block"
                  >
                    Repeat
                  </Label>
                  <div className="">
                    <Select
                      onValueChange={handleChangeToggle}
                      name="repeat"
                      id="repeat"
                      required
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a repeat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Repeat</SelectLabel>
                          <SelectItem value="norepeat">
                            Does not repeat
                          </SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-5">
                <Button
                  variant="outline"
                  key={"cancel"}
                  type="button"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button key={"save"} onClick={handleSaveButton}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      {/* <Toaster position="top-left" /> */}
    </>
  );
};

export default EventForm;
