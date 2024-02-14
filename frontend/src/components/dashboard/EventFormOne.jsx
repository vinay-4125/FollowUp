import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Check, ChevronsUpDown, Languages, Plus } from "lucide-react";
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
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "../ui/command";
import { CommandItem } from "cmdk";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  eventName: z.string(),
  date: z.date(),
  time: z.string(),
  description: z.string(),
  listMembers: z.array({
    required_error: "Please select a member.",
  }),
  notification: [],
  repeat: "",
});

const EventFormOne = () => {
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
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {
    console.log(form.getValues());
  };

  const handleRemoveMember = (memberValue) => {
    const removedMember = members.find(
      (member) => member.value === memberValue
    );

    if (removedMember) {
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.value !== memberValue)
      );

      form.setValue((prev) => ({
        ...prev,
        listMembers: prev.listMembers.filter(
          (member) => member.value !== memberValue
        ),
      }));

      setFrameworks((prevFrameworks) => [...prevFrameworks, removedMember]);
    }
  };

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
                              {field.value
                                ? frameworks.find(
                                    (framework) =>
                                      framework.value === field.value
                                  )?.label
                                : "Select Members..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Members..." />
                            <CommandEmpty>No member found.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea className="h-48 w-48 rounded-md border">
                                {frameworks.map((framework) => (
                                  <div key={framework.value}>
                                    <CommandItem
                                      key={framework.value}
                                      value={framework.value}
                                      onSelect={(currentValue) => {
                                        form.setValue(
                                          currentValue === framework.value
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
                                          field.value === framework.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      <p className="pl-5 text-sm">
                                        {framework.label}
                                      </p>
                                    </CommandItem>
                                  </div>
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
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventFormOne;
