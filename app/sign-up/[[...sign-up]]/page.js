import { SignUp } from "@clerk/nextjs";

import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Image
        src="/Veritas-treet.jpg"
        width={900}
        height={1000}
        alt="background"
        className="object-contain h-full w-full"
      />
      <div className="absolute top-10 right-0 items-center justify-center">
        <SignUp />
      </div>
    </div>
  );
}
