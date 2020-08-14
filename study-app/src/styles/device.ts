const size = {
  mobileL: '480px',
  mobileS: '350px',
  tablet: '768px'
}

export const device = {
  mobileL: `only screen and (max-width: ${size.mobileL})`,
  tablet: `only screen and (max-width: ${size.tablet})`,
  mobileS: `only screen and (max-width: ${size.mobileS})`
}
