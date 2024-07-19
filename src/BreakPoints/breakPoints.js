export const breakpoints = {
  smmobile: '575px',
  bgmobile: '767px',
  tablet: '768px',
  desktop: '1024px',
}

export const device = {
  smmobile: `(max-width: ${breakpoints.smmobile})`,
  bgmobile: `(max-width: ${breakpoints.bgmobile})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
}
