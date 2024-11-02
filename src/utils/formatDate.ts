export const formatarData = (data: string, hora: string) => {
	const formato = new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
	});

	return formato.format(new Date(`${data}T${hora}`));
};
