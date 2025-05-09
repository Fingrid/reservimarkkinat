import { AvatarPlaceHolderIcon } from "./Icons";

export const Avatar = ({ initials }: { initials?: string }) => {
  if (!initials) {
    return (
      <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <AvatarPlaceHolderIcon />
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {initials}
      </span>
    </div>
  );
};
