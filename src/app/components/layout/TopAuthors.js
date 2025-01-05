"use client";

export default function TopAuthors() {
    const authors = [
        { name: "Author 1", articles: 25 },
        { name: "Author 2", articles: 20 },
        { name: "Author 3", articles: 18 },
        { name: "Author 4", articles: 15 },
        { name: "Author 5", articles: 12 },
    ];

    return (
        <div className="bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Top Authors</h2>
            <ul className="space-y-2">
                {authors.map((author, index) => (
                    <li key={index} className="flex justify-between">
                        <span>{author.name}</span>
                        <span>{author.articles} Articles</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
