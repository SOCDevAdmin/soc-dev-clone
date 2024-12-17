import { PATTERNS, GRADIENTS, SHAPE_TEMPLATES } from '$lib/leaflet/symbol/shapes';
import { createSVGWrapper, createDefs } from '$lib/leaflet/symbol/svg';
import type {
	ExtendedPointSymbologyOptions,
	ExtendedPolygonSymbologyOptions,
	EnhancedPathOptions,
	ExtendedLineSymbologyOptions
} from './types';

class SymbologyGenerator {
	static calculatePointSymbolSize(symbolOptions: ExtendedPointSymbologyOptions): number {
		if (symbolOptions?.options?.type === 'circleMarker') {
			const { radius = 3, weight = 0 } = symbolOptions.options.options || {};
			return (radius + weight) * 2 + 2;
		}
		return 10;
	}

	static createPointSymbol(
		symbolOptions: ExtendedPointSymbologyOptions,
		legendBaseSize?: number
	): string {
		if (!symbolOptions) return '';

		const baseSize = legendBaseSize || SymbologyGenerator.calculatePointSymbolSize(symbolOptions);

		if (symbolOptions.options?.type === 'circleMarker') {
			const { options: circleOptions } = symbolOptions.options;
			const hasStroke = circleOptions?.weight && circleOptions.weight > 0;
			const patternId = `pattern-${circleOptions?.fillColor?.replace('#', '')}`;
			const fillType = circleOptions?.fillPattern || 'solid';

			const patterns = [];
			if (fillType !== 'solid' && fillType in PATTERNS) {
				patterns.push(
					PATTERNS[fillType as keyof typeof PATTERNS](patternId, circleOptions?.fillColor || '#000')
				);
			}
			if (circleOptions?.gradient && circleOptions.gradient in GRADIENTS) {
				patterns.push(
					GRADIENTS[circleOptions.gradient](patternId, circleOptions?.fillColor || '#000')
				);
			}

			const content = `
                ${patterns.length > 0 ? createDefs(patterns) : ''}
                ${
									hasStroke
										? `<circle cx="${baseSize / 2}" cy="${baseSize / 2}" r="${(circleOptions?.radius || 0) + 1}" 
                        fill="${circleOptions?.color}"/>`
										: ''
								}
                <circle cx="${baseSize / 2}" cy="${baseSize / 2}" r="${circleOptions?.radius || 0}" 
                    fill="${SymbologyGenerator.getFillStyle(fillType, patternId, circleOptions)}"
                    fill-opacity="${circleOptions?.fillOpacity || 1}"/>
            `;

			return createSVGWrapper(content, baseSize, baseSize);
		}

		if (symbolOptions.options?.type === 'divIcon') {
			const { options: iconOptions } = symbolOptions;
			const size = iconOptions?.options?.iconSize?.[0] || baseSize;
			const color = iconOptions?.color || '#3388ff';
			const shape = iconOptions?.markerShape as keyof typeof SHAPE_TEMPLATES;

			const shapeTemplate = SHAPE_TEMPLATES[shape] || SHAPE_TEMPLATES.square;
			const content = `
                ${shapeTemplate(size, color)}
                ${
									iconOptions?.options?.stroke
										? `<path d="${shapeTemplate(size, color)}" fill="none" stroke="black" stroke-width="1"/>`
										: ''
								}
            `;

			return createSVGWrapper(content, size, size);
		}

		return createSVGWrapper(
			`<circle cx="${baseSize / 2}" cy="${baseSize / 2}" r="4" fill="gray"/>`,
			baseSize,
			baseSize
		);
	}

	static createLineStyle(options: ExtendedLineSymbologyOptions): L.PathOptions {
		const style: L.PathOptions = {
			color: options.color || '#3388ff',
			weight: options.width || 3,
			opacity: options.opacity || 1,
			lineCap: options.lineCap || 'round',
			lineJoin: options.lineJoin || 'round'
		};

		if (options.pattern) {
			style.dashArray = this.getLineDashArray(options.pattern);
		}

		return style;
	}

	static createLineSymbol(options: ExtendedLineSymbologyOptions): string {
		const pattern = options.pattern
			? `stroke-dasharray="${this.getLineDashArray(options.pattern, true)}"`
			: '';
		const gradient = options.gradient
			? GRADIENTS.linear('lineGradient', options.color || '#3388ff')
			: '';

		const content = `
            ${gradient}
            <line x1="0" y1="2" x2="20" y2="2"
                stroke="${options.gradient ? 'url(#lineGradient)' : options.color || '#3388ff'}"
                stroke-width="${options.width || 2}"
                ${pattern}
                stroke-linecap="${options.lineCap || 'round'}"
                stroke-linejoin="${options.lineJoin || 'round'}"
            />
            ${
							options.arrowheads
								? `
                <path d="M16,0 L20,2 L16,4" 
                    fill="none" 
                    stroke="${options.color || '#3388ff'}" 
                    stroke-width="1"
                />`
								: ''
						}
        `;

		return createSVGWrapper(content, 20, 4);
	}

	static createPolygonStyle(options: ExtendedPolygonSymbologyOptions): EnhancedPathOptions {
		return {
			fillColor: options.fillColor || '#3388ff',
			fillOpacity: options.fillOpacity || 0.2,
			color: options.color || '#3388ff',
			weight: options.weight || 3,
			opacity: options.opacity || 1,
			dashArray: options.dashArray,
			dashOffset: options.dashOffset,
			fillPattern: options.fillPattern,
			gradient: options.gradient
		};
	}

	static createPolygonSymbol(options: ExtendedPolygonSymbologyOptions): string {
		const patternId = `pattern-${options?.fillColor?.replace('#', '')}`;
		const fillType = options?.fillPattern || 'solid';

		const patterns = [];
		if (fillType !== 'solid' && fillType in PATTERNS) {
			patterns.push(PATTERNS[fillType](patternId, options?.fillColor || '#000'));
		}
		if (options?.gradient && options.gradient in GRADIENTS) {
			patterns.push(GRADIENTS[options.gradient](patternId, options?.fillColor || '#000'));
		}

		const content = `
        ${patterns.length > 0 ? createDefs(patterns) : ''}
        <rect x="2" y="2" width="16" height="16"
            fill="${SymbologyGenerator.getFillStyle(fillType, patternId, options)}"
            fill-opacity="${options?.fillOpacity || 0.2}"
            stroke="${options?.color || '#000'}"
            stroke-width="${options?.weight || 1}"
            ${options?.dashArray ? `stroke-dasharray="${options.dashArray}"` : ''}
        />
    `;

		return createSVGWrapper(content, 20, 20);
	}

	private static getFillStyle(fillType: string, patternId: string, options: any): string {
		if (fillType !== 'solid') {
			return `url(#${patternId}-${fillType})`;
		}
		if (options?.gradient) {
			return `url(#${patternId}-${options.gradient})`;
		}
		return options?.fillColor || '#000';
	}

	private static getLineDashArray(pattern: string, forSVG = false): string {
		const scale = forSVG ? 0.4 : 1;
		const patterns = {
			dashed: `${10 * scale}, ${10 * scale}`,
			dotted: `${2 * scale}, ${8 * scale}`,
			dashdot: `${10 * scale}, ${5 * scale}, ${2 * scale}, ${5 * scale}`
		};
		return patterns[pattern as keyof typeof patterns] || '';
	}
}

export const {
	createPointSymbol,
	createLineStyle,
	createLineSymbol,
	createPolygonStyle,
	createPolygonSymbol
} = SymbologyGenerator;
