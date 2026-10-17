import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tout sauf l'API, le back-office, les fichiers internes et statiques.
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
