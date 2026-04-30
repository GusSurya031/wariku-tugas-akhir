import Logo from "@/assets/icon/logo.svg";

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
            ry="5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
        />
        <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
        />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
);

const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
);

const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
);

const navItems = [
    { name: "Home", href: "/" },
    { name: "Material", href: "/material" },
    { name: "About", href: "/about" },
];

const supportLinks = [
    { name: "Media", href: "#" },
    { name: "News", href: "#" },
    { name: "Support Us", href: "#" },
];

const socialMedia = [
    { icon: <InstagramIcon />, label: "Instagram" },
    { icon: <FacebookIcon />, label: "Facebook" },
    { icon: <TwitterIcon />, label: "Twitter" },
]

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    {/* Logo + copyright */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <img
                                src={Logo}
                                alt="Logo"
                                className="w-24 md:w-32"
                            />
                        </div>
                        <p className="text-gray-400 text-xs mt-6">
                            © 2026 Wariku. All rights reserved.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                        <div>
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block text-gray-500 text-sm hover:text-gray-800 mb-2 transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                ),
                            )}
                        </div>
                        <div>
                            {supportLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block text-gray-500 text-sm hover:text-gray-800 mb-2 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div className="flex items-start gap-3">
                        {socialMedia.map(({ icon, label }) => (
                            <a
                                key={label}
                                href="#"
                                aria-label={label}
                                className="w-10 h-10 bg-gray-100 hover:bg-yellow-400 hover:text-white text-gray-500 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
