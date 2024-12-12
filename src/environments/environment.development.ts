export const environment = {

    MENU_ITEMS_PROJETO_PILOTO: [
        {
          label: 'Piloto', icon: 'fa-solid fa-scissors', items: [
            { label: 'Clientes', icon: 'fa-solid fa-hand-holding',  route: 'cliente/cadastro'},
            {
              label: 'Contratos', icon: 'fa-solid fa-boxes-packing', items: [
                { label: 'Propostas', icon: 'fa-solid fa-kit-medical', route: '/contratos/proposta/cadastro' },
                { label: 'Contratos', icon: 'fa-solid fa-boxes-stacked', route: 'contrato/cadastro' },
                { label: 'Aditivos', icon: 'fa-solid fa-dolly', route: '/contratos/aditivos/cadastro' },
              ]
            },

          ]

        }
      ],
};
