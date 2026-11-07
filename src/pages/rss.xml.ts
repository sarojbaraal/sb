import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return rss({
    title: 'Saroj Baral — Field Notes',
    description: 'Working notes on MIS, business intelligence, spreadsheet architecture, ERP data integrity, and project operations.',
    site: context.site?.toString() || 'https://sarojbaral.com.np',
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.pubDate,
      description: note.data.description,
      link: `/notes/${note.id}/`,
    })),
  });
}
