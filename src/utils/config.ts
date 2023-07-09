import { ThemingProps } from '@chakra-ui/react'
import { goerli } from '@wagmi/chains'

export const SITE_NAME = 'Arthera Lucky Wheel'
export const SITE_DESCRIPTION = 'Spin the wheel and get some AA'
export const SITE_URL = 'https://w3hc.org'
export const THEME_INITIAL_COLOR = 'dark'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'W3HC'
export const SOCIAL_GITHUB = 'w3hc/arthera-lucky-wheel'

export const ETH_CHAINS = [goerli]
export const alchemyId = process.env.NEXT_PUBLIC_ARBITRUM_ALCHEMY_ID

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
