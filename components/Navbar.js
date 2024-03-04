import { UserButton } from "@clerk/nextjs";
import { PiStudentBold } from "react-icons/pi";
import { FaCarAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const navMenu = [
    {
      id: 1,
      name: "Ride",
      icon: "",
    },
    {
      id: 2,
      name: "Students",
      icon: "",
    },
  ];
  return (
    <div className="p-4 pb-3 pl-10 xl:border-b-[3px] border-gray-300 mt-2 flex items-center justify-between xl:rounded-full border-[2px] rounded-full">
      <div className="flex gap-16 items-center">
        <Link
          href="https://admissions.veritas.edu.ng/students/login"
          className="hover:cursor-pointer hover:scale-75 duration-300 delay-75"
          target="_blank"
        >
          <Image src="/logo.png" width={50} height={50} alt="logo" />
        </Link>
        {/* <div className="flex gap-6 items-center">
          {navMenu.map((item) => (
            <div className="flex gap-2 items-center">
              <Image src={item.icon} width={17} height={17} />
              <h2 className="text-[14px] font-medium">{item.name}</h2>
            </div>
          ))}
        </div> */}
        <div className="flex gap-6 items-center">
          <div className=" flex gap-2 justify-center">
            <PiStudentBold className="text-2xl" />
            <p>Students</p>
          </div>
          <div className=" flex flex-1 items-center justify-center gap-2">
            <FaCarAlt className="text-2xl" />
            <p>Keke</p>
          </div>
        </div>
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
