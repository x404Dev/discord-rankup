import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Discord-Rankup',
      customCss: [
				// Path to your Tailwind base styles:
				'./src/tailwind.css',
			],
      editLink: {
				baseUrl: 'https://github.com/x404dev/discord-rankup/edit/main/docs/',
			},
      social: {
        github: 'https://github.com/x404dev/discord-rankup',
        discord: 'https://discord.gg/yktBMMMpMz',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Introduction', link: 'guides/introduction' },
            { label: 'Examples',  autogenerate: { directory: 'guides/Examples' } }
            
          ],
        },
        {
          label: 'Classes',
          autogenerate: { directory: 'classes' }
        },
        {
          label: 'Events',
          autogenerate: {
            directory: 'events',
          },
        },
        {
          label: 'Functions',
          autogenerate: {
            directory: 'functions',
          },
        },
        {
          label: 'Typedefs',
          autogenerate: {
            directory: 'typedefs',
          },
        },
        
      ],
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
  site: 'https://discord-rankup.js.org',
});
