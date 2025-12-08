"use client"
import Image from "next/image";

import { Input } from "@repo/ui/input";
import { useState } from "react";

export default function Home() {
  const [html, setHtml] = useState("");
    return (
     <div>
      <Input
        type="text"
        name="html"
        placeholder="Enter your name"
        value={html}
        className="border border-[var(--input-border)] rounded h-[52px] w-full bg-[var(--input-bg)] text-[var(--input-text)]"
        onChange={(e) => setHtml(e.target.value)}
      />
    </div>
  );
}
