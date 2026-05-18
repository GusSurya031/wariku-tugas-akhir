import { Link } from "@inertiajs/react";
import Logo from "@/assets/icon/logo.svg";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Material", href: "/material" },
    { name: "About", href: "/about" },
];

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
                <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between gap-10">
                    {/* Logo + copyright */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-3">
                            <img
                                src={Logo}
                                alt="Logo"
                                className="w-24 md:w-32"
                            />
                        </div>
                        <p className="text-gray-400 text-xs mt-2">
                            © 2026 Wariku. All rights reserved.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-gray-500 text-sm hover:text-gray-800 mb-2 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
