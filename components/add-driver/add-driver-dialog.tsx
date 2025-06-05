"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import AddDriverForm from "./add-driver-form";

export default function AddDriverDialog() {
  const [showSheet, setShowSheet] = useState(false);
  return (
    <Dialog open={showSheet} onOpenChange={setShowSheet}>
      <DialogTrigger asChild>
        <Button>Add Driver</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add driver</DialogTitle>
        </DialogHeader>

        <ScrollArea className="overflow-y-auto">
          <AddDriverForm setShowSheet={setShowSheet} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
