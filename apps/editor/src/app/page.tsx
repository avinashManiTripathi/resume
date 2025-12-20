"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDebounce } from "@repo/utils-client";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button"
import { HtmlEditor } from "@repo/ui/html-editor";
import {
  Download, LayoutGrid, Share2, Undo, Redo
} from "lucide-react";

export default function ResumeLayout() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [name, setName] = useState("sds");
  const debouncedName = useDebounce(name, 500);

  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  const renderTaskRef = useRef<any>(null);
  const requestIdRef = useRef(0);

  const renderPdf = async () => {
    if (!mainRef.current) return;

    const requestId = ++requestIdRef.current;

    const res = await fetch(`${API_BASE}/convert-html-to-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName: debouncedName }),
    });

    if (requestId !== requestIdRef.current) return;

    const pdfData = await res.arrayBuffer();
    const pdfjsLib = (window as any).pdfjsLib;

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const page = await pdf.getPage(1);

    const containerWidth = mainRef.current.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / baseViewport.width;
    const viewport = page.getViewport({ scale });

    const offscreen =
      offscreenRef.current ?? document.createElement("canvas");
    offscreenRef.current = offscreen;

    offscreen.width = viewport.width * dpr;
    offscreen.height = viewport.height * dpr;

    const offCtx = offscreen.getContext("2d")!;
    offCtx.setTransform(1, 0, 0, 1, 0, 0);
    offCtx.scale(dpr, dpr);

    if (renderTaskRef.current) renderTaskRef.current.cancel();

    renderTaskRef.current = page.render({
      canvasContext: offCtx,
      viewport,
    });

    await renderTaskRef.current.promise;
    if (requestId !== requestIdRef.current) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = offscreen.width;
    canvas.height = offscreen.height;

    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(offscreen, 0, 0);
  };

  useEffect(() => {
    renderPdf();
  }, [debouncedName]);

  useLayoutEffect(() => {
    const onResize = () => renderPdf();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Header */}
      <header className="flex gap-2 h-24 p-2">
        {/* Left Box */}
        <div className="flex flex-shrink-0 items-center w-full lg:w-[500px] bg-white border border-gray-200 rounded p-3">
          <div className="font-bold text-lg truncate">
            {name || "John Doe"}’s Resume
          </div>
        </div>

        {/* Right Box */}
        <div className="flex items-center justify-between w-full bg-white border border-gray-200 rounded p-2">
          {/* Undo/Redo Icons */}
          <div className="flex gap-2">
            <Undo size={18} />
            <Redo size={18} />
          </div>

          {/* Share / Download Buttons */}
          <div className="flex gap-2">
            <Button>
              <div className="flex items-center gap-2">
                <Share2 size={18} /> Share
              </div>
            </Button>
            <Button variant="primary">
              <div className="flex items-center gap-2">
                <Download size={18} /> Download
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden gap-2 m-[10px]">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-[500px] bg-white border-r p-4 overflow-y-auto rounded-lg">
          <div className="space-y-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type=""
              name=""
            />
          </div>
          <div className="mt-4">
            <HtmlEditor value={name} name="name" />
          </div>
        </aside>

        {/* Main Canvas */}
        <main ref={mainRef} className="flex-1 overflow-y-auto flex justify-center py-8">
          <canvas ref={canvasRef} />
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:flex w-[250px] flex-col bg-white border-l p-4 rounded-lg items-center gap-2">
          <Button>
            <div className="flex items-center gap-2">
              <LayoutGrid size={18} /> Change Template
            </div>
          </Button>
        </aside>
      </div>
    </div>
  );
}
