import { NextResponse } from 'next/server';

// Simulação de banco de dados temporário em memória (será substituído pelo Firebase futuramente)
let coletas = [
  { id: '#ELO-12345', doador: 'Empresa Alfa', local: 'Messejana', status: 'Em Rota', eta: '2 hrs' },
  { id: '#ELO-12346', doador: 'Faculdade Beta', local: 'Aldeota', status: 'Concluída', eta: '-' },
];

export async function GET() {
  return NextResponse.json(coletas);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validação simples
    if (!data.doador || !data.local) {
      return NextResponse.json(
        { error: 'Doador e Local são obrigatórios' }, 
        { status: 400 }
      );
    }

    const novaColeta = {
      id: `#ELO-${Math.floor(10000 + Math.random() * 90000)}`,
      doador: data.doador,
      local: data.local,
      status: 'Pendente',
      eta: '-',
    };

    // Adiciona a nova coleta no início do array
    coletas = [novaColeta, ...coletas];

    return NextResponse.json(novaColeta, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' }, 
      { status: 500 }
    );
  }
}