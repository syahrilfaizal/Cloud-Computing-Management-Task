export const MENU_ITEMS = [{
  key: 'menu',
  label: 'MENU',
  isTitle: true
}, {
  key: 'dashboard',
  icon: 'solar:home-2-broken',
  label: 'Dashboard',
  badge: {
    text: '9+',
    variant: 'success'
  },
  url: '/dashboard/analytics'
}, {
  key: 'apps',
  label: 'APPS',
  isTitle: true
}, {
  key: 'apps-todo',
  icon: 'solar:list-heart-minimalistic-broken',
  label: 'Tasks Todo',
  url: '/apps/todo'
}, {
  key: 'apps-chat',
  icon: 'solar:chat-round-call-broken',
  label: 'Chat',
  url: '/apps/chat'
}, {
  key: 'calendar-schedule',
  icon: 'solar:calendar-broken',
  label: 'Schedule',
  url: '/calendar/schedule'
}];