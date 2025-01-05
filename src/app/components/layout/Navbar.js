import Link from "next/link";

export default function Navbar() {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Payout", href: "/payouts" },
    { name: "Analytics", href: "/analytics" },
    { name: "Logout", href: "/logout" },
  ];

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        My Dashboard
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
