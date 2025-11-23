/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ConfigType } from "@/util/types";
import React, { useEffect, useState } from "react";

function Configure() {
	const [configData, setConfigData] = useState<ConfigType | null>(null);
	const [selectedModel, setSelectedModel] = useState<string>("16");
	const [selectedConfig, setSelectedConfig] = useState<number>(0);

	const getInitialOptions = () => ({
		cpu: 0,
		display: 0,
		expansion_bay: 0,
		ram: 0,
		primary_storage: 0,
		secondary_storage: 0,
		os: 0,
		power_adapter: 0,
	});

	const [selectedOptions, setSelectedOptions] = useState(getInitialOptions());

	useEffect(() => {
		fetch("/data/configs.json")
			.then((res) => res.json())
			.then((data) => setConfigData(data))
			.catch((err) => console.error("Failed to load configs:", err));
	});

	const resetOptions = () => {
		setSelectedOptions(getInitialOptions());
	};

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

	const calculateTotal = () => {
		if (!currentConfig) return 0;
		let total = currentConfig.price;

		if (currentConfig.cpu)
			total += currentConfig.cpu[selectedOptions.cpu]?.price || 0;
		if (currentConfig.display)
			total += currentConfig.display[selectedOptions.display]?.price || 0;
		if (currentConfig.expansion_bay)
			total +=
				currentConfig.expansion_bay[selectedOptions.expansion_bay]
					?.price || 0;

		total += currentConfig.ram[selectedOptions.ram]?.price || 0;
		total +=
			currentConfig.primary_storage[selectedOptions.primary_storage]
				?.price || 0;
		if (
			currentConfig.secondary_storage &&
			currentConfig.secondary_storage.length > 0
		)
			total +=
				currentConfig.secondary_storage[
					selectedOptions.secondary_storage
				]?.price || 0;
		total += currentConfig.os[selectedOptions.os]?.price || 0;
		total +=
			currentConfig.power_adapter[selectedOptions.power_adapter]?.price ||
			0;

		return total;
	};

	const renderSelectField = (
		label: string,
		options: any[],
		selectedIndex: number,
		onChange: (index: number) => void,
		formatLabel: (option: any) => string
	) => (
		<div className="mb-6">
			<label className="block text-sm font-semibold text-gray-900 mb-2">
				{label}
			</label>
			<select
				value={selectedIndex}
				onChange={(e) => onChange(Number(e.target.value))}
				className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
			>
				{options.map((option, index) => (
					<option key={index} value={index} className="py-2">
						{formatLabel(option)}
					</option>
				))}
			</select>
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
												resetOptions();
											}}
											className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
												selectedModel === model
													? "bg-orange-600 text-white"
													: "bg-gray-100 text-gray-900 hover:bg-gray-200"
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
																resetOptions();
															}}
															className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
																selectedConfig ===
																index
																	? "bg-orange-600 text-white"
																	: "bg-gray-100 text-gray-900 hover:bg-gray-200"
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
													}),
												(option) =>
													`${option.name} (${
														option.cores
													}, up to ${
														option.speed
													}GHz) ${
														option.price > 0
															? `+€${option.price}`
															: ""
													}`
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
													}),
												(option) =>
													`${option.name} (${
														option.resolution
													}, ${
														option.refresh_rate
													}Hz) ${
														option.price > 0
															? `+€${option.price}`
															: ""
													}`
											)}

										{currentConfig.expansion_bay &&
											renderSelectField(
												"Processor",
												currentConfig.expansion_bay,
												selectedOptions.expansion_bay,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														expansion_bay: index,
													}),
												(option) =>
													`${option.name} ${
														option.vram > 0
															? `(${option.vram}GB ${option.vram_technology})`
															: ""
													}  ${
														option.price > 0
															? `+€${option.price}`
															: ""
													}`
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
													}),
												(option) =>
													option.name ||
													`${option.size}GB ${
														option.kit
													} ${option.technology} ${
														option.frequency
													}MHz ${
														option.price > 0
															? `+€${option.price}`
															: ""
													}`
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
													}),
												(option) =>
													option.size > 0
														? `${option.name} (${
																option.size
														  }GB) ${
																option.price > 0
																	? `+€${option.price}`
																	: ""
														  }`
														: option.name
											)}

										{currentConfig.secondary_storage &&
											renderSelectField(
												"Secondary Storage",
												currentConfig.secondary_storage,
												selectedOptions.secondary_storage,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														secondary_storage:
															index,
													}),
												(option) =>
													option.size > 0
														? `${option.name} (${
																option.size
														  }GB) ${
																option.price > 0
																	? `+€${option.price}`
																	: ""
														  }`
														: option.name
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
													}),
												(option) =>
													`${option.name} ${
														option.price > 0
															? `+€${option.price}`
															: ""
													}`
											)}

										{currentConfig.os &&
											renderSelectField(
												"Power Adapter",
												currentConfig.power_adapter,
												selectedOptions.power_adapter,
												(index) =>
													setSelectedOptions({
														...selectedOptions,
														power_adapter: index,
													}),
												(option) =>
													option.watts > 0
														? `${option.name} (${
																option.watts
														  }W) ${
																option.price > 0
																	? `+€${option.price}`
																	: ""
														  }`
														: option.name
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
