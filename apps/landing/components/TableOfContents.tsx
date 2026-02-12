interface TableOfContentsProps {
    sections: {
        id: string;
        title: string;
    }[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
    return (
        <nav className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h2>
            <ul className="space-y-2">
                {sections.map((section) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                        >
                            {section.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
