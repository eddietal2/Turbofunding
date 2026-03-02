"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon, ChevronDownIcon } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/industries", label: "Industries" },
  { href: "/team", label: "About Us" },
  { href: "/contact", label: "Contact" },
  // { href: "/apply", label: "Apply" },
]

const products = [
  { name: "Working Capital", slug: "working-capital" },
  { name: "Bridge Loan", slug: "bridge-loan" },
  { name: "Business Line of Credit", slug: "business-line-of-credit" },
  { name: "SBA 7a Loans", slug: "sba-7a-loans" },
  { name: "Merchant Cash Advance", slug: "merchant-cash-advance" },
  { name: "SBA 504", slug: "sba-504" },
  { name: "Equipment Financing", slug: "equipment-financing" },
]

const resources = [
  { name: "Loan Calculator", href: "/resources#calculator" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false)
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 w-full border-b border-gray-800 bg-[#0D1B2A]">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 text-xl font-bold tracking-tighter"
          aria-label="TurboFunding.com Home"
        >
          <Image
            src="/images/TF-text-logo.png"
            alt="TurboFunding Logo"
            width={48}
            height={48}
            className="h-5 w-auto bg-transparent"
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
              className={`text-sm tracking-wide transition-colors whitespace-nowrap leading-tight font-semibold ${
                isActive(item.href)
                  ? "text-orange-500"
                  : "text-white hover:text-orange-500"
              }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          {/* Products Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsProductsDropdownOpen(true)}
            onMouseLeave={() => setIsProductsDropdownOpen(false)}
          >
            <button
              className="text-sm tracking-wide transition-colors whitespace-nowrap leading-tight font-semibold text-white hover:text-orange-500 flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={isProductsDropdownOpen}
            >
              Products
              <ChevronDownIcon 
                className={`h-4 w-4 transition-transform duration-200 ${
                  isProductsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 mt-0 w-64 bg-[#0D1B2A] border border-gray-700 rounded-lg shadow-xl overflow-hidden transition-all duration-200 origin-top ${
                isProductsDropdownOpen
                  ? "opacity-100 scale-y-100 pointer-events-auto"
                  : "opacity-0 scale-y-95 pointer-events-none"
              }`}
            >
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products?product=${product.slug}`}
                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-orange-500 hover:text-white transition-colors font-medium border-b border-gray-700 last:border-b-0"
                  onClick={() => setIsProductsDropdownOpen(false)}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsResourcesDropdownOpen(true)}
            onMouseLeave={() => setIsResourcesDropdownOpen(false)}
          >
            <button
              className="text-sm tracking-wide transition-colors whitespace-nowrap leading-tight font-semibold text-white hover:text-orange-500 flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={isResourcesDropdownOpen}
            >
              Resources
              <ChevronDownIcon 
                className={`h-4 w-4 transition-transform duration-200 ${
                  isResourcesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 mt-0 w-64 bg-[#0D1B2A] border border-gray-700 rounded-lg shadow-xl overflow-hidden transition-all duration-200 origin-top ${
                isResourcesDropdownOpen
                  ? "opacity-100 scale-y-100 pointer-events-auto"
                  : "opacity-0 scale-y-95 pointer-events-none"
              }`}
            >
              {resources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-orange-500 hover:text-white transition-colors font-medium border-b border-gray-700 last:border-b-0"
                  onClick={() => setIsResourcesDropdownOpen(false)}
                >
                  {resource.name}
                </Link>
              ))}
            </div>
          </div>
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
                src="/images/TF-text-logo.png"
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
              
              {/* Mobile Products Submenu */}
              <li>
                <button
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-lg tracking-wide transition-colors text-gray-300 font-normal hover:text-white hover:bg-gray-800"
                >
                  <span>Products</span>
                  <ChevronDownIcon 
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isMobileProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
                {/* Products Submenu */}
                {isMobileProductsOpen && (
                  <ul className="mt-2 ml-4 space-y-2 border-l border-gray-700">
                    {products.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/products?product=${product.slug}`}
                          onClick={closeMenu}
                          className="block py-2 px-4 text-lg text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Mobile Resources Submenu */}
              <li>
                <button
                  onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-lg tracking-wide transition-colors text-gray-300 font-normal hover:text-white hover:bg-gray-800"
                >
                  <span>Resources</span>
                  <ChevronDownIcon 
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isMobileResourcesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
                {/* Resources Submenu */}
                {isMobileResourcesOpen && (
                  <ul className="mt-2 ml-4 space-y-2 border-l border-gray-700">
                    {resources.map((resource) => (
                      <li key={resource.href}>
                        <Link
                          href={resource.href}
                          onClick={closeMenu}
                          className="block py-2 px-4 text-lg text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          {resource.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          {/* CTA Button - hidden on /apply pages */}
          {!pathname.startsWith("/apply") && (
            <div className="p-4 space-y-2">
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
