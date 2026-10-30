import React from 'react'

export interface SocialChannel {
  name: string
  handle: string
  url: string
  description: string
  color: string
  hoverBg: string
  borderColor: string
  icon: (props: { className?: string }) => React.JSX.Element
}

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    name: 'YouTube',
    handle: '@fsidigital',
    url: 'https://www.youtube.com/@fsidigital',
    description: 'Grant breakdowns & daily shorts',
    color: '#FF0000',
    hoverBg: 'hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400',
    borderColor: 'border-red-500/20',
    icon: ({ className = 'w-5 h-5' }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'FSI Digital',
    url: 'https://www.linkedin.com/company/fsidigital',
    description: 'Funding intelligence & policy updates',
    color: '#0A66C2',
    hoverBg: 'hover:bg-blue-500/10 hover:border-blue-500/40 hover:text-blue-400',
    borderColor: 'border-blue-500/20',
    icon: ({ className = 'w-5 h-5' }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@fsidigital.ca',
    url: 'https://www.instagram.com/fsidigital.ca/',
    description: 'Visual guides, reels & carousels',
    color: '#E4405F',
    hoverBg: 'hover:bg-pink-500/10 hover:border-pink-500/40 hover:text-pink-400',
    borderColor: 'border-pink-500/20',
    icon: ({ className = 'w-5 h-5' }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'FSI Digital',
    url: 'https://www.facebook.com/1077759455417325',
    description: 'Daily grant opportunities & announcements',
    color: '#1877F2',
    hoverBg: 'hover:bg-blue-600/10 hover:border-blue-600/40 hover:text-blue-400',
    borderColor: 'border-blue-600/20',
    icon: ({ className = 'w-5 h-5' }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
]

interface SocialIconsRowProps {
  className?: string
  iconClassName?: string
  variant?: 'subtle' | 'branded' | 'pill'
}

/**
 * Clean inline social icons row for footers, headers, and toolbars
 */
export function SocialIconsRow({
  className = 'flex items-center space-x-3',
  iconClassName = 'w-4 h-4',
  variant = 'subtle',
}: SocialIconsRowProps) {
  return (
    <div className={className} role="navigation" aria-label="Official Social Channels">
      {SOCIAL_CHANNELS.map((channel) => {
        const Icon = channel.icon

        if (variant === 'pill') {
          return (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow FSI Digital on ${channel.name}`}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border bg-gray-800/60 text-gray-300 transition-all ${channel.hoverBg}`}
            >
              <Icon className={iconClassName} />
              <span>{channel.name}</span>
            </a>
          )
        }

        if (variant === 'branded') {
          return (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow FSI Digital on ${channel.name}`}
              className={`p-2 rounded-lg bg-gray-800/80 border border-gray-700/60 text-gray-400 transition-all duration-150 ${channel.hoverBg}`}
              title={`${channel.name}: ${channel.description}`}
            >
              <Icon className={iconClassName} />
            </a>
          )
        }

        // Default subtle row (footer copyright bar)
        return (
          <a
            key={channel.name}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow FSI Digital on ${channel.name}`}
            className="text-gray-400 hover:text-white transition-colors duration-150 p-1"
            title={`Follow FSI Digital on ${channel.name}`}
          >
            <Icon className={iconClassName} />
          </a>
        )
      })}
    </div>
  )
}

/**
 * Prominent card/grid block for footers and dedicated contact/about sections
 */
export function SocialChannelsBlock({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-800 bg-gray-900/60 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Connect With FSI Digital
          </h4>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Daily government funding intelligence, video breakdowns &amp; guide updates
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {SOCIAL_CHANNELS.map((channel) => {
          const Icon = channel.icon
          return (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2.5 p-2 rounded-lg border border-gray-800 bg-gray-850/60 hover:bg-gray-800 text-gray-200 transition-all ${channel.hoverBg}`}
            >
              <div className="p-1.5 rounded-md bg-gray-800 text-white flex-shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold leading-tight text-white truncate">
                  {channel.name}
                </div>
                <div className="text-[10px] text-gray-400 truncate">
                  {channel.handle}
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
