import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { CodeIcon } from "lucide-react";
import { SignedIn, SignInButton, UserButton , SignedOut} from "@clerk/nextjs";
import { DashboardAccessOutSerializer } from "svix/dist/models/dashboardAccessOut";
import { DashboardBtn } from "./DashboardBtn";


function Navbar() {
  return (
    <nav className="border-b bg-gradient-to-r from-purple-800 to-indigo-700 shadow-md dark:from-gray-900 dark:to-gray-800">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-2xl mr-6 font-serif hover:opacity-80 transition-opacity"
        >
          <CodeIcon className="size-8 text-violet-300 dark:text-purple-400" />
          <span className="bg-gradient-to-r from-violet-300 to-purple-200 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-300">
            Interview Platform
          </span>
        </Link>
        

          <SignedIn>

            <div className="flex items-center space-x-4 ml-auto">
                <DashboardBtn/>
                <ModeToggle/>
                <UserButton/>

            </div>
          
        
          </SignedIn>
          

      </div>
    </nav>
  );
}
export default Navbar;
