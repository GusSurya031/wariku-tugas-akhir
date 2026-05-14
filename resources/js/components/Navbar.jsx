import { useState, useEffect } from "react";
import Logo from "@/assets/icon/logo.svg";
import { Link } from "@inertiajs/react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Material", href: "/material" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);


    return (
        <nav className="fixed top-5 left-5 right-5 md:left-16 md:right-16 z-50 transition-all duration-300">
            <div
                className={`mx-auto px-4 rounded-lg ${scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : menuOpen ? "bg-white/80" : "bg-transparent"}`}
            >
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex flex-1 items-center gap-2">
                        <img src={Logo} alt="Logo" className="w-24 md:w-32"/>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex  items-center gap-14">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`nav-link text-base font-medium ${item.name === "Home" ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-800"} transition-colors`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex md:flex-1 justify-end items-center gap-3">
                        <Link
                            href="/login"
                            className="px-5 py-2 text-base font-semibold text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-5 py-2 text-base font-semibold text-white bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all duration-200 shadow-md"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div
                            className={`w-5 h-0.5 bg-gray-800 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                        />
                        <div
                            className={`w-5 h-0.5 bg-gray-800 my-1 transition-all ${menuOpen ? "opacity-0" : ""}`}
                        />
                        <div
                            className={`w-5 h-0.5 bg-gray-800 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                        />
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4 px-2 flex flex-col gap-3  rounded-b-2xl">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex gap-3 px-3 pt-2 border-t border-gray-100">
                            <Link
                                href="/login"
                                className="flex-1 text-center px-4 py-2 text-base font-semibold text-blue-600 border-2 border-blue-600 rounded-full"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="flex-1 text-center px-4 py-2 text-base font-semibold text-white bg-yellow-400 rounded-full"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
