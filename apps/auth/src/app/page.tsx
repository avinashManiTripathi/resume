"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { StepLoader } from "@repo/ui/step-loader";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const currentparams = encodeURIComponent(window.location.search);
    router.push(`/signin?${currentparams}`);
  }, [router]);
  return (
    <StepLoader
      loading={true}
      message="Redirecting..."
      subMessage="Please wait a moment..."
      logoSrc="/logo.png"
      fullScreen={true}
    />
  );
}
