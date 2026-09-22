import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import { Tabs, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";

export default function RootPage() {
  return (
    <>
      <ThemeSwitcher />
      <Tabs defaultValue="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
