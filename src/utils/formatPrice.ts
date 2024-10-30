export const formatPrice = (price: number) => {
	const formatoPrice = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "brl",
	});

	return formatoPrice.format(price);
};
