"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Search, FileText, Bell } from "lucide-react";

export default function GetStartedClient() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                    Start Your Funding Journey
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    We help Canadian businesses find and secure government grants. Choose the path that best fits your current needs.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                {/* Grant Finder Path */}
                <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-emerald-600">
                    <CardHeader>
                        <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600">
                            <Search className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-2xl mb-2">Find a Grant</CardTitle>
                        <CardDescription>
                            Search our comprehensive database of Canadian government grants and funding programs.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <ul className="text-sm text-gray-600 space-y-2 mb-6">
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
                                    Filter by industry & region
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
                                    View eligibility requirements
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
                                    Direct application links
                                </li>
                            </ul>
                            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                                <Link href="/grant-finder" className="flex items-center justify-center">
                                    Search Grants <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Resources Path */}
                <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-blue-600">
                    <CardHeader>
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                            <FileText className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-2xl mb-2">Learn the Process</CardTitle>
                        <CardDescription>
                            New to grants? Read our expert guides on how to prepare successful applications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <ul className="text-sm text-gray-600 space-y-2 mb-6">
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                                    Step-by-step application guides
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                                    Writing tips & best practices
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                                    Success stories & examples
                                </li>
                            </ul>
                            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                                <Link href="/blog" className="flex items-center justify-center">
                                    Read Guides <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Updates Path */}
                <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-purple-600">
                    <CardHeader>
                        <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
                            <Bell className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-2xl mb-2">Stay Updated</CardTitle>
                        <CardDescription>
                            Never miss a funding opportunity. Get notified when new grants match your business.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <ul className="text-sm text-gray-600 space-y-2 mb-6">
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                                    New program alerts
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                                    Deadline reminders
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                                    Policy change updates
                                </li>
                            </ul>
                            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                                <Link href="/contact" className="flex items-center justify-center">
                                    Subscribe for Alerts <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Not sure where to start?</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Our team can help assess your business needs and match you with the right funding opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" variant="outline" className="bg-white">
                        <Link href="/about">About Us</Link>
                    </Button>
                    <Button asChild size="lg">
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
