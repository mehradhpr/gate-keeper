'use client';
import React from 'react';
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";

function Error({error, reset}: { error: Error, reset: () => void }) {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased h-screen w-screen flex items-center")}>
      <div className="container flex flex-col md:flex-row items-center justify-center px-5">
        <div className="max-w-md space-y-4">
          <div className="text-5xl font-dark font-bold">404 Page Not Found</div>
          <Link href={"/employee"}>
            <Button variant={'outline'}>back to homepage</Button>
          </Link>
        </div>
        <div className="max-w-lg">
          <Image
            src="/cat.svg"
            alt="404"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}

export default Error;
