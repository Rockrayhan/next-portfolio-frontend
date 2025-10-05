"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, LogOut, LayoutDashboard, TableOfContents } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const session = useSession();
  // console.log(session);

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-black text-white">
      {/* Top navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <Home className="h-4 w-4" />
          Home Page
        </Link>


        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <LayoutDashboard className="h-4 w-4"/>
          Dashboard
        </Link>


        <Link
          href="/dashboard/manage-all-blogs"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <TableOfContents className="h-4 w-4"/>
          Manage All Blogs
        </Link>



        <Link
          href="/dashboard/manage-all-projects"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <TableOfContents className="h-4 w-4"/>
          Manage All Projects
        </Link>
      </nav>

      {/* Bottom action */}
      {session.status === "authenticated" && (
        <div className="p-4 border-t border-gray-500">
          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </aside>
  );
}
