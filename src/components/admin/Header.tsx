"use client";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useStaff } from "@/app/_context/StaffContext";

export const AdminHeader = () => {
  const { staff } = useStaff();
  return (
    <div className="flex items-center space-x-4">
      <Link href="/" className="text-2xl font-bold text-rose-600">
        {staff?.name}
      </Link>
      <Badge variant="secondary" className="bg-rose-100 text-rose-700">
        Контентын удирдлага
      </Badge>
    </div>
  );
};
