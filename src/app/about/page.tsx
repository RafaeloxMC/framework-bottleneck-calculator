import About from "@/components/about";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

function AboutPage() {
	return (
		<div className="bg-white min-w-screen min-h-screen">
			<header className="z-60 sticky inset-0 header-primary border-b bg-surface border-utility-outline-mild">
				<Navbar />
			</header>
			<main>
				<Hero />
				<About />
			</main>
		</div>
	);
}

export default AboutPage;
