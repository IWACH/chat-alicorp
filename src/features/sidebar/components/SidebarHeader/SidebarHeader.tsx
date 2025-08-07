import { ThemeToggle } from "@/features/sidebar/components/ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-lg font-semibold">Chat Alicorp</h1>
      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
