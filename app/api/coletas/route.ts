import { NextResponse } from 'next/server';

let bancoDeDados = {
  metricas: {
    pendentes: 12,
    emRota: 4,
    concluidas: 28,
    custoRotas: 420.50,
    residuosKg: 320,
    itensReaproveitados: 86,
    oficinas: 4,
    alunos: 95
  },
  coletas: [
    { id: 'ELO-0004', doador: 'Empresa Alfa', bairro: 'Messejana', material: 'CPUs e cabos', status: 'Em análise' },
    { id: 'ELO-0005', doador: 'Faculdade Beta', bairro: 'Aldeota', material: 'Monitores', status: 'Aprovada' },
    { id: 'ELO-0006', doador: 'Escola Gama', bairro: 'Centro', material: 'Ponto de coleta', status: 'Agendada' },
    { id: 'ELO-0007', doador: 'Condomínio Sol', bairro: 'Cocó', material: 'Notebooks', status: 'Coletada' }
  ]
};

export async function GET() {
  return NextResponse.json(bancoDeDados);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const novaColeta = {
      id: `ELO-000${bancoDeDados.coletas.length + 4}`,
      doador: body.doador,
      bairro: body.bairro,
      material: body.material,
      status: 'Em análise'
    };
    bancoDeDados.coletas.unshift(novaColeta);
    bancoDeDados.metricas.pendentes += 1;
    return NextResponse.json({ success: true, coleta: novaColeta, metricas: bancoDeDados.metricas });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao processar' }, { status: 400 });
  }
}