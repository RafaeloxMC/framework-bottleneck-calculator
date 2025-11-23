"use client";
import { ConfigType } from "@/util/types";
import { useEffect, useState } from "react";
import { analyzeBottlenecks } from "@/util/bottleneckCalculator";

const INITIAL_OPTIONS = {
	cpu: 0,
	display: 0,
	expansion_bay: 0,
	ram: 0,
	primary_storage: 0,
	secondary_storage: 0,
	os: 0,
	power_adapter: 0,
};

function Configure() {
	const [configData, setConfigData] = useState<ConfigType | null>(null);
	const [selectedModel, setSelectedModel] = useState("16");
	const [selectedConfig, setSelectedConfig] = useState(0);
	const [selectedOptions, setSelectedOptions] = useState(INITIAL_OPTIONS);

	useEffect(() => {
		fetch("/data/configs.json")
			.then((res) => res.json())
			.then((data) => setConfigData(data))
			.catch((err) => console.error("Failed to load configs:", err));
	}, []);

	if (!configData) {
		return (
			<div
				className="bg-[#F5F5F4] flex items-center justify-center"
				id="configure"
			>
				<div className="pt-12 lg:pt-16 pb-12 lg:pb-16 text-black container">
					<span className="text-center">
						Loading configurations...
					</span>
				</div>
			</div>
		);
	}

	const currentModelConfigs = configData[selectedModel];
	const currentConfig = currentModelConfigs?.[selectedConfig];

	const bottleneckWarnings = currentConfig
		? analyzeBottlenecks(currentConfig, selectedOptions)
		: [];

	const calculateTotal = () => {
		if (!currentConfig) return 0;

		const components = [
			currentConfig.cpu?.[selectedOptions.cpu],
			currentConfig.display?.[selectedOptions.display],
			currentConfig.expansion_bay?.[selectedOptions.expansion_bay],
			currentConfig.ram[selectedOptions.ram],
			currentConfig.primary_storage[selectedOptions.primary_storage],
			currentConfig.secondary_storage?.[
				selectedOptions.secondary_storage
			],
			currentConfig.os[selectedOptions.os],
			currentConfig.power_adapter[selectedOptions.power_adapter],
		];

		return (
			currentConfig.price +
			components.reduce((sum, comp) => sum + (comp?.price ?? 0), 0)
		);
	};

	type Option = Record<string, string | number | undefined>;

	const renderSelectField = (
		label: string,
		options: Option[],
		selectedIndex: number,
		onChange: (index: number) => void
	) => (
		<div className="mb-6">
			<label className="block text-2xl font-semibold text-gray-900 mb-3">
				{label}
			</label>
			<div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{options.map((option, index) => {
					const isSelected = selectedIndex === index;
					return (
						<button
							key={index}
							onClick={() => onChange(index)}
							className={`p-4 border-2 rounded-lg text-left transition-all flex flex-col justify-end ${
								isSelected
									? "border-orange-500 bg-orange-50 shadow-md"
									: "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
							}`}
						>
							<h3 className="font-bold text-lg mb-2 text-gray-900">
								{option.name || "Option"}
							</h3>
							<div className="text-sm text-gray-600 space-y-1">
								{option.cores && (
									<div>Cores: {option.cores}</div>
								)}
								{option.speed && (
									<div>Up to {option.speed}GHz</div>
								)}
								{option.resolution && (
									<div>{option.resolution}px</div>
								)}
								{option.refresh_rate && (
									<div>{option.refresh_rate}Hz</div>
								)}
								{option.vram && Number(option.vram) > 0 && (
									<div>
										{option.vram}GB {option.vram_technology}
									</div>
								)}
								{option.size && Number(option.size) > 0 && (
									<div>Capacity: {option.size}GB</div>
								)}
								{option.technology && option.frequency && (
									<div>
										{option.technology} {option.frequency}
										MHz
									</div>
								)}
								{option.kit && <div>{option.kit}GB</div>}
								{option.watts && Number(option.watts) > 0 && (
									<div>{option.watts}W</div>
								)}
							</div>
							<div className="pt-3 border-t border-gray-200 mt-2 sticky bottom-0">
								<span
									className={`font-semibold font-framework-pixel ${
										isSelected
											? "text-orange-600"
											: "text-gray-900"
									}`}
								>
									{Number(option.price) > 0
										? `+€${option.price}`
										: "Included"}
								</span>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);

	return (
		<div
			className="bg-[#F5F5F4] flex items-center justify-center"
			id="configure"
		>
			<div className="pt-12 lg:pt-16 pb-12 lg:pb-16 text-black container">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					<div className="lg:col-start-1 lg:col-end-13">
						<div className="mb-8">
							<h2 className="font-framework-pixel text-4xl lg:text-5xl mb-4">
								Configure your Framework Laptop
							</h2>
							<p className="text-lg text-gray-700">
								Choose your model and customize your
								configuration
							</p>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="bg-white rounded-xl p-6 shadow-sm">
								<h3 className="font-semibold text-xl mb-4">
									Select Model
								</h3>
								<div className="space-y-3">
									{Object.keys(configData).map((model) => (
										<button
											key={model}
											onClick={() => {
												setSelectedModel(model);
												setSelectedConfig(0);
												setSelectedOptions(
													INITIAL_OPTIONS
												);
											}}
											className={`w-full px-4 py-3 rounded-lg font-medium transition-colors border-2 shadow-md ${
												selectedModel === model
													? "border-orange-500 bg-orange-50"
													: "border-gray-100 hover:bg-gray-100"
											}`}
										>
											Framework Laptop {model}
										</button>
									))}
								</div>

								{currentModelConfigs &&
									currentModelConfigs.length > 1 && (
										<div className="mt-6">
											<h4 className="font-semibold text-sm mb-3">
												Processor Series
											</h4>
											<div className="space-y-2">
												{currentModelConfigs.map(
													(config, index) => (
														<button
															key={index}
															onClick={() => {
																setSelectedConfig(
																	index
																);
																setSelectedOptions(
																	INITIAL_OPTIONS
																);
															}}
															className={`w-full px-4 py-3 rounded-lg font-medium transition-colors border-2 shadow-md ${
																selectedConfig ===
																index
																	? "border-orange-500 bg-orange-50"
																	: "border-gray-100 hover:bg-gray-100"
															}`}
														>
															{config.name}
														</button>
													)
												)}
											</div>
										</div>
									)}
							</div>

							<div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
								<h3 className="font-semibold text-xl mb-6">
									Customize Configuration
								</h3>

								{currentConfig && (
									<div>
										{currentConfig.cpu &&
											renderSelectField(
												"Processor",
												currentConfig.cpu,
												selectedOptions.cpu,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														cpu: index,
													})
											)}

										{currentConfig.display &&
											renderSelectField(
												"Display",
												currentConfig.display,
												selectedOptions.display,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														display: index,
													})
											)}

										{currentConfig.expansion_bay &&
											renderSelectField(
												"Expansion Bay",
												currentConfig.expansion_bay,
												selectedOptions.expansion_bay,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														expansion_bay: index,
													})
											)}

										{currentConfig.ram &&
											renderSelectField(
												"Memory (RAM)",
												currentConfig.ram,
												selectedOptions.ram,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														ram: index,
													})
											)}

										{currentConfig.primary_storage &&
											renderSelectField(
												"Primary Storage",
												currentConfig.primary_storage,
												selectedOptions.primary_storage,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														primary_storage: index,
													})
											)}

										{currentConfig.secondary_storage &&
											currentConfig.secondary_storage
												.length > 0 &&
											renderSelectField(
												"Secondary Storage",
												currentConfig.secondary_storage,
												selectedOptions.secondary_storage,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														secondary_storage:
															index,
													})
											)}

										{currentConfig.os &&
											renderSelectField(
												"Operating System",
												currentConfig.os,
												selectedOptions.os,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														os: index,
													})
											)}

										{currentConfig.power_adapter &&
											renderSelectField(
												"Power Adapter",
												currentConfig.power_adapter,
												selectedOptions.power_adapter,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														power_adapter: index,
													})
											)}

										{bottleneckWarnings.length > 0 && (
											<div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
												<h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
													Configuration Analysis
												</h4>
												<div className="space-y-2">
													{bottleneckWarnings.map(
														(warning, index) => (
															<div
																key={index}
																className={`p-3 rounded-lg border shadow ${
																	warning.type ===
																	"error"
																		? "bg-red-50 border-red-500 shadow-red-500"
																		: warning.type ===
																		  "warning"
																		? "bg-yellow-50 border-yellow-500 shadow-yellow-500"
																		: "bg-gray-100 border-gray-500 shadow-gray-500"
																}`}
															>
																<div className="flex items-start gap-2">
																	<div className="flex-1">
																		<div className="flex flex-row gap-2">
																			<span
																				className={`font-semibold text-xs px-2 py-1 rounded ${
																					warning.type ===
																					"error"
																						? "bg-red-600 text-white"
																						: warning.type ===
																						  "warning"
																						? "bg-yellow-600 text-white"
																						: "bg-gray-600 text-white"
																				}`}
																			>
																				{
																					warning.component
																				}
																			</span>
																			<p
																				className={`text-sm font-medium ${
																					warning.type ===
																					"error"
																						? "text-red-900"
																						: warning.type ===
																						  "warning"
																						? "text-yellow-900"
																						: "text-gray-900"
																				}`}
																			>
																				{
																					warning.message
																				}
																			</p>
																		</div>
																		{warning.suggestion && (
																			<p
																				className={`text-xs mt-1 ${
																					warning.type ===
																					"error"
																						? "text-red-700"
																						: warning.type ===
																						  "warning"
																						? "text-yellow-700"
																						: "text-gray-700"
																				}`}
																			>
																				<span className="font-bold">
																					Tip:
																				</span>{" "}
																				{
																					warning.suggestion
																				}
																			</p>
																		)}
																	</div>
																</div>
															</div>
														)
													)}
												</div>
											</div>
										)}

										<div className="mt-8 pt-6 border-t border-gray-200">
											<div className="flex justify-between items-center">
												<span className="text-2xl font-framework-pixel text-gray-900">
													Total Price
												</span>
												<span className="text-3xl font-framework-pixel text-orange-600">
													€
													{calculateTotal().toLocaleString()}
												</span>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Configure;
