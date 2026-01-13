import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Interview AI | Robotic Performance Engine',
    description: 'Master your career with neural interview simulations.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
                <meta name="theme-color" content="#3b82f6" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}
