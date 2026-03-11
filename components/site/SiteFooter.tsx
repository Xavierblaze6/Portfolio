import { profile } from '@/lib/profile'

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-8 text-center text-[13px] text-[#333333]">
      <div className="max-w-container" style={{ fontFamily: 'var(--font-body)' }}>
        <p>
          Designed & built by {profile.name} · Next.js + Tailwind
          <br />
          © 2025
        </p>
        <span className="font-mono text-[10px] select-none" style={{ color: '#1a1a1a' }}>
          // try: g → m
        </span>
      </div>
    </footer>
  )
}
