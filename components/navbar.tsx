"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/team", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/apply", label: "Apply" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0D1B2A]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0D1B2A]/70">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 text-xl font-bold tracking-tighter"
          aria-label="TurboFunding.com Home"
        >
          <Image
            src="/images/turbofunding-logo.png"
            alt="TurboFunding Logo"
            width={48}
            height={48}
            className="h-12 w-auto bg-transparent"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-orange-500"
                  : "text-white hover:text-orange-500"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA - hidden on /apply pages */}
        {!pathname.startsWith("/apply") && (
          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="btn-gold-elite text-white font-semibold">
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        )}

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
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-[#0D1B2A]/90 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              className="text-white hover:bg-gray-800"
              aria-label="Close mobile menu"
            >
              <XIcon className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-2">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                      isActive(item.href)
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
          <div className="p-4">
            <Button asChild className="w-full btn-gold-elite text-white font-semibold" onClick={closeMenu}>
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
