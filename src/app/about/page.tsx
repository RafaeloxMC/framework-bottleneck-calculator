import About from "@/components/about";
import Hero from "@/components/hero";

function AboutPage() {
	return (
		<div className="bg-white min-w-screen min-h-screen">
			<main>
				<Hero />
				<About />
			</main>
		</div>
	);
}

export default AboutPage;
