import { lazy, Suspense } from 'react';
import FallbackLoading from '@/components/FallbackLoading';
import LogoBox from '@/components/LogoBox';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getMenuItems } from '@/helpers/menu';
import HoverMenuToggle from './components/HoverMenuToggle';
const AppMenu = lazy(() => import('./components/AppMenu'));
const VerticalNavigationBar = () => {
  const menuItems = getMenuItems();
  return <div className="main-nav" id="leftside-menu-container">
      <LogoBox containerClassName="logo-box" squareLogo={{
      className: 'logo-sm',
      height: 24,
      width: 26
    }} textLogo={{
      className: 'logo-lg',
      height: 15,
      width: 68
    }} />

      <HoverMenuToggle />

      <SimplebarReactClient className="scrollbar">
        <Suspense fallback={<FallbackLoading />}>
          <AppMenu menuItems={menuItems} />
        </Suspense>
      </SimplebarReactClient>
    </div>;
};
export default VerticalNavigationBar;