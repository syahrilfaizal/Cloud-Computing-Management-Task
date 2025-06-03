import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import useQueryParams from '@/hooks/useQueryParams';
import { toggleDocumentAttribute } from '@/utils/layout';
const ThemeContext = createContext(undefined);
const useLayoutContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useLayoutContext can only be used within LayoutProvider');
  }
  return context;
};
const getPreferredTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const LayoutProvider = ({
  children
}) => {
  const params = useQueryParams();
  const override = !!(params.layout_theme || params.topbar_theme || params.menu_theme || params.menu_size);
  const INIT_STATE = {
    theme: params.layout_theme ? params.layout_theme : getPreferredTheme(),
    topbarTheme: params.topbar_theme ? params.topbar_theme : 'light',
    menu: {
      theme: params.menu_theme ? params.menu_theme : 'dark',
      size: params.menu_size ? params.menu_size : 'sm-hover-active'
    }
  };
  const [settings, setSettings] = useLocalStorage('__RASKET_REACT_CONFIG__', INIT_STATE, override);
  const [offcanvasStates, setOffcanvasStates] = useState({
    showThemeCustomizer: false,
    showBackdrop: false
  });

  // update settings
  const updateSettings = _newSettings => setSettings({
    ...settings,
    ..._newSettings
  });

  // update theme mode
  const changeTheme = newTheme => {
    updateSettings({
      theme: newTheme
    });
  };

  // change topbar theme
  const changeTopbarTheme = newTheme => {
    updateSettings({
      topbarTheme: newTheme
    });
  };

  // change menu theme
  const changeMenuTheme = newTheme => {
    updateSettings({
      menu: {
        ...settings.menu,
        theme: newTheme
      }
    });
  };

  // change menu theme
  const changeMenuSize = newSize => {
    updateSettings({
      menu: {
        ...settings.menu,
        size: newSize
      }
    });
  };

  // toggle theme customizer offcanvas
  const toggleThemeCustomizer = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showThemeCustomizer: !offcanvasStates.showThemeCustomizer
    });
  };

  // toggle activity stream offcanvas

  const themeCustomizer = {
    open: offcanvasStates.showThemeCustomizer,
    toggle: toggleThemeCustomizer
  };

  // toggle backdrop
  const toggleBackdrop = useCallback(() => {
    const htmlTag = document.getElementsByTagName('html')[0];
    if (offcanvasStates.showBackdrop) htmlTag.classList.remove('sidebar-enable');else htmlTag.classList.add('sidebar-enable');
    setOffcanvasStates({
      ...offcanvasStates,
      showBackdrop: !offcanvasStates.showBackdrop
    });
  }, [offcanvasStates.showBackdrop]);
  useEffect(() => {
    toggleDocumentAttribute('data-bs-theme', settings.theme);
    toggleDocumentAttribute('data-topbar-color', settings.topbarTheme);
    toggleDocumentAttribute('data-menu-color', settings.menu.theme);
    toggleDocumentAttribute('data-menu-size', settings.menu.size);
    return () => {
      toggleDocumentAttribute('data-bs-theme', settings.theme, true);
      toggleDocumentAttribute('data-topbar-color', settings.topbarTheme, true);
      toggleDocumentAttribute('data-menu-color', settings.menu.theme, true);
      toggleDocumentAttribute('data-menu-size', settings.menu.size, true);
    };
  }, [settings]);
  const resetSettings = () => updateSettings(INIT_STATE);
  return <ThemeContext.Provider value={useMemo(() => ({
    ...settings,
    themeMode: settings.theme,
    changeTheme,
    changeTopbarTheme,
    changeMenu: {
      theme: changeMenuTheme,
      size: changeMenuSize
    },
    themeCustomizer,
    toggleBackdrop,
    resetSettings
  }), [settings, offcanvasStates])}>
      {children}
      {offcanvasStates.showBackdrop && <div className="offcanvas-backdrop fade show" onClick={toggleBackdrop} />}
    </ThemeContext.Provider>;
};
export { LayoutProvider, useLayoutContext };