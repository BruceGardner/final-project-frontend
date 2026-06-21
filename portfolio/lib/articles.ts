import { faker } from '@faker-js/faker';

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  readTime: number;
  tag: string;
};

faker.seed(42);

const TAGS = ['React', 'Next.js', 'TypeScript', 'CSS', 'Node.js', 'Career'];

export const articles: Article[] = Array.from({ length: 6 }, (_, i) => ({
  id: `article-${i + 1}`,
  title: faker.hacker.phrase().replace(/^./, (c) => c.toUpperCase()),
  excerpt: faker.lorem.sentences(2),
  body: Array.from({ length: 6 }, () => faker.lorem.paragraph(6)).join('\n\n'),
  date: faker.date.past({ years: 1 }).toISOString(),
  readTime: faker.number.int({ min: 3, max: 12 }),
  tag: TAGS[i % TAGS.length],
}));

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}