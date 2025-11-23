import React from "react";

function About() {
	return (
		<div
			className="bg-white flex items-center justify-center"
			id="learnmore"
		>
			<div className="pt-12 lg:pt-16 pb-12 lg:pb-16 text-black container">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-6">
					<div className="lg:col-start-1 lg:col-end-13">
						<div className="prose lg:prose-xl max-w-none prose-h1:mb-6 prose-p:mt-4 prose-p:leading-relaxed">
							<h1 className="font-framework-pixel text-4xl lg:text-6xl">
								More information
							</h1>
							<p className="text-lg lg:text-xl text-gray-700 mt-2">
								First of all, welcome! This is a Framework
								Bottleneck Calculator made by @xvcf. This site
								mainly aims to give you the best possible
								Framework Laptop configuration for your money,
								so you don&apos;t regret your purchases. I made
								this site for Siege by Hackclub, an event where
								you ship 10 hours of code per week and get a
								Framework Laptop in the end!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
