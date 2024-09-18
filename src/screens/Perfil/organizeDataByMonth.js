export const organizeDataByMonth = (data) => {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const currentYear = new Date().getFullYear();

    const result = monthNames.map((monthName, index) => {
        const month = index + 1; // O índice do array começa em 0, por isso somamos 1
        const monthlyData = data.filter(item => {
            const date = item.timestamp;
            return date.getMonth() + 1 === month && date.getFullYear() === currentYear;
        });

        const totalCorrente = monthlyData.reduce((sum, item) => sum + (item.corrente || 0), 0); // Soma a corrente, garantindo que o valor seja numérico

        return { mes: monthName, totalCorrente: totalCorrente }; // Retorna o nome do mês e o consumo total
    });

    return result;
};
