"use client";
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { StaffType } from "@/app/utils/types";

type StaffContextType = {
  staff: StaffType | null;
  setStaff: React.Dispatch<React.SetStateAction<StaffType | null>>;
  getStaff: () => void;
  isLoading: boolean;
};

export const StaffContext = createContext<StaffContextType>(
  {} as StaffContextType
);

export const StaffProvider = ({ children }: { children: React.ReactNode }) => {
  const [staff, setStaff] = useState<StaffType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getStaff = async () => {
    try {
      const response = await axios.get("/api/staff");
      setStaff(response.data.staff[0]);
      setIsLoading(false);
    } catch (error: unknown) {
      toast.error(axios.isAxiosError(error).toString());
      console.log("error in context", error);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <StaffContext.Provider value={{ staff, setStaff, getStaff, isLoading }}>
      {children}
    </StaffContext.Provider>
  );
};
export const useStaff = () => useContext(StaffContext);
