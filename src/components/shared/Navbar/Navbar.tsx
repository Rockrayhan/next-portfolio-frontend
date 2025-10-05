"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-50  shadow-md sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link href="/" className="text-3xl font-bold text-indigo-600">
            MyPortfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 font-semibold">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#blogs" className="hover:text-blue-600 transition">Blogs</a>
            <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
            <Link href="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="flex flex-col space-y-3 p-4">
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-blue-600">Home</Link>
            <Link href="/blogs" onClick={() => setOpen(false)} className="hover:text-blue-600">Blogs</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="hover:text-blue-600">About</Link>
            <Link href="/projects" onClick={() => setOpen(false)} className="hover:text-blue-600">Projects</Link>
            <Link href="/dashboard" onClick={() => setOpen(false)} className="hover:text-blue-600">Dashboard</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
