"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "./button";

export function NotFoundPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            {/* 404 Badge */}
            <div className="mb-6">
                <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                    404
                </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Oops! Page not found.
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-lg mb-10 leading-relaxed">
                We couldn’t find the page you’re looking for. It might have been moved or
                doesn’t exist anymore.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="/">
                    <Button variant="primary" className="px-8 shadow-lg shadow-blue-200">
                        Back to homepage
                        <MoveRight className="w-5 h-5 ml-1" />
                    </Button>
                </Link>
                <Link
                    href="/help"
                    className="text-gray-900 font-semibold hover:text-blue-600 transition-colors flex items-center gap-1 group"
                >
                    Visit our Help Center
                    <span className="block h-px w-0 group-hover:w-full bg-blue-600 transition-all duration-300 mx-auto" />
                </Link>
            </div>

            {/* Decorative Background Elements (Optional, but adds to the look) */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl opacity-50" />
            </div>
        </div>
    );
}
