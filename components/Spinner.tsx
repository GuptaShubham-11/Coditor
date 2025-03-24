"use client";

import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-16">
      <Loader2 className="w-8 h-8 text-textL dark:text-textD animate-spin" />
    </div>
  );
}
