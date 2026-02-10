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
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0D1B2A]">
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
          className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2 font-space-grotesk"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide transition-colors ${
                isActive(item.href)
                  ? "text-orange-500 font-bold"
                  : "text-white font-normal hover:text-orange-500"
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
            className="text-orange-500 hover:bg-gray-800 hover:text-orange-400 h-12 w-12"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-[#0D1B2A] border-l border-gray-800 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header with Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
              <Image
                src="/images/turbofunding-logo.png"
                alt="TurboFunding Logo"
                width={36}
                height={36}
                className="h-9 w-auto"
              />
              <span className="text-white font-bold text-lg font-space-grotesk">TurboFunding</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              className="text-orange-500 hover:bg-gray-800 hover:text-orange-400"
              aria-label="Close mobile menu"
            >
              <XIcon className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-2 font-space-grotesk">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block py-3 px-4 rounded-lg text-lg tracking-wide transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-600 text-white font-bold"
                        : "text-gray-300 font-normal hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button - hidden on /apply pages */}
          {!pathname.startsWith("/apply") && (
            <div className="p-4">
              <Button asChild className="w-full btn-gold-elite text-white font-semibold" onClick={closeMenu}>
                <Link href="/apply">Apply Now</Link>
              </Button>
            </div>
          )}

          {/* Close Button */}
          <div className="p-4 pt-0">
            <Button
              variant="outline"
              onClick={closeMenu}
              className="w-full border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <XIcon className="h-5 w-5 mr-2" />
              Close Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
