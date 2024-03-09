"use client";
import { ErrorPageProps } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }: ErrorPageProps) {
  const router = useRouter();
  console.error(error);

  return (
    <>
      <p>Internal Error</p>
      <div className="flex justify-center gap-3">
        <button onClick={router.back}>back</button>
        <button onClick={reset}>reset</button>
      </div>
    </>
  );
}
