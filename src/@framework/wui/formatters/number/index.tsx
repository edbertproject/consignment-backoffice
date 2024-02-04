
const NumberFormatter = (number?: number | string) => {
	return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default NumberFormatter