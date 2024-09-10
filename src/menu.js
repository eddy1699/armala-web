export default [
  'General',
  [
    {
      to: '/dashboard',
      icon: 'chart-bar',
      label: 'Dashboard'
    },
    {
      to: '/clientes',
      label: 'Clientes',
      icon: 'account-group-outline'
      // updateMark: vent
    },
    {
      to: '/reservas',
      label: 'Reservas',
      icon: 'checkbook'
      // updateMark: vent
    },
    {
      to: '/tickets',
      label: 'Tickets',
      icon: 'ticket-confirmation'
      // updateMark: vent
    },
    {
      to: '/paquetes',
      label: 'Paquetes',
      icon: 'package'
      // updateMark: vent
    },
    {
      label: 'Contabilidad',
      subLabel: 'Submenus Example',
      icon: 'currency-usd',
      menu: [
        {
          href: '#void',
          label: 'Documentos Contables',
          icon: 'file-account'
        },
        {
          href: '#void',
          label: 'Documentos de cobranza',
          icon: 'file-check'
        }
      ]
    },
    {
      label: 'Gestión',
      subLabel: 'Submenus Example',
      icon: 'apps',
      menu: [
        {
          href: '#/forms',
          label: 'Usuarios',
          icon: 'account'
        }
      ]
    }

  ]
  // ,
  // 'Examples',
  // [
  //   {
  //     to: '/tables',
  //     label: 'Tables',
  //     icon: 'table'
  //     // updateMark: vent
  //   },
  //   {
  //     to: '/forms',
  //     label: 'Forms',
  //     icon: 'square-edit-outline'
  //   },
  //   {
  //     to: '/profile',
  //     label: 'Profile',
  //     icon: 'account-circle'
  //   },
  //   {
  //     to: '/login',
  //     label: 'Login',
  //     icon: 'lock'
  //   },
  //   {
  //     label: 'Submenus',
  //     subLabel: 'Submenus Example',
  //     icon: 'view-list',
  //     menu: [
  //       {
  //         href: '#void',
  //         label: 'Sub-item One'
  //       },
  //       {
  //         href: '#void',
  //         label: 'Sub-item Two'
  //       }
  //     ]
  //   }
  // ]
  // 'About',
  // [
  //   {
  //     href: 'https://justboil.me/bulma-admin-template/one/',
  //     label: 'Premium',
  //     icon: 'monitor',
  //     target: '_blank'
  //   },
  //   {
  //     href: 'https://github.com/vikdiesel/admin-one-vue-bulma-dashboard',
  //     label: 'GitHub',
  //     icon: 'github-circle',
  //     target: '_blank'
  //   }
  // ]
]
