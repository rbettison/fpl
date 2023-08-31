import Link from "next/link";
import { cn } from "@/lib/utils";
import '../styles/globals.css';


 
export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto px-4">
        <div class="border-b h-[80px] space-y-4">
            <nav class="flex space-x-4 space-y-4">
                <Link 
                    href="/home"
                    className="text-sm font-medium transition-colors text-secondary hover:text-primary px-8"
                >
                    Overview
                </Link>
                <Link
                    href="/about"
                    className="text-sm font-medium transition-colors text-secondary hover:text-primary px-8"
                >
                    About
                </Link>
            </nav>
            </div>
      <Component {...pageProps} />
      </div>
      </>
  )
}