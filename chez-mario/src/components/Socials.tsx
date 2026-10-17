import { site } from "@/content/site";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "./Icons";

export const socialLinks = () =>
  [
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.tiktok, label: "TikTok", Icon: TiktokIcon },
  ].filter((s): s is { href: string; label: string; Icon: typeof InstagramIcon } => !!s.href);

export const deliveryLinks = () =>
  [
    { href: site.delivery.uberEats, label: "Uber Eats" },
    { href: site.delivery.deliveroo, label: "Deliveroo" },
  ].filter((d): d is { href: string; label: string } => !!d.href);

export function Socials({ className = "" }: { className?: string }) {
  const links = socialLinks();
  if (!links.length) return null;
  return (
    <ul className={`flex gap-2 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Chez Mario sur ${label}`} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:border-mario-bright hover:text-mario-bright">
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
