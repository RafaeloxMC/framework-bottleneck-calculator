import React from "react";

function LearnMore() {
	return (
		<div
			className="bg-[#F5F5F4] flex items-center justify-center"
			id="learnmore"
		>
			<div className="pt-12 lg:pt-16 pb-12 lg:pb-16 text-black container">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-6">
					<div className="lg:col-start-1 lg:col-end-13">
						<div className="prose lg:prose-xl max-w-none prose-h1:mb-6 prose-p:mt-4 prose-p:leading-relaxed">
							<h1 className="font-framework-pixel text-4xl lg:text-6xl">
								Upgrade, customize, and repair.
							</h1>
							<p className="text-lg lg:text-xl text-gray-700 mt-2">
								A purchase of a laptop can be expensive. This is
								why it is so important to have a good
								configuration. Framework Bottleneck Calculator
								will help you with your configuration and
								recommend changes to you.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LearnMore;
