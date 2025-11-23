export interface BottleneckWarning {
	type: "error" | "warning" | "info";
	component: string;
	message: string;
	suggestion?: string;
}

interface ComponentSelection {
	cpu: number;
	display: number;
	expansion_bay: number;
	ram: number;
	primary_storage: number;
	secondary_storage: number;
	power_adapter: number;
}

interface Config {
	cpu?: Array<{ cores: number; price: number }>;
	display?: Array<{ refresh_rate: number }>;
	expansion_bay?: Array<{ vram: number }>;
	ram: Array<{ size?: number; price: number }>;
	primary_storage: Array<{ size: number }>;
	secondary_storage?: Array<{ size: number }>;
	power_adapter: Array<{ watts: number }>;
}

const THRESHOLDS = {
	MIN_RAM_HIGH_CORE: 32,
	MIN_RAM_MID_CORE: 16,
	GPU_MIN_RAM: 32,
	GPU_MIN_POWER: 240,
	HIGH_REFRESH: 120,
	MIN_GPU_VRAM: 8,
	RAM_STORAGE_RATIO_HIGH: 8,
	RAM_STORAGE_RATIO_LOW: 0.03125,
	HIGH_RAM: 64,
	LOW_STORAGE: 500,
	HIGH_STORAGE: 2048,
} as const;

export function analyzeBottlenecks(
	config: Config,
	selectedOptions: ComponentSelection
): BottleneckWarning[] {
	const warnings: BottleneckWarning[] = [];

	const cpu = config.cpu?.[selectedOptions.cpu];
	const gpu = config.expansion_bay?.[selectedOptions.expansion_bay];
	const ram = config.ram[selectedOptions.ram];
	const primaryStorage =
		config.primary_storage[selectedOptions.primary_storage];
	const powerAdapter = config.power_adapter[selectedOptions.power_adapter];
	const display = config.display?.[selectedOptions.display];

	if (!ram?.size) {
		warnings.push({
			type: "error",
			component: "RAM",
			message: "RAM is required",
		});
	}

	if (!primaryStorage?.size) {
		warnings.push({
			type: "error",
			component: "Storage",
			message: "Primary storage is required",
		});
	}

	if (!powerAdapter?.watts) {
		warnings.push({
			type: "error",
			component: "Power",
			message: "Power adapter is required",
		});
		return warnings;
	}

	if (cpu && ram.size) {
		if (cpu.cores >= 12 && ram.size < THRESHOLDS.MIN_RAM_HIGH_CORE) {
			warnings.push({
				type: "warning",
				component: "RAM",
				message: `${cpu.cores}-core CPU may be limited by ${ram.size}GB RAM`,
			});
		}
	}

	if (gpu?.vram) {
		if (
			ram.size &&
			gpu.vram >= THRESHOLDS.MIN_GPU_VRAM &&
			ram.size < THRESHOLDS.GPU_MIN_RAM
		) {
			warnings.push({
				type: "warning",
				component: "RAM",
				message: `${THRESHOLDS.GPU_MIN_RAM}GB+ system RAM usually recommended for ${gpu.vram}GB GPU`,
			});
		}

		if (cpu && cpu.cores <= 6 && gpu.vram >= THRESHOLDS.MIN_GPU_VRAM) {
			warnings.push({
				type: "error",
				component: "CPU",
				message: `${cpu.cores}-core CPU will bottleneck ${gpu.vram}GB GPU`,
			});
		}

		if (powerAdapter.watts < THRESHOLDS.GPU_MIN_POWER) {
			warnings.push({
				type: "error",
				component: "Power",
				message: `${gpu.vram}GB GPU requires at least ${THRESHOLDS.GPU_MIN_POWER}W power adapter`,
			});
		}

		if (
			(display?.refresh_rate ?? 0) >= THRESHOLDS.HIGH_REFRESH &&
			gpu.vram < THRESHOLDS.MIN_GPU_VRAM
		) {
			warnings.push({
				type: "info",
				component: "Display",
				message: `${
					display?.refresh_rate ?? 0
				}Hz display may not reach full potential with ${
					gpu.vram
				}GB GPU`,
			});
		}
	}

	if (ram.size && primaryStorage?.size) {
		if (
			ram.size >= THRESHOLDS.HIGH_RAM &&
			primaryStorage.size <= THRESHOLDS.LOW_STORAGE
		) {
			warnings.push({
				type: "warning",
				component: "Storage",
				message: `${ram.size}GB RAM with only ${primaryStorage.size}GB storage is unbalanced`,
				suggestion: `Consider upgrading to at least 1024GB storage to match your RAM capacity`,
			});
		}

		if (primaryStorage.size >= THRESHOLDS.HIGH_STORAGE && ram.size < 32) {
			warnings.push({
				type: "info",
				component: "RAM",
				message: `${primaryStorage.size}GB storage would benefit from more than ${ram.size}GB RAM`,
				suggestion: `32GB+ RAM recommended for large storage configurations. Performance might suffer from this.`,
			});
		}
	}

	return warnings;
}
