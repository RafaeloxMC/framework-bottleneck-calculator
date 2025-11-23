import Link from "next/link";
import React from "react";

function Footer() {
	return (
		<div className="w-full h-full p-8">
			<div className="flex flex-row gap-4 items-center justify-center">
				<div className="flex flex-col">
					<h1 className="font-framework-pixel font-extrabold">
						Framework
					</h1>
					<h1 className="font-framework-pixel font-extrabold">
						Bottleneck Calculator
					</h1>
				</div>
				<div className="border w-px h-10" />
				<span>made with ❤️ by @xvcf</span>
				<div className="border w-px h-10" />
				<Link
					href={
						"https://github.com/RafaeloxMC/framework-bottleneck-calculator"
					}
				>
					Source
				</Link>
			</div>
		</div>
	);
}

export default Footer;
