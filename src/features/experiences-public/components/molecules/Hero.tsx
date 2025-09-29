'use client'

import { Button } from '@/components/ui/button'
import { Download, Sparkles } from 'lucide-react'

interface HeroProps {
  className?: string
}

export function Hero({ className = '' }: HeroProps) {
  return (
    <section className={`relative py-24 px-4 text-center ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-4xl mx-auto">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full">
          <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Professional Journey
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold">
          <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            Professional
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Experiences
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Explore my professional journey through various roles, technologies, and achievements. 
          From startups to established companies, here's how I've grown and contributed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
          >
            View Timeline
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">5+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">20+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">10+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
          </div>
        </div>
      </div>
    </section>
  )
}