import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
	return (
		<div className="bg-white min-w-screen min-h-screen">
			<header className="z-60 sticky inset-0 header-primary border-b bg-surface border-utility-outline-mild">
				<Navbar />
			</header>
			<main>
				<Hero />
			</main>
		</div>
	);
}
