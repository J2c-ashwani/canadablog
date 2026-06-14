import type { Metadata } from "next";
import { ReportDeliveryClient } from "./ReportDeliveryClient";

export const metadata: Metadata = {
  title: "Your Funding Match Report | FSI Digital",
  description: "Access your personalized Funding Match Report with matched programs, estimated funding ranges, and application guidance.",
  robots: { index: false, follow: false },
};

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <ReportDeliveryClient />
      </div>
    </main>
  );
}
