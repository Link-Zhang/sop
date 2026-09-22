import BPTable from "@/app/bp/components/BPTable";
import BPTitle from "@/app/bp/components/BPTitle";

export default function BloodPressurePage() {
  return (
    <div className="flex flex-col mx-auto w-full gap-4">
      <BPTitle />
      <BPTable />
    </div>
  );
}
