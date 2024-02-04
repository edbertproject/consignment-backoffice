
const NumberParser = (number?: string): string|0 => {
	return number!.replace(/\$\s?|(,*)/g, '')
}

export default NumberParser