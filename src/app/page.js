import NewsAnalytics from "./components/layout/NewsAnalytics";
import TopAuthors from "./components/layout/TopAuthors";

export default async function Home() {
  const apiKey = process.env.NEWS_API_KEY;

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();
  const news = (data.articles || []).filter(
    (article) => article.urlToImage && article.title
  );

  const authors = Array.from(
    new Set(news.map((article) => article.author).filter(Boolean))
  );

  const currentDate = new Date().toLocaleDateString();

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <div className="p-0 min-h-screen flex">
      <div className="flex-1">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-4">
          Top News Headlines
        </h1>
        {/* Removed input boxes here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-500 text-sm">
                  {article.author || "Nitin Gusain"},{" "}
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString()
                    : currentDate}
                </p>
                <h2 className="text-lg font-bold text-gray-800 mt-2">
                  {truncateText(article.title, 60)}
                </h2>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-500 font-semibold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-64 flex flex-col ml-4">
        <div className="sticky top-4">
          <div className="shadow p-0 mb-4 rounded-lg">
            <NewsAnalytics />
          </div>
          <div className="shadow p-0 rounded-lg">
            <TopAuthors />
          </div>
        </div>
      </div>
    </div>
  );
}
