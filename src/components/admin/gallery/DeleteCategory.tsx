"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export const DeleteCategory = ({
  cat,
  deleteCategory,
}: {
  cat: { _id: string; count: number };
  deleteCategory: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <div className="text-sm text-red-600">Устгах</div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Категори устгах</DialogTitle>
          </DialogHeader>
          <DialogDescription>Та энэ категори устгах уу?</DialogDescription>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                if (cat.count > 0) {
                  toast.error("Категориг устгах боломжгүй");
                  return;
                }
                deleteCategory(cat._id);
              }}
            >
              Устгах
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Цуцлах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
