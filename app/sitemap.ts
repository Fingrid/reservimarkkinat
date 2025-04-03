import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://developers.fingrid.fi'; // Replace with your actual domain

  // Read the content directory to dynamically generate URLs
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir);

  const urls = files
    .filter((file) => file.endsWith('.md')) // Only include markdown files
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      return {
        url: `${baseUrl}/${slug}`,
        lastModified: new Date().toISOString(),
      };
    });

  // Add the root URL
  urls.push({
    url: baseUrl,
    lastModified: new Date().toISOString(),
  });

  return urls;
}