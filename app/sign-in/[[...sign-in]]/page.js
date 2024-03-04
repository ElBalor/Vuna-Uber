import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="">
      <Image
        src="/vuna.jpg"
        width={900}
        height={1000}
        alt="background"
        className="object-contain h-full w-full"
      />
      <div className="absolute top-10 right-0 items-center justify-center xl:mt-52 xl:mr-[32rem]">
        <SignIn />
      </div>
    </div>
  );
}
