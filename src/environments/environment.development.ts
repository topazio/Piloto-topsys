export const environment = {

    MENU_ITEMS_CME: [
        {
          label: 'Piloto', icon: 'fa-solid fa-scissors', items: [
            { label: 'Clientes', icon: 'fa-solid fa-hand-holding',  route: 'cliente/cadastro'},
            {
              label: 'Expedintes', icon: 'fa-solid fa-boxes-packing', items: [
                { label: 'Kit Padrão', icon: 'fa-solid fa-kit-medical', route: '/smpep/cme/kitpadrao' },
                { label: 'Montagem de Kits', icon: 'fa-solid fa-boxes-stacked', route: '/smpep/cme/montagem' },
                { label: 'Expedições', icon: 'fa-solid fa-dolly', route: '/smpep/cme/expedicao' },
              ]
            },
            {
              label: 'Controle de Estoque', icon: "fa-solid fa-warehouse", items: [
                { label: 'Ajustes de Estoque', icon: 'fa-solid fa-toolbox', route: '/smpep/cme/ajuste-estoque' },
                { label: 'Implantação de Saldo', icon: 'fa-solid fa-truck-ramp-box', route: '/smpep/cme/implantacao-saldo-estoque' }
              ]
            }
          ]

        }
      ],
};
