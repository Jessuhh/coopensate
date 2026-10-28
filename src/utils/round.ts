export function round(number: number, decimals: number = 2) {
	const factor = 10 ** decimals;
	return Math.round(number * factor) / factor;
}
