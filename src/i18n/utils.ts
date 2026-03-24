import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    const activeLang = lang in ui ? lang : defaultLang;
    return ui[activeLang][key] || ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname.split('/');

  // If no locale in path, return exactly what we have without leading slash
  if (parts.length > 1 && !(parts[1] in ui)) {
    return parts.slice(1).join('/');
  }

  // Return everything after the locale
  const route = parts.slice(2).join('/');
  return route === '' ? undefined : route;
}

export function getPathWithLang(route: string, lang: string) {
  // ensure trailing slash consistently
  let cleanedRoute = route.startsWith('/') ? route.slice(1) : route;

  // remove trailing slash to append safely
  if (cleanedRoute.endsWith('/')) {
    cleanedRoute = cleanedRoute.slice(0, -1);
  }

  // With prefixDefaultLocale: true, all locales including English have a prefix
  return cleanedRoute === '' ? `/${lang}/` : `/${lang}/${cleanedRoute}/`;
}
