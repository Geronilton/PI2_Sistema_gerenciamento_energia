import { organizeDataByMonth } from '../../../src/screens/Perfil/organizeDataByMonth';

describe('organizeDataByMonth', () => {
  it('deve organizar corretamente os dados por mês e calcular a corrente total', () => {
    const currentYear = new Date().getFullYear();

    const mockData = [
      { corrente: 10, timestamp: new Date(`${currentYear}-01-15T00:00:00Z`) }, 
      { corrente: 20, timestamp: new Date(`${currentYear}-02-15T00:00:00Z`) }, 
      { corrente: 30, timestamp: new Date(`${currentYear}-02-20T00:00:00Z`) }, 
      { corrente: 40, timestamp: new Date(`${currentYear}-03-15T00:00:00Z`) },
    ];

    const expectedOutput = [
      { mes: 'Janeiro', totalCorrente: 10 },
      { mes: 'Fevereiro', totalCorrente: 50 }, // 20 + 30
      { mes: 'Março', totalCorrente: 40 },
      { mes: 'Abril', totalCorrente: 0 },
      { mes: 'Maio', totalCorrente: 0 },
      { mes: 'Junho', totalCorrente: 0 },
      { mes: 'Julho', totalCorrente: 0 },
      { mes: 'Agosto', totalCorrente: 0 },
      { mes: 'Setembro', totalCorrente: 0 },
      { mes: 'Outubro', totalCorrente: 0 },
      { mes: 'Novembro', totalCorrente: 0 },
      { mes: 'Dezembro', totalCorrente: 0 },
    ];

    const result = organizeDataByMonth(mockData);

    expect(result).toEqual(expectedOutput);
  });

  it('deve retornar corrente total como 0 quando não há dados para o mês', () => {
    const currentYear = new Date().getFullYear(); 

    const mockData = [
      { corrente: 15, timestamp: new Date(`${currentYear}-05-10T00:00:00Z`) }, 
    ];

    const expectedOutput = [
      { mes: 'Janeiro', totalCorrente: 0 },
      { mes: 'Fevereiro', totalCorrente: 0 },
      { mes: 'Março', totalCorrente: 0 },
      { mes: 'Abril', totalCorrente: 0 },
      { mes: 'Maio', totalCorrente: 15 }, // Dados para Maio
      { mes: 'Junho', totalCorrente: 0 },
      { mes: 'Julho', totalCorrente: 0 },
      { mes: 'Agosto', totalCorrente: 0 },
      { mes: 'Setembro', totalCorrente: 0 },
      { mes: 'Outubro', totalCorrente: 0 },
      { mes: 'Novembro', totalCorrente: 0 },
      { mes: 'Dezembro', totalCorrente: 0 },
    ];

    const result = organizeDataByMonth(mockData);

    expect(result).toEqual(expectedOutput);
  });
});
