"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className="w-full bg-white shadow-sm shadow-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="shrink-0">
						<Link
							aria-label="Framework homepage"
							title="Framework Home"
							className="navbar-logo-link"
							href="/"
						>
							<Image
								alt="Framework logo"
								width={160}
								height={21}
								className="filter brightness-0 h-6 w-auto"
								src="/logo-c1ae78bbc66fed63092c4b9c39c0258f27ab7e2938efc03883bb1a5c73f1a632.svg"
							/>
						</Link>
					</div>

					<div className="hidden lg:flex lg:items-center lg:space-x-1">
						<div className="flex items-center space-x-1">
							<Link
								href="https://frame.work/desktop"
								className="navbar-link"
							>
								Desktop
							</Link>
							<Link
								href="https://frame.work/laptop12"
								className="navbar-link"
							>
								Laptop 12
							</Link>
							<Link
								href="https://frame.work/laptop13"
								className="navbar-link"
							>
								Laptop 13
							</Link>
							<Link
								href="https://frame.work/laptop16"
								className="navbar-link"
							>
								Laptop 16
							</Link>
						</div>

						<div className="h-6 w-px bg-gray-300 mx-2"></div>

						<div className="flex items-center space-x-1">
							<Link href="/about" className="navbar-link">
								About
							</Link>
						</div>
					</div>

					<div className="lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="navbar-menu-button"
							aria-expanded={mobileMenuOpen}
							aria-label="Toggle menu"
						>
							<span className="sr-only">Open main menu</span>
							{!mobileMenuOpen ? (
								<Menu className="h-6 w-6" />
							) : (
								<X className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			{mobileMenuOpen && (
				<div className="lg:hidden border-t border-gray-200">
					<div className="px-2 pt-2 pb-3 space-y-1">
						<Link
							href="/desktop"
							className="navbar-mobile-link"
							onClick={() => setMobileMenuOpen(false)}
						>
							Desktop
						</Link>
						<Link
							href="/laptop12"
							className="navbar-mobile-link"
							onClick={() => setMobileMenuOpen(false)}
						>
							Laptop 12
						</Link>
						<Link
							href="/laptop13"
							className="navbar-mobile-link"
							onClick={() => setMobileMenuOpen(false)}
						>
							Laptop 13
						</Link>
						<Link
							href="/laptop16"
							className="navbar-mobile-link"
							onClick={() => setMobileMenuOpen(false)}
						>
							Laptop 16
						</Link>
						<div className="border-t border-gray-200 my-2"></div>
						<Link
							href="/about"
							className="navbar-mobile-link"
							onClick={() => setMobileMenuOpen(false)}
						>
							About
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}

export default Navbar;
