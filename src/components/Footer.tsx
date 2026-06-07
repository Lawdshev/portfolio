import { Heart } from "lucide-react";

export default function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:px-6">
        <p>© {year} {name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
