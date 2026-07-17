import type { TitleUIProps } from "@/app/lib/types";

export default function TitleUI({ onClick, title }: TitleUIProps) {
  return (
    <h1 className="font-extrabold mb-4 scroll-m-20 text-4xl text-balance text-center tracking-tight">
      <button className="cursor-pointer" onClick={onClick} type="button">
        {title}
      </button>
    </h1>
  );
}
