import { THEME_COOKIE } from "@/lib/theme";

const SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)${THEME_COOKIE}=([^;]+)/);var t=m?decodeURIComponent(m[1]):'system';if(t==='light'||t==='dark'||t==='system'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

/**
 * Tiny synchronous script that runs before paint to apply the theme stored in
 * the cookie. Avoids a FOUC without forcing the layout to be dynamic under
 * Cache Components.
 */
export function ThemeBootScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
