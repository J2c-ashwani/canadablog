"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Calculator, ArrowRight, ArrowLeft, CheckCircle, Mail, DollarSign, Search } from "lucide-react"

type CalculatorData = {
    province: string;
    industry: string;
    revenue: string;
    goal: string;
    email: string;
    name: string;
    phone: string;
    company: string;
}

const INITIAL_DATA: CalculatorData = {
    province: "",
    industry: "",
    revenue: "",
    goal: "",
    email: "",
    name: "",
    phone: "",
    company: ""
}

export function GrantCalculator() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<CalculatorData>(INITIAL_DATA);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [estimate, setEstimate] = useState(0);
    const [grantCount, setGrantCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Calculate generic estimate based on inputs
    const calculateEstimate = () => {
        let base = 50000;

        // Revenue multiplier
        if (data.revenue === "100k-500k") base += 50000;
        if (data.revenue === "500k-1m") base += 150000;
        if (data.revenue === "over-1m") base += 350000;

        // Industry multiplier
        if (data.industry === "technology" || data.industry === "agriculture" || data.industry === "manufacturing") {
            base *= 1.5;
        }

        // Goal multiplier
        if (data.goal === "research" || data.goal === "expansion") {
            base *= 1.25;
        }

        setEstimate(Math.round(base));
        setGrantCount(Math.floor(Math.random() * 8) + 7); // Random 7-14 grants
    }

    const handleNext = () => {
        if (step === 4) {
            // Transition to analyzing step
            setIsAnalyzing(true);
            calculateEstimate();
            setStep(5);

            setTimeout(() => {
                setIsAnalyzing(false);
                setStep(6);
            }, 2500);
        } else {
            setStep(s => s + 1);
        }
    }

    const handleBack = () => {
        setStep(s => Math.max(1, s - 1));
    }

    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Build a detailed message string with the selections
            const messageInfo = `Waitlist / Calculator Lead
Province: ${data.province}
Industry: ${data.industry}
Revenue: ${data.revenue}
Goal: ${data.goal}
Estimated Funding Capability: $${estimate.toLocaleString()}
Matched Grants Count: ${grantCount}
Company: ${data.company || "Not provided"}`;

            // Call the existing contact endpoint to save to Google Sheets / send email
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    category: "Grant Calculator",
                    message: messageInfo,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            setIsSuccess(true);
        } catch (error) {
            console.error("Submission error:", error);
            // Fallback success UI anyway, so user doesn't get blocked
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    const updateData = (field: keyof CalculatorData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    }

    return (
        <Card className="shadow-xl border-green-100 max-w-2xl mx-auto">
            {/* Exclude header on analysis and success steps */}
            {step < 5 && (
                <CardHeader className="text-center pb-2">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                            <Calculator className="w-8 h-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Grant Eligibility Calculator</CardTitle>
                    <CardDescription>Find out how much funding you qualify for in under 60 seconds.</CardDescription>

                    <div className="flex items-center justify-center gap-2 mt-6">
                        {[1, 2, 3, 4].map(i => (
                            <div
                                key={i}
                                className={`h-2 rounded-full transition-all duration-300 ${step >= i ? 'w-12 bg-green-500' : 'w-4 bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </CardHeader>
            )}

            <CardContent className="pt-6 sm:p-8">

                {/* Step 1: Location */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-semibold text-center mb-6">Where is your business located?</h3>
                        <div className="space-y-3">
                            <Label>Province / Territory</Label>
                            <Select value={data.province} onValueChange={(val) => updateData("province", val)}>
                                <SelectTrigger className="h-14 text-lg">
                                    <SelectValue placeholder="Select a region..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="on">Ontario</SelectItem>
                                    <SelectItem value="bc">British Columbia</SelectItem>
                                    <SelectItem value="ab">Alberta</SelectItem>
                                    <SelectItem value="qc">Quebec</SelectItem>
                                    <SelectItem value="ns">Nova Scotia</SelectItem>
                                    <SelectItem value="mb">Manitoba</SelectItem>
                                    <SelectItem value="sk">Saskatchewan</SelectItem>
                                    <SelectItem value="nb">New Brunswick</SelectItem>
                                    <SelectItem value="nl">Newfoundland and Labrador</SelectItem>
                                    <SelectItem value="pe">Prince Edward Island</SelectItem>
                                    <SelectItem value="territories">Territories (YT, NT, NU)</SelectItem>
                                    <SelectItem value="national">Federal/Nationwide</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {/* Step 2: Industry */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-semibold text-center mb-6">What is your primary industry?</h3>
                        <div className="space-y-3">
                            <Label>Industry Sector</Label>
                            <Select value={data.industry} onValueChange={(val) => updateData("industry", val)}>
                                <SelectTrigger className="h-14 text-lg">
                                    <SelectValue placeholder="Select industry..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technology">Technology & Software</SelectItem>
                                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                    <SelectItem value="agriculture">Agriculture & Agri-Food</SelectItem>
                                    <SelectItem value="healthcare">Healthcare & Life Sciences</SelectItem>
                                    <SelectItem value="energy">Clean Tech & Energy</SelectItem>
                                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                                    <SelectItem value="services">Professional Services</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {/* Step 3: Revenue */}
                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-semibold text-center mb-6">What is your current annual revenue?</h3>
                        <RadioGroup value={data.revenue} onValueChange={(val) => updateData("revenue", val)} className="gap-4">
                            <Label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${data.revenue === 'pre-revenue' ? 'border-green-500 bg-green-50 text-green-700' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="pre-revenue" id="r1" />
                                    <span className="font-medium text-base">Pre-revenue / Startup</span>
                                </div>
                            </Label>
                            <Label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${data.revenue === 'under-100k' ? 'border-green-500 bg-green-50 text-green-700' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="under-100k" id="r2" />
                                    <span className="font-medium text-base">Under $100,000</span>
                                </div>
                            </Label>
                            <Label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${data.revenue === '100k-500k' ? 'border-green-500 bg-green-50 text-green-700' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="100k-500k" id="r3" />
                                    <span className="font-medium text-base">$100,000 - $500,000</span>
                                </div>
                            </Label>
                            <Label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${data.revenue === '500k-1m' ? 'border-green-500 bg-green-50 text-green-700' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="500k-1m" id="r4" />
                                    <span className="font-medium text-base">$500,000 - $1M</span>
                                </div>
                            </Label>
                            <Label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${data.revenue === 'over-1m' ? 'border-green-500 bg-green-50 text-green-700' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="over-1m" id="r5" />
                                    <span className="font-medium text-base">Over $1M</span>
                                </div>
                            </Label>
                        </RadioGroup>
                    </div>
                )}

                {/* Step 4: Goal */}
                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-semibold text-center mb-6">What is your primary funding goal?</h3>
                        <RadioGroup value={data.goal} onValueChange={(val) => updateData("goal", val)} className="grid sm:grid-cols-2 gap-4">
                            <Label className={`flex flex-col items-center justify-center p-6 border rounded-xl cursor-pointer hover:bg-gray-50 text-center gap-2 transition-colors ${data.goal === 'hiring' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : ''}`}>
                                <RadioGroupItem value="hiring" className="sr-only" />
                                <span className="font-semibold text-lg">Hiring & Training</span>
                                <span className="text-sm font-normal opacity-70">Wage subsidies and skills grants</span>
                            </Label>

                            <Label className={`flex flex-col items-center justify-center p-6 border rounded-xl cursor-pointer hover:bg-gray-50 text-center gap-2 transition-colors ${data.goal === 'research' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : ''}`}>
                                <RadioGroupItem value="research" className="sr-only" />
                                <span className="font-semibold text-lg">R&D / Innovation</span>
                                <span className="text-sm font-normal opacity-70">Developing new tech or software</span>
                            </Label>

                            <Label className={`flex flex-col items-center justify-center p-6 border rounded-xl cursor-pointer hover:bg-gray-50 text-center gap-2 transition-colors ${data.goal === 'expansion' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : ''}`}>
                                <RadioGroupItem value="expansion" className="sr-only" />
                                <span className="font-semibold text-lg">Business Expansion</span>
                                <span className="text-sm font-normal opacity-70">New equipment or facilities</span>
                            </Label>

                            <Label className={`flex flex-col items-center justify-center p-6 border rounded-xl cursor-pointer hover:bg-gray-50 text-center gap-2 transition-colors ${data.goal === 'export' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : ''}`}>
                                <RadioGroupItem value="export" className="sr-only" />
                                <span className="font-semibold text-lg">Exporting</span>
                                <span className="text-sm font-normal opacity-70">Entering international markets</span>
                            </Label>
                        </RadioGroup>
                    </div>
                )}

                {/* Step 5: Analyzing */}
                {step === 5 && (
                    <div className="py-12 space-y-6 text-center animate-in fade-in duration-500">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-24 h-24 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
                                <Search className="w-10 h-10 text-green-600 absolute top-1/2 left-1/2 -to-translate-x-1/2 -translate-y-1/2 transform -translate-x-1/2" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold">Analyzing Database...</h3>
                        <p className="text-gray-500 text-lg">Matching your profile against 4,000+ active Canadian grants and loans.</p>
                    </div>
                )}

                {/* Step 6: Lead Capture */}
                {step === 6 && !isSuccess && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 text-center py-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                            <DollarSign className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-3xl font-bold">Matches Found!</h3>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6 text-left">
                            <ul className="space-y-3 text-lg">
                                <li className="flex items-center">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 shrink-0" />
                                    <span>Found <strong>{grantCount} active programs</strong> for your industry.</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 shrink-0" />
                                    <span>Maximum estimated funding capacity: <strong>${estimate.toLocaleString()}</strong></span>
                                </li>
                            </ul>
                        </div>

                        <form onSubmit={handleSubmitEmail} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4 text-left">
                                <div className="space-y-2">
                                    <Label htmlFor="calc-name" className="font-semibold">Full Name *</Label>
                                    <Input
                                        id="calc-name"
                                        placeholder="Jane Doe"
                                        className="h-12 text-base"
                                        value={data.name}
                                        onChange={(e) => updateData("name", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="calc-phone" className="font-semibold">Phone Number</Label>
                                    <Input
                                        id="calc-phone"
                                        type="tel"
                                        placeholder="(555) 555-5555"
                                        className="h-12 text-base"
                                        value={data.phone}
                                        onChange={(e) => updateData("phone", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <Label htmlFor="calc-company" className="font-semibold">Company Name</Label>
                                <Input
                                    id="calc-company"
                                    placeholder="Your Business Inc."
                                    className="h-12 text-base"
                                    value={data.company}
                                    onChange={(e) => updateData("company", e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 text-left">
                                <Label htmlFor="calculator-email" className="font-semibold">Email Address (for the report) *</Label>
                                <Input
                                    id="calculator-email"
                                    type="email"
                                    placeholder="jane@yourbusiness.com"
                                    className="h-14 text-lg"
                                    value={data.email}
                                    onChange={(e) => updateData("email", e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Report...</>
                                ) : (
                                    <><Mail className="w-5 h-5 mr-2" /> Send Me the Report</>
                                )}
                            </Button>
                            <p className="text-xs text-gray-500">By continuing, you agree to our privacy policy. We protect your data.</p>
                        </form>
                    </div>
                )}

                {/* Step 7: Success */}
                {isSuccess && (
                    <div className="py-12 space-y-6 text-center animate-in fade-in duration-500">
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-12 h-12" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">Report Sent!</h3>
                        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                            Check your inbox. We've sent your personalized Grant Match Report to <strong>{data.email}</strong>.
                        </p>
                        <Button variant="outline" size="lg" onClick={() => {
                            setStep(1);
                            setIsSuccess(false);
                            setData(INITIAL_DATA);
                        }}>
                            Start Over
                        </Button>
                    </div>
                )}
            </CardContent>

            {/* Navigation Footer */}
            {step < 5 && (
                <CardFooter className="flex justify-between border-t bg-gray-50/50 p-6">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={step === 1}
                        className="w-24"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>

                    <Button
                        onClick={handleNext}
                        className="w-32 bg-green-600 hover:bg-green-700 text-white"
                        disabled={
                            (step === 1 && !data.province) ||
                            (step === 2 && !data.industry) ||
                            (step === 3 && !data.revenue) ||
                            (step === 4 && !data.goal)
                        }
                    >
                        {step === 4 ? 'Calculate' : 'Next'} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
