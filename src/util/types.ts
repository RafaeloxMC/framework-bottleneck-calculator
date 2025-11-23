export interface ConfigType {
	[key: string]: Array<{
		name: string;
		price: number;
		cpu?: Array<{
			name: string;
			cores: number;
			speed: number;
			price: number;
		}>;
		display?: Array<{
			name: string;
			size: number;
			resolution: string;
			refresh_rate: number;
			price: number;
		}>;
		expansion_bay?: Array<{
			name: string;
			price: number;
			vram: number;
			vram_technology: string;
			thickness: number;
		}>;
		ram: Array<{
			name?: string;
			size?: number;
			kit: string;
			technooloogy: string;
			frequency: number;
			price: number;
		}>;
		primary_storage: Array<{
			name: string;
			size: number;
			price: number;
		}>;
		secondary_storage?: Array<{
			name: string;
			size: number;
			price: number;
		}>;
		os: Array<{
			name: string;
			price: number;
		}>;
		power_adapter: Array<{
			name: string;
			watts: number;
			price: number;
		}>;
	}>;
}
