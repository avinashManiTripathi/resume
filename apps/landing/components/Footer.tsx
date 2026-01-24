"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { ENV } from "@/app/env";
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button";
import { FOOTER } from "@/constants/footer";

export function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000);
        setEmail("");
    };

    const { newsletter, brand, socials, links, bottomLinks } = FOOTER;

    return (
        <footer className="bg-gray-50 text-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Newsletter */}
                <div className="border-b border-gray-200 py-8 mb-12 text-center">
                    <h3 className="text-gray-900 font-bold text-xl mb-2">
                        {newsletter.title}
                    </h3>
                    <p className="text-sm mb-6">{newsletter.description}</p>
                    <div className="flex gap-3 max-w-md mx-auto">
                        <Input
                            type={"email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name={"email"}
                            placeholder={newsletter.placeholder}
                            className=""
                        />
                        <Button variant="primary" onClick={() => handleSubscribe}>
                            {subscribed ? newsletter.successText : <>
                                {newsletter.buttonText}
                                <Send className="w-4 h-4" />
                            </>}
                        </Button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-6 gap-8 mb-12">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Image src={brand.logo} alt={brand.name} width={120} height={30} className="object-contain" />
                        <p className="text-sm my-6 max-w-md">{brand.description}</p>

                        <div className="mt-6space-y-3 text-sm flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-500" />
                                <Link href={`mailto:${ENV.SUPPORT_EMAIL}`}>
                                    {ENV.SUPPORT_EMAIL}
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-500" />
                                {brand.phone}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-500" />
                                {brand.location}
                            </div>
                        </div>



                        {/* Socials */}
                        <div className="mt-6 flex gap-3">
                            {socials.map((s) => (
                                <Link
                                    key={s.name}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors group"
                                    aria-label={`Follow us on ${s.name}`}
                                >
                                    <s.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([section, items]) => (
                        <div key={section}>
                            <h4 className="font-bold mb-4 uppercase text-sm">
                                {section}
                            </h4>
                            <ul className="space-y-3 text-sm">
                                {items.map((l) => (
                                    <li key={l.href}>
                                        <Link href={l.href} className="hover:text-blue-600">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="border-t pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm">
                    <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
                    <div className="flex gap-6">
                        {bottomLinks.map((l) => (
                            <Link key={l.href} href={l.href} className="hover:text-blue-600">
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
