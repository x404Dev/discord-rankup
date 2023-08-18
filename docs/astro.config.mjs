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
          autogenerate: { directory: 'guides' }
        },
        {
          label: 'Functions',
          autogenerate: {
            directory: 'functions',
          },
        },
      ],
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
