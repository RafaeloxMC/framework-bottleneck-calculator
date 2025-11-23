import Configure from "@/components/configure";
import Hero from "@/components/hero";
import LearnMore from "@/components/learn-more";

export default function Home() {
	return (
		<div className="bg-white min-w-screen min-h-screen">
			<main>
				<Hero />
				<LearnMore />
				<Configure />
			</main>
		</div>
	);
}
