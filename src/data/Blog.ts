import type { BlogPost } from "../types/Content";

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "State management made simple with Zustand",
    slug: "react-native-state-management-zustand",
    desc: "A lightweight pattern for React Native state using slices, selectors, and persist without Redux overhead.",
    body: [
      "Why: predictable state without Redux ceremony; selectors keep renders cheap.",
      "How: compose slices, add devtools/persist, keep actions pure and colocated.",
      "Pattern: export typed hooks per slice so components only see what they need.",
      "Guardrails: memoize selectors and avoid spreading store state into props.",
      "Ship: persist critical slices (auth/session), leave volatile UI state in components.",
    ],
    tags: ["React Native", "Zustand", "State"],
    gradient: "linear-gradient(135deg, #f0f7ff, #e8f4ff)",
    image: "/placeholders/blog-1.svg",
    snippets: [
      {
        title: "Zustand store with slices + persist",
        code: `import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type UserSlice = {
  user?: { id: string; name: string };
  setUser: (user: UserSlice['user']) => void;
};

type ThemeSlice = {
  theme: 'light' | 'dark';
  setTheme: (t: ThemeSlice['theme']) => void;
};

const userSlice = (set): UserSlice => ({
  user: undefined,
  setUser: (user) => set({ user }),
});

const themeSlice = (set): ThemeSlice => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
});

export const useStore = create<UserSlice & ThemeSlice>()(
  devtools(
    persist(
      (set, get) => ({
        ...userSlice(set, get),
        ...themeSlice(set, get),
      }),
      { name: 'app-storage' }
    )
  )
);`,
      },
    ],
  },
  {
    title: "React Hooks you actually reach for",
    slug: "react-hooks-that-stick",
    desc: "From useMemo and useCallback sanity to custom hooks that keep components lean and readable.",
    body: [
      "Why: custom hooks package side-effects so components stay readable.",
      "How: honest deps, cleanup in effects, avoid data fetches in render paths.",
      "Pattern: push data fetching and subscriptions into hooks; leave components for layout.",
      "Guardrails: prefer useRef over useState when tracking mutable values that shouldn't render.",
      "Checklist: deps array linting on, stable callbacks for children that memoize.",
    ],
    tags: ["React", "Hooks", "Patterns"],
    gradient: "linear-gradient(135deg, #e8fff7, #f6fffc)",
    image: "/placeholders/blog-2.svg",
    snippets: [
      {
        title: "Composable fetch hook with suspense-friendly shape",
        code: `function useResource<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetcher()
      .then((res) => active && setData(res))
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [key, fetcher]);

  return { data, loading, error };
}

const { data, loading } = useResource('posts', () =>
  fetch('/api/posts').then((r) => r.json())
);`,
      },
    ],
  },
  {
    title: "Debugging React Native with Flipper",
    slug: "debugging-with-flipper",
    desc: "Set up Flipper plugins for logs, network, layout, and React DevTools to get real observability on device.",
    body: [
      "Why: device-first debugging beats simulators; Flipper shows real network and layout.",
      "How: enable Hermes, add RN plugin, use Network/Layout/React tools for profiling.",
      "Workflow: reproduce on device, capture Network trace, inspect layout bounds for tap targets.",
      "Performance: profile re-render count via React DevTools, then memoize hotspots.",
      "Ship: keep Flipper enabled in dev builds and strip plugins from release builds.",
    ],
    tags: ["React Native", "Flipper", "Debugging"],
    gradient: "linear-gradient(135deg, #fff4e5, #fffaf2)",
    image: "/placeholders/blog-3.svg",
    snippets: [
      {
        title: "Enable Flipper + Hermes in React Native",
        code: `project.ext.react = [
  enableHermes: true,
  jsEngine: "hermes"
]

import React from 'react';
import { LogBox } from 'react-native';

if (__DEV__) {
  import('react-native-flipper');
}

LogBox.ignoreLogs(['Flipper']);`,
      },
    ],
  },
  {
    title: "React Native + TypeScript with the new architecture",
    slug: "react-native-typescript-new-arch",
    desc: "Using Fabric and TurboModules with strong typing for safer cross-platform components.",
    body: [
      "Why: new arch + TS keeps native boundaries safe and predictable.",
      "How: type TurboModules, keep Fabric props strict, and split platform styling.",
      "Interop: define Spec interfaces once, reuse them in native + JS for end-to-end type safety.",
      "UI: Fabric components benefit from typed props plus platform tokens for spacing and color.",
      "Release: add CI checks that build both platforms and run TS to catch contract drift.",
    ],
    tags: ["React Native", "TypeScript", "Fabric"],
    gradient: "linear-gradient(135deg, #f7f0ff, #fbf7ff)",
    image: "/placeholders/blog-4.svg",
    snippets: [
      {
        title: "Typed TurboModule definition",
        code: `import { TurboModule, TurboModuleRegistry } from 'react-native';
export type Spec = TurboModule & {
  add(a: number, b: number): number;
};
export default TurboModuleRegistry.getEnforcing<Spec>('NativeMath');

import NativeMath from './NativeMath';
const sum = NativeMath.add(2, 3);`,
      },
    ],
  },
];

