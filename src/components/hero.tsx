import Link from "next/link";
import React from "react";

function Hero() {
	return (
		<div className="bg-[#F5F5F4] flex items-center justify-center">
			<div className="pt-4 lg:pt-6 pb-4 lg:pb-6 text-black container">
				<div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-flow-row-dense gap-y-4 gap-x-6">
					<div className="lg:col-start-1 lg:col-end-13">
						<div className="relative overflow-hidden rounded-xl">
							<div className="relative">
								<div className="hidden lg:block">
									<video
										src="https://customer-gbu4wsrjcdamtxzc.cloudflarestream.com/2475d0688ab539894985de98161fea67/downloads/default.mp4"
										width="100%"
										height="auto"
										loop={true}
										muted={true}
										preload="auto"
										className="h-full left-0 overflow-hidden top-0 z-0 relative rounded-xl"
										poster="https://customer-gbu4wsrjcdamtxzc.cloudflarestream.com/2475d0688ab539894985de98161fea67/thumbnails/thumbnail.jpg"
										autoPlay
									></video>
								</div>
								<div className="lg:hidden">
									<video
										width="100%"
										height="auto"
										loop={true}
										muted={true}
										preload="auto"
										className="h-full left-0 overflow-hidden top-0 z-0 relative rounded-xl"
										poster="https://customer-gbu4wsrjcdamtxzc.cloudflarestream.com/aa9419a09ec07bc9bfafc2d7f494c2e0/thumbnails/thumbnail.jpg"
										autoPlay
									></video>
								</div>
							</div>

							<div className="flex flex-col lg:grid lg:grid-cols-12 z-20 w-full lg:p-10 lg:container py-8 lg:absolute lg:inset-0 justify-end lg:items-center">
								<div className="flex flex-col lg:col-start-8 lg:col-end-13 lg:text-left lg:items-start">
									<div className="prose lg:prose-lg  lg:max-w-content prose-h1:mb-4 prose-h2:mt-0 prose-h2:mb-2 prose-h3:mt-0 prose-h3:mb-2 prose-h5:mb-2 prose-h6:mb-2 prose-p:m-0 prose-p:leading-normal">
										<span className="hidden lg:block">
											<h3 className="text-4xl">
												<span className="font-framework-pixel">
													Configure once. But
													configure it well ❤.{" "}
												</span>
											</h3>

											<p>
												Laptops are expensive. So
												it&apos;s even better if you can
												configure them yourselves. But
												how about you configure it once
												and it is perfect?
											</p>
										</span>
										<span className="lg:hidden">
											<h3>
												<span className="font-framework-pixel">
													Configure once. Upgrade
													whenever ❤.{" "}
												</span>
											</h3>

											<p>
												Framework Laptop 16 is an
												endlessly customizable laptop
												with upgradeable graphics,
												powered by NVIDIA® GeForce RTX™
												5070 and AMD&apos;s latest
												Ryzen™ AI 300 Series Processors.
											</p>
										</span>
									</div>{" "}
									<div className="flex flex-row flex-wrap mt-8 gap-2">
										<Link
											className="focus:accent-blue whitespace-nowrap flex justify-center items-center transition-colors duration-300 ease-in-out hover:no-underline disabled:cursor-not-allowed font-semibold focus:outline-offset-2 focus:outline-2 focus:outline-accent-blue group rounded-full max-w-max min-w-min bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-pressed no-underline"
											href="/#configure"
										>
											<span className="flex justify-center space-x-3 items-center py-2 px-4 rounded-full group-[.disabled]:invisible group-disabled:invisible">
												<span>
													<span className="lg:hidden">
														Configure now
													</span>
													<span className="hidden lg:inline">
														Configure now
													</span>
												</span>
											</span>
											<span className="hidden absolute spinner group-[.disabled]:flex group-disabled:flex"></span>
										</Link>
										<Link
											className="focus:accent-blue whitespace-nowrap flex justify-center items-center transition-colors duration-300 ease-in-out hover:no-underline disabled:cursor-not-allowed font-semibold focus:outline-offset-2 focus:outline-2 focus:outline-accent-blue group rounded-full max-w-max min-w-min bg-transparent text-on-surface border-on-surface border no-underline"
											href="/#learnmore"
										>
											<span className="flex justify-center space-x-3 items-center py-2 px-4 rounded-full group-[.disabled]:invisible group-disabled:invisible">
												<span>
													<span className="lg:hidden">
														Learn more
													</span>
													<span className="hidden lg:inline">
														Learn more
													</span>
												</span>
											</span>
											<span className="hidden absolute spinner group-[.disabled]:flex group-disabled:flex"></span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
