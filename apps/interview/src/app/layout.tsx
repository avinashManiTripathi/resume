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
            <body className="antialiased">{children}</body>
        </html>
    );
}
