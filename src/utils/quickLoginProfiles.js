export const QUICK_LOGIN_PASSWORD = "Teste@123";

export const quickLoginProfileGroups = [
  {
    label: "Plataforma",
    options: [
      {
        value: "teste.admin@prepara.me",
        label: "Admin Teste",
        type: "ADMIN",
        hint: "Administração geral da plataforma",
      },
      {
        value: "teste.especialista@prepara.me",
        label: "Especialista Teste",
        type: "SPECIALIST",
        hint: "Mentorias, agenda e materiais",
      },
    ],
  },
  {
    label: "Empresa (RH)",
    options: [
      {
        value: "teste.empresa@prepara.me",
        label: "Admin Empresa Teste",
        type: "COMPANY_ADMIN",
        hint: "Dashboard RH, indicadores e filtros",
      },
    ],
  },
  {
    label: "Ex-colaboradores",
    options: [
      {
        value: "teste.colaborador1@prepara.me",
        label: "Colaborador 1 — Operações",
        type: "USER",
        hint: "NPS 9 · recolocado · demissão voluntária",
      },
      {
        value: "teste.colaborador2@prepara.me",
        label: "Colaborador 2 — RH",
        type: "USER",
        hint: "NPS 6 · alerta de risco · involuntária",
      },
      {
        value: "teste.colaborador3@prepara.me",
        label: "Colaborador 3 — Financeiro",
        type: "USER",
        hint: "NPS 3 · alerta de risco",
      },
      {
        value: "teste.colaborador4@prepara.me",
        label: "Maria Silva Costa — Tecnologia",
        type: "USER",
        hint: "NPS 10 · recolocado",
      },
      {
        value: "teste.colaborador5@prepara.me",
        label: "João Pedro Santos — Comercial",
        type: "USER",
        hint: "NPS 2 · PCD · alerta de risco",
      },
      {
        value: "teste.colaborador6@prepara.me",
        label: "Ana Beatriz Lima — Marketing",
        type: "USER",
        hint: "NPS 7",
      },
      {
        value: "teste.colaborador7@prepara.me",
        label: "Pedro Henrique — Logística",
        type: "USER",
        hint: "NPS 8 · recolocado",
      },
      {
        value: "teste.colaborador8@prepara.me",
        label: "Fernanda Souza — Jurídico",
        type: "USER",
        hint: "NPS 5 · alerta de risco",
      },
      {
        value: "teste.colaborador9@prepara.me",
        label: "Carlos Eduardo — Produção",
        type: "USER",
        hint: "Sem pesquisa respondida · PCD",
      },
      {
        value: "teste.colaborador10@prepara.me",
        label: "Juliana Ferreira — Customer Success",
        type: "USER",
        hint: "NPS 8",
      },
    ],
  },
];

export function findQuickLoginProfile(email) {
  for (const group of quickLoginProfileGroups) {
    const match = group.options.find((option) => option.value === email);

    if (match) {
      return { ...match, group: group.label };
    }
  }

  return null;
}
