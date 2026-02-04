"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon } from "lucide-react"

interface MobileNavProps {
  currentPage?: string
}

export function MobileNav({ currentPage }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/team", label: "About Us" },
    { href: "/industries", label: "Industries" },
    { href: "/contact", label: "Contact" },
    { href: "/apply", label: "Apply" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="text-white hover:bg-gray-800"
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay - Completely solid black */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-100 md:hidden"
          style={{ backgroundColor: "#000000" }}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar - Completely solid black */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-black opacity-100 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#000000" }}
      >
        <div className="flex flex-col h-full bg-black" style={{ backgroundColor: "#000000" }}>
          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 bg-black" style={{ backgroundColor: "#000000" }}>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                      currentPage === item.href
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="p-4 bg-black" style={{ backgroundColor: "#000000" }}>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" onClick={closeMenu}>
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
