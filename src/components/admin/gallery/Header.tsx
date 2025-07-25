import { CategoryType } from "@/app/utils/types";

export const GalleryHeader = ({
  categories,
}: {
  categories: CategoryType[];
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-light text-gray-800">Галерей удирдлага</h1>
        <p className="text-gray-600 mt-2">
          Хумсны загварын галерей удирдах ({categories?.length} загвар)
        </p>
      </div>
    </div>
  );
};
