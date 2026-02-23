export type NavSection = {
  id: string;
  label: string;
};

export type FeaturedWork = {
  date: string;
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  image?: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type BlogSnippet = {
  title: string;
  code: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  desc: string;
  body: string[];
  tags: string[];
  gradient: string;
  image?: string;
  snippets?: BlogSnippet[];
};

export type RoleItem = {
  status: string;
  title: string;
  company: string;
  timeline: string;
};
