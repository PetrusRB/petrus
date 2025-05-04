const { withExpo } = require('@expo/next-adapter');
const { withGluestackUI } = require("@gluestack/ui-next-adapter")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    'react-native',
    'react-native-web',
    "@gluestack-ui/nativewind-utils",
    'solito',
    'moti',
    'app',
    '@nandorojo/heroicons',
    'react-native-svg',
    'react-native-reanimated',
    "react-native-css-interop",
    'nativewind',
    'react-native-gesture-handler',
  ],
}

module.exports = withExpo(withGluestackUI(nextConfig))