import { sql } from '@vercel/postgres';

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT UNIQUE NOT NULL,
      password    TEXT NOT NULL,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id          SERIAL PRIMARY KEY,
      user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      user_name   TEXT NOT NULL,
      article_id  TEXT NOT NULL,
      body        TEXT NOT NULL,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      message     TEXT NOT NULL,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

export type DBUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
};

export async function getUserByEmail(email: string): Promise<DBUser | null> {
  const result = await sql<DBUser>`
    SELECT * FROM users WHERE email = ${email} LIMIT 1
  `;
  return result.rows[0] ?? null;
}

export async function createUser(
  name: string,
  email: string,
  hashedPassword: string
): Promise<DBUser> {
  const result = await sql<DBUser>`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashedPassword})
    RETURNING *
  `;
  return result.rows[0];
}

export type DBComment = {
  id: number;
  user_id: number;
  user_name: string;
  article_id: string;
  body: string;
  created_at: string;
};

export async function getCommentsByArticle(articleId: string): Promise<DBComment[]> {
  const result = await sql<DBComment>`
    SELECT * FROM comments WHERE article_id = ${articleId} ORDER BY created_at DESC
  `;
  return result.rows;
}

export async function createComment(
  userId: number,
  userName: string,
  articleId: string,
  body: string
): Promise<DBComment> {
  const result = await sql<DBComment>`
    INSERT INTO comments (user_id, user_name, article_id, body)
    VALUES (${userId}, ${userName}, ${articleId}, ${body})
    RETURNING *
  `;
  return result.rows[0];
}

export async function updateComment(
  id: number,
  userId: number,
  body: string
): Promise<DBComment | null> {
  const result = await sql<DBComment>`
    UPDATE comments SET body = ${body}
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *
  `;
  return result.rows[0] ?? null;
}

export async function deleteComment(
  id: number,
  userId: number
): Promise<boolean> {
  const result = await sql`
    DELETE FROM comments WHERE id = ${id} AND user_id = ${userId} RETURNING id
  `;
  return result.rows.length > 0;
}

export async function createContact(
  name: string,
  email: string,
  message: string
): Promise<void> {
  await sql`
    INSERT INTO contacts (name, email, message)
    VALUES (${name}, ${email}, ${message})
  `;
}