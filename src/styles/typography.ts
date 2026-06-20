// typography.js

export const languageGroup = {
  en: 'default',
  hi: 'indic',
  ta: 'south',
  kn: 'south',
  ml: 'south',
} as const;

export const heroHeading = {
  default: `
    text-[42px]
    sm:text-[13px]
    md:text-[28px]
    lg:text-[40px]
    font-semibold
    tracking-[-0.05em]
    leading-[0.95]
  `,

  indic: `
    text-[35px]
    sm:text-[25px]
    md:text-[30px]
    lg:text-[35px]
    font-semibold
    tracking-normal
    leading-[1.12]
  `,

  south: `
    text-[35px]
    sm:text-[25px]
    md:text-[30px]
    lg:text-[35px]
    font-semibold
    tracking-normal
    leading-[1.15]
  `,
}

export const heroDescription = {
  default: `
    text-[16px]
    sm:text-[18px]
    md:text-[19px]
    lg:text-[20px]
    leading-[1.8]
  `,

  indic: `
    text-[16px]
    sm:text-[15px]
    md:text-[17px]
    lg:text-[18px]
    leading-[1.9]
    font-medium
  `,

  south: `
    text-[16px]
    sm:text-[15px]
    md:text-[16px]
    lg:text-[17px]
    leading-[1.9]
    font-medium
  `,
}

export const sectionHeading = {
  default: `
    text-[32px]
    sm:text-[20px]
    md:text-[28px]
    lg:text-[30px]
    font-semibold
    tracking-[-0.04em]
    leading-[1]
  `,

  indic: `
    text-[34px]
    sm:text-[25px]
    md:text-[28px]
    lg:text-[30px]
    font-semibold
    tracking-normal
    leading-[1.12]
  `,

  south: `
    text-[34px]
    sm:text-[25px]
    md:text-[28px]
    lg:text-[30px]
    font-semibold
    tracking-normal
    leading-[1.15]
  `,
}

export const sectionDescription = {
  default: `
    text-[14px]
    sm:text-[16px]
    lg:text-[18px]
    leading-8
  `,

  indic: `
    text-[15px]
    sm:text-[12px]
    lg:text-[15px]
    leading-8
  `,

  south: `
    text-[15px]
    sm:text-[12px]
    lg:text-[15px]
    leading-8
  `,
}

export const cardTitle = {
  default: `
    text-[18px]
    font-semibold
    leading-snug
  `,

  indic: `
    text-[16px]
    font-semibold
    leading-[1.5]
  `,

  south: `
    text-[16px]
    font-semibold
    leading-[1.5]
  `,
}

export const cardDescription = {
  default: `
    text-[14px]
    leading-relaxed
  `,

  indic: `
    text-[15px]
    leading-7
  `,

  south: `
    text-[15px]
    leading-7
  `,
}

export const tagText = {
  default: `
    text-[11px]
  `,

  indic: `
    text-[12px]
  `,

  south: `
    text-[12px]
  `,
}

export const badgeText = {
  default: `
    text-xs
    sm:text-sm
    font-semibold
  `,

  indic: `
    text-[11px]
    sm:text-[12px]
    font-semibold
  `,

  south: `
    text-[11px]
    sm:text-[12px]
    font-semibold
  `,
}

export const buttonText = {
  default: `
    font-bold
  `,

  indic: `
    font-semibold
    text-[14px]
  `,

  south: `
    font-semibold
    text-[14px]
  `,
}

export const getTypography = (
  styles: Record<string, string>,
  locale: string = 'en'
) => {
  const group =
    languageGroup[locale as keyof typeof languageGroup] || 'default';

  return styles[group];
};


export const miniBadgeText = {
  default: `
    text-[11px]
  `,

  indic: `
    text-[10px]
  `,

  south: `
    text-[9px]
  `,
}


export const disclaimerText = {
  default: `
    text-[12px]
  `,

  indic: `
    text-[12px]
  `,

  south: `
    text-[11px]
  `,
}

export const testimonialQuote = {
  default: `
    text-[15px]
    sm:text-[17px]
    leading-relaxed
  `,

  indic: `
    text-[15px]
    sm:text-[16px]
    leading-8
  `,

  south: `
    text-[14px]
    sm:text-[15px]
    leading-8
  `,
}

export const ctaHeading = {
  default: `
    text-[28px]
    sm:text-[30px]
    lg:text-[35px]
    font-bold
    tracking-[-0.04em]
    leading-[1.08]
  `,

  indic: `
    text-[26px]
    sm:text-[28px]
    lg:text-[32px]
    font-semibold
    tracking-normal
    leading-[1.15]
  `,

  south: `
    text-[24px]
    sm:text-[28px]
    lg:text-[32px]
    font-semibold
    tracking-normal
    leading-[1.15]
  `,
}

export const ctaDescription = {
  default: `
    text-[16px]
    sm:text-[17px]
    leading-relaxed
  `,

  indic: `
    text-[15px]
    sm:text-[16px]
    leading-8
  `,

  south: `
    text-[14px]
    sm:text-[15px]
    leading-8
  `,
}

export const showcaseHeading = {
  default: `
    text-[32px]
    sm:text-[25px]
    lg:text-[30px]
    font-semibold
    tracking-[-0.04em]
    leading-[1]
  `,

   indic: `
    text-[35px]
    sm:text-[25px]
    md:text-[30px]
    lg:text-[35px]
    font-semibold
    tracking-normal
    leading-[1.12]
  `,

  south: `
    text-[35px]
    sm:text-[25px]
    md:text-[30px]
    lg:text-[35px]
    font-semibold
    tracking-normal
    leading-[1.15]
  `,
}

export const showcaseDescription = {
  default: `
    text-[17px]
    leading-relaxed
  `,

  indic: `
    text-[16px]
    leading-8
  `,

  south: `
    text-[15px]
    leading-8
  `,
}

export const mentorName = {
  default: `
    text-2xl
    font-semibold
    leading-tight
  `,

  indic: `
    text-[22px]
    font-semibold
    leading-[1.3]
  `,

  south: `
    text-[22px]
    font-semibold
    leading-[1.3]
  `,
}

export const showcaseBadge = {
  default: `
    text-xs
    font-bold
    tracking-[0.2em]
  `,

  indic: `
    text-[11px]
    font-semibold
  `,

  south: `
    text-[10px]
    font-semibold
  `,
}


export const testimonialText = {
  default: `
    text-[15px]
    leading-relaxed
  `,

  indic: `
    text-[15px]
    leading-8
  `,

  south: `
    text-[14px]
    leading-8
  `,
}


