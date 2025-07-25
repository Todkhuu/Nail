"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FileImage } from "lucide-react";

type Props = {
  secondImage?: string;
  handleFileSecond: (_file: File) => void;
};

const CloudinaryUploadSecond = ({ handleFileSecond, secondImage }: Props) => {
  const [image, setImage] = useState(secondImage || "");

  useEffect(() => {
    setImage(secondImage || "");
  }, [secondImage]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (file) {
      handleFileSecond(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <label htmlFor="file-input">
      {image ? (
        <div>
          <Image
            alt="uploaded"
            src={image}
            width={1000}
            height={1000}
            className="w-[100%] h-[138px] object-cover object-center rounded-md"
          />
        </div>
      ) : (
        <div>
          <div className="h-[138px] border-[1px] rounded-md flex flex-col justify-center items-center">
            <FileImage className="stroke-[#71717a] w-[18px] h-[18px]" />
            <p className="text-[#71717a] text-[14px]">Зураг нэмэх</p>
          </div>
        </div>
      )}
      <Input
        id="file-input"
        onChange={handleOnChange}
        type="file"
        className="w-[400px] hidden"
      />
    </label>
  );
};
export default CloudinaryUploadSecond;
