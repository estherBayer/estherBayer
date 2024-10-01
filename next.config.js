/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: "default", // Use the default loader for next/image
    formats: ["image/avif", "image/webp"],
    domains: ['images.ctfassets.net'], // Add Contentful's image CDN
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  },
};
