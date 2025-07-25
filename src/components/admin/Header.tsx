import Link from "next/link";
import { Badge } from "../ui/badge";

export const AdminHeader = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/" className="text-2xl font-bold text-rose-600">
        Elena Rose
      </Link>
      <Badge variant="secondary" className="bg-rose-100 text-rose-700">
        Content Management
      </Badge>
    </div>
  );
};
