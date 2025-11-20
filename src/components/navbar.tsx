import Image from "next/image";
import Link from "next/link";

function Navbar() {
	return (
		<div
			className="max-sm:container sm:px-6 md:px-10 xl:px-0 h-12 xl:h-16 flex
      justify-between items-center lg:text-sm text-black"
		>
			<div className="md:px-10">
				<div className="w-40 h-6" data-nosnippet="">
					<Link
						aria-label="Framework homepage"
						title="Framework Home"
						className="focus:accent-blue active:text-primary-pressed disabled:utility-outline-disabled focus:text-primary-pressed hover:text-primary-hover text-on-surface underline"
						href="/"
					>
						<Image
							alt="Framework logo"
							width={160}
							height={21}
							className="filter brightness-0"
							src="/logo-c1ae78bbc66fed63092c4b9c39c0258f27ab7e2938efc03883bb1a5c73f1a632.svg"
						/>
					</Link>
				</div>
			</div>
			<div className="hidden xl:flex h-full w-full md:px-4">
				<div className="hidden w-full h-full my-auto lg:flex justify-between">
					<div className="lg:flex">
						<nav className="hero-component hidden lg:flex group">
							<span className="xl:flex xl:items-center xl:px-3 h-full font-medium group-focus-within:text-primary">
								<a
									className="focus:accent-blue cursor-pointer xl:link-hover primary-on-hover group-hover:text-primary hover:no-underline flex h-full items-center"
									aria-label="Framework Desktop"
									aria-hidden="true"
									href="/desktop"
								>
									Desktop
								</a>
							</span>
						</nav>

						<nav className="hero-component hidden lg:flex group">
							<span className="xl:flex xl:items-center xl:px-3 h-full font-medium group-focus-within:text-primary">
								<a
									className="focus:accent-blue cursor-pointer xl:link-hover primary-on-hover group-hover:text-primary hover:no-underline flex h-full items-center"
									aria-label="Framework Laptop 12"
									aria-hidden="true"
									href="/laptop12"
								>
									Laptop 12
								</a>
							</span>
						</nav>

						<nav className="hero-component hidden lg:flex group">
							<span className="xl:flex xl:items-center xl:px-3 h-full font-medium group-focus-within:text-primary">
								<a
									className="focus:accent-blue cursor-pointer xl:link-hover primary-on-hover group-hover:text-primary hover:no-underline flex h-full items-center"
									aria-label="Framework Laptop 13"
									aria-hidden="true"
									href="/laptop13"
								>
									Laptop 13
								</a>
							</span>
						</nav>

						<nav className="hero-component hidden lg:flex group">
							<span className="xl:flex xl:items-center xl:px-3 h-full font-medium group-focus-within:text-primary">
								<a
									className="focus:accent-blue cursor-pointer xl:link-hover primary-on-hover group-hover:text-primary hover:no-underline flex h-full items-center"
									aria-label="Framework Laptop 16"
									aria-hidden="true"
									href="/laptop16"
								>
									Laptop 16
								</a>
							</span>
						</nav>
					</div>
					<div className="lg:flex">
						<nav className="dropdown-component hidden lg:flex group">
							<span className="xl:flex xl:items-center xl:px-3 h-full font-medium group-focus-within:text-primary">
								<a
									className="focus:accent-blue cursor-pointer xl:link-hover primary-on-hover group-hover:text-primary hover:no-underline flex h-full items-center"
									aria-label="Support"
									aria-hidden="true"
									href="/support"
								>
									Support
								</a>
							</span>
						</nav>

						<span className="xl:flex xl:items-center xl:px-3 h-full font-medium focus-within:text-primary">
							<a
								className="focus:accent-blue cursor-pointer xl:link-hover primary-on-hover group-hover:text-primary hover:no-underline flex h-full items-center"
								aria-label="Framework for Business"
								href="/framework-for-business"
							>
								For Business
							</a>
						</span>
						<nav className="dropdown-component hidden lg:flex group">
							<span className="xl:flex xl:items-center xl:px-3 h-full font-medium group-focus-within:text-primary">
								<a
									className="focus:accent-blue cursor-pointer xl:link-hover primary-on-hover group-hover:text-primary hover:no-underline flex h-full items-center"
									aria-label="About Framework"
									aria-hidden="true"
									href="/about"
								>
									About
								</a>
							</span>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
