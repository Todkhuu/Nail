import { ServiceType } from "@/app/utils/types";
import { CategoryType } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Popover } from "@/components/ui/popover";
import { PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";

type Props = {
  categoriess: CategoryType[];
  services: ServiceType[];
};

const formSchema = z.object({
  name: z.string().min(1),
});

export const AddCategory = ({ categoriess, services }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const getCategoryStats = () => {
    return categoriess?.map((cat) => ({
      ...cat,
      count: services?.filter((service) => service.category._id === cat._id)
        .length,
    }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const addCategory = async (value: string) => {
    const response = await axios.post("/api/categories", { name: value });
    console.log(response);
    setIsOpen(false);
    toast.success("Category added successfully");
  };

  const deleteCategory = async (id: string) => {
    const response = await axios.delete(`/api/categories?id=${id}`);
    console.log(response);
    toast.success("Category deleted successfully");
  };

  const editCategory = async (id: string, value: string) => {
    const response = await axios.put(`/api/categories?id=${id}`, {
      name: value,
    });
    console.log(response);
    toast.success("Category updated successfully");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    addCategory(values.name);
    editCategory(editId || "", values.name);
  }

  return (
    <div className="flex items-center flex-wrap gap-4">
      {getCategoryStats()?.map((cat) => (
        <Popover key={cat._id}>
          <PopoverTrigger onClick={() => setEditId(cat._id)}>
            <Button
              key={cat._id}
              className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border-0 flex hover:bg-white/90"
            >
              <div className="text-sm text-gray-600">{cat.name}</div>
              <div className="text-xs font-bold text-rose-600">{cat.count}</div>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Update</Button>
              </form>
            </Form>
            <Dialog>
              <DialogTrigger>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Category</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Are you sure you want to delete this category?
                </DialogDescription>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={() => deleteCategory(cat._id)}
                  >
                    Delete
                  </Button>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </PopoverContent>
        </Popover>
      ))}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <PlusCircleIcon className="h-6 w-6 bg-rose-500 text-white rounded-full" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Add a new category to your gallery
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Add Category
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
