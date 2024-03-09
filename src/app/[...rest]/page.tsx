"use client";
import { PageProps } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function NotFound({ params }: PageProps) {
  const router = useRouter();

  return (
    <>
      <p>{`Not found ${params.rest}`}</p>
      <div className="flex justify-center gap-3">
        <button onClick={router.back}>back</button>
      </div>
    </>
  );
}
