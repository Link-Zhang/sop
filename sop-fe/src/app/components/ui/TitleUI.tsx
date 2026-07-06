export default function TitleUI({ title }: { title: string }) {
  return (
    <h1 className="font-extrabold mb-4 scroll-m-20 text-4xl text-balance text-center tracking-tight">
      {title}
    </h1>
  );
}
