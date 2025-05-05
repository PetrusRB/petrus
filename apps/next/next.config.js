const { withExpo } = require('@expo/next-adapter');
const { withGluestackUI } = require("@gluestack/ui-next-adapter")
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    INVITE_LINK: process.env.INVITE_LINK
  },
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