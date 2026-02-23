import type {
  FeaturedWork,
  NavSection,
  ServiceItem,
  RoleItem,
} from "../types/Content";

export const NAV_SECTIONS: NavSection[] = [
  { id: "hero", label: "Home" },
  { id: "works", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "blog", label: "Blog" },
];

export const FEATURED_WORK: FeaturedWork[] = [
  {
    date: "01 / 2025",
    title: "Platter Management App",
    desc: "Composable POS and reservations suite that keeps front-of-house moving with clear flows and bulletproof payments across web and mobile.",
    tags: ["React Native", "React", "Stripe - Tap to Pay"],
    gradient: "linear-gradient(135deg, #f0f7ff, #e8f3ff)",
  },
  {
    date: "02 / 2025",
    title: "BuddyBot",
    desc: "Designed and shipped fast, reliable UI layers on top of NetSuite for data-heavy operations and dashboards across desktop and tablet.",
    tags: ["React", "Dashboard", "AI Chatbot"],
    gradient: "linear-gradient(135deg, #fff7ec, #fff1da)",
  },
  {
    date: "03 / 2023",
    title: "Plant Disease Prediction",
    desc: "Lightweight CNN tool that gives growers instant visual cues on crop health and next steps.",
    tags: ["Deep Learning", "CNN", "Research Project"],
    gradient: "linear-gradient(135deg, #f4f2ff, #ffffff)",
  },
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    title: "Product UI Engineering",
    description:
      "Design-aligned interfaces with solid component systems, rapid iteration, and performance guardrails.",
  },
  {
    title: "Web + Mobile Delivery",
    description:
      "React + React Native apps with precise motion, offline-ready flows, and steady release cadence across iOS, Android, and desktop.",
  },
  {
    title: "Design Systems",
    description:
      "Tokens, typography, and reusable patterns that make teams faster and keep UX consistent.",
  },
];

export const ROLE_ITEMS: RoleItem[] = [
  {
    status: "Current",
    title: "Associate Analyst",
    company: "Cloudlabs",
    timeline: "Jan 2026 - Present",
  },
  {
    status: "Previous",
    title: "Mobile App Developer",
    company: "Platter Management",
    timeline: "Aug 2025 - Sept 2025",
  },
  {
    status: "Previous",
    title: "Product Developer",
    company: "ERP Buddies",
    timeline: "Jan 2024 - June 2025",
  },
  {
    status: "Previous",
    title: "React Js Intern",
    company: "Tagline Infotech",
    timeline: "June 2023 - Nov 2023",
  },
];
