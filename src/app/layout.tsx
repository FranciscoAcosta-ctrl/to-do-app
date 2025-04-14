// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'To-Do App | Tu espacio de ideas',
  description: 'Organiza tus notas y tareas con estilo minimalista y productividad.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="light">
      <head />
      <body className={`bg-neutral-950 text-white font-sans ${inter.variable} antialiased min-h-screen`}>
        <main className="flex flex-col min-h-screen">{children}</main>
      </body>
    </html>
  );
}
