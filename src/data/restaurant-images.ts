function buildImage(label: string, background: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420">
      <rect width="600" height="420" rx="44" fill="${background}" />
      <circle cx="468" cy="100" r="98" fill="${accent}" opacity="0.14" />
      <circle cx="128" cy="314" r="116" fill="${accent}" opacity="0.12" />
      <text x="52" y="352" fill="#171717" font-size="38" font-family="-apple-system, BlinkMacSystemFont, sans-serif">${label}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const RESTAURANT_LOGO_LIBRARY = [
  {
    id: "atelier-mark",
    label: "Atelier Mark",
    src: buildImage("Atelier", "#f4f2ee", "#81715e")
  },
  {
    id: "monogram-a",
    label: "Monogram A",
    src: buildImage("A", "#f2f2f0", "#4d5a6a")
  },
  {
    id: "studio-round",
    label: "Studio Round",
    src: buildImage("Studio", "#f3efea", "#9e8368")
  }
];

export const RESTAURANT_COVER_LIBRARY = [
  {
    id: "warm-interior",
    label: "Warm Interior",
    src: "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    id: "sunlit-cafe",
    label: "Sunlit Cafe",
    src: "https://images.pexels.com/photos/11433158/pexels-photo-11433158.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    id: "table-setting",
    label: "Table Setting",
    src: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1400"
  }
];
