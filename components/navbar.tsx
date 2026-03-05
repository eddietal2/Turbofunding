"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon, ChevronDownIcon, PhoneCall } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
]

const industries = [
  { name: "All Industries", href: "/industries" },
  { name: "Technology", href: "/industries" },
  { name: "Retail", href: "/industries" },
  { name: "Healthcare", href: "/industries" },
  { name: "Manufacturing", href: "/industries" },
  { name: "Professional Services", href: "/industries" },
]

const products = [
  { name: "Term Loans", slug: "term-loan" },
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
  const [isIndustriesDropdownOpen, setIsIndustriesDropdownOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false)
  const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = "unset"
      document.body.style.overflow = "unset"
    }
    return () => {
      document.documentElement.style.overflow = "unset"
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

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
            src="/images/TF-logo-text.png"
            alt="TurboFunding Logo"
            width={48}
            height={48}
            className="h-5 w-auto bg-transparent"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2 font-space-grotesk"
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
            className="relative group inline-flex items-center"
            onMouseEnter={() => setIsProductsDropdownOpen(true)}
            onMouseLeave={() => setIsProductsDropdownOpen(false)}
          >
            <Link
              href={`/products?product=${products[0].slug}`}
              className={`text-sm tracking-wide transition-colors whitespace-nowrap leading-tight font-semibold ${
                isActive("/products")
                  ? "text-orange-500"
                  : "text-white hover:text-orange-500"
              }`}
            >
              Products
            </Link>

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

          {/* Industries Dropdown */}
          <div
            className="relative group inline-flex items-center"
            onMouseEnter={() => setIsIndustriesDropdownOpen(true)}
            onMouseLeave={() => setIsIndustriesDropdownOpen(false)}
          >
            <Link
              href={industries[0].href}
              className={`text-sm tracking-wide transition-colors whitespace-nowrap leading-tight font-semibold ${
                isActive("/industries")
                  ? "text-orange-500"
                  : "text-white hover:text-orange-500"
              }`}
            >
              Industries
            </Link>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 mt-0 w-64 bg-[#0D1B2A] border border-gray-700 rounded-lg shadow-xl overflow-hidden transition-all duration-200 origin-top ${
                isIndustriesDropdownOpen
                  ? "opacity-100 scale-y-100 pointer-events-auto"
                  : "opacity-0 scale-y-95 pointer-events-none"
              }`}
            >
              {industries.map((industry, index) => (
                <Link
                  key={index}
                  href={industry.href}
                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-orange-500 hover:text-white transition-colors font-medium border-b border-gray-700 last:border-b-0"
                  onClick={() => setIsIndustriesDropdownOpen(false)}
                >
                  {industry.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative group inline-flex items-center"
            onMouseEnter={() => setIsResourcesDropdownOpen(true)}
            onMouseLeave={() => setIsResourcesDropdownOpen(false)}
          >
            <Link
              href={resources[0].href}
              className={`text-sm tracking-wide transition-colors whitespace-nowrap leading-tight font-semibold ${
                isActive("/resources")
                  ? "text-orange-500"
                  : "text-white hover:text-orange-500"
              }`}
            >
              Resources
            </Link>

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

          {/* About Us Link */}
          <Link
            href="/team"
            className={`text-sm tracking-wide transition-colors whitespace-nowrap leading-tight font-semibold ${
              isActive("/team")
                ? "text-orange-500"
                : "text-white hover:text-orange-500"
            }`}
            aria-current={isActive("/team") ? "page" : undefined}
          >
            About Us
          </Link>

          {/* Contact Link */}
          <Link
            href="/contact"
            className={`text-sm tracking-wide transition-colors whitespace-nowrap leading-tight font-semibold ${
              isActive("/contact")
                ? "text-orange-500"
                : "text-white hover:text-orange-500"
            }`}
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA - hidden on /apply pages */}
        {!pathname.startsWith("/apply") && (
          <div className="hidden lg:flex items-center gap-4">
            <Button asChild className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold flex items-center gap-2">
              <a href="tel:(937)-751-6937">
                <PhoneCall className="w-4 h-4" />
                (937)-751-6937
              </a>
            </Button>
            <Button asChild className="btn-gold-elite text-white font-semibold">
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
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
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#0D1B2A] border-l border-gray-800 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header with Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link href="/" onClick={closeMenu} className="flex items-center">
              <Image
                src="/images/tf-logo.png"
                alt="TurboFunding Logo"
                width={60}
                height={48}
              />
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
          <nav className="flex-1 overflow-y-auto px-4 py-2 font-space-grotesk">
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
                <div className="flex items-center justify-between py-3 px-4 rounded-lg">
                  <Link
                    href={`/products?product=${products[0].slug}`}
                    onClick={closeMenu}
                    className={`flex-1 text-lg tracking-wide transition-colors font-normal ${
                      isActive("/products")
                        ? "text-orange-500"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Products
                  </Link>
                  <button
                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                    className="p-2 hover:bg-gray-800 rounded transition-colors"
                    aria-label="Toggle products submenu"
                  >
                    <ChevronDownIcon 
                      className={`h-5 w-5 transition-transform duration-200 flex-shrink-0 ${
                        isMobileProductsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                
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

              {/* Mobile Industries Submenu */}
              {/* Mobile Industries Submenu */}
              <li>
                <div className="flex items-center justify-between py-3 px-4 rounded-lg">
                  <Link
                    href={industries[0].href}
                    onClick={closeMenu}
                    className={`flex-1 text-lg tracking-wide transition-colors font-normal ${
                      isActive("/industries")
                        ? "text-orange-500"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Industries
                  </Link>
                  <button
                    onClick={() => setIsMobileIndustriesOpen(!isMobileIndustriesOpen)}
                    className="p-2 hover:bg-gray-800 rounded transition-colors"
                    aria-label="Toggle industries submenu"
                  >
                    <ChevronDownIcon 
                      className={`h-5 w-5 transition-transform duration-200 flex-shrink-0 ${
                        isMobileIndustriesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                
                {/* Industries Submenu */}
                {isMobileIndustriesOpen && (
                  <ul className="mt-2 ml-4 space-y-2 border-l border-gray-700">
                    {industries.map((industry, index) => (
                      <li key={index}>
                        <Link
                          href={industry.href}
                          onClick={closeMenu}
                          className="block py-2 px-4 text-lg text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          {industry.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Mobile Resources Submenu */}
              <li>
                <div className="flex items-center justify-between py-3 px-4 rounded-lg">
                  <Link
                    href={resources[0].href}
                    onClick={closeMenu}
                    className={`flex-1 text-lg tracking-wide transition-colors font-normal ${
                      isActive("/resources")
                        ? "text-orange-500"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Resources
                  </Link>
                  <button
                    onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                    className="p-2 hover:bg-gray-800 rounded transition-colors"
                    aria-label="Toggle resources submenu"
                  >
                    <ChevronDownIcon 
                      className={`h-5 w-5 transition-transform duration-200 flex-shrink-0 ${
                        isMobileResourcesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                
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

              {/* Mobile Contact Link */}
              <li>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className={`block py-3 px-4 rounded-lg text-lg tracking-wide transition-colors ${
                    isActive("/contact")
                      ? "bg-blue-600 text-white font-bold"
                      : "text-gray-300 font-normal hover:text-white hover:bg-gray-800"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* CTA Button - hidden on /apply pages */}
          {!pathname.startsWith("/apply") && (
            <div className="p-4 space-y-2">
              <Button asChild className="w-full bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold flex items-center justify-center gap-2" onClick={closeMenu}>
                <a href="tel:(937)-751-6937" className="flex items-center justify-center gap-2 w-full">
                  <PhoneCall className="w-4 h-4" />
                  (937)-751-6937
                </a>
              </Button>
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
