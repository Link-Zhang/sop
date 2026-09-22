"use client";

import { Button } from "@/shadcn/components/ui/button";

type TitleProps = {
  onClick?: () => void;
  title: string;
};

export default function Title({ onClick, title }: TitleProps) {
  if (!onClick) {
    return <h1 className="font-bold text-4xl text-center">{title}</h1>;
  }

  return (
    <Button
      className="cursor-pointer font-bold text-4xl"
      onClick={onClick}
      variant="ghost"
    >
      {title}
    </Button>
  );
}
