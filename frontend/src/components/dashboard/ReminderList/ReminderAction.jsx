import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/sonner";
import axios from "axios";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const ReminderAction = ({ data }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { user } = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const fetchUpcomingReminder = async () => {
    const res = await axios.get(`/api/upcomingreminder/${user._id}`);
    return res.data.result;
  };

  const { data: upcomingReminder } = useQuery({
    queryKey: ["fetchUpcomingReminder"],
    queryFn: fetchUpcomingReminder,
    staleTime: 1000 * 10,
  });

  // console.log("upcomingReminderfromupdate", upcomingReminder);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={(data) => onConfirm(data)}
        loading={loading}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {upcomingReminder &&
            upcomingReminder.some((reminder) => reminder._id === data._id) && (
              <Link to={`/dashboard/reminder/update/${data._id}`} state={data}>
                <DropdownMenuItem className="my-1">
                  <Edit className="mr-2 h-4 w-4" /> Update
                </DropdownMenuItem>
              </Link>
            )}
          <DropdownMenuItem
            className="bg-destructive hover:shadow-sm text-white"
            onSelect={() => setShowDeleteDialog(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogTrigger className="flex"></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete these
              reminder.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/80"
              onClick={() => handleDeleteMember(data)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster position="bottom-left" />
    </>
  );
};

export default ReminderAction;
