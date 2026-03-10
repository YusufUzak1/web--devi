import { useEffect, useState } from 'react'

/**
 * ThemeToggle Bileşeni
 * Karanlık/Aydınlık tema değiştirme butonu
 * localStorage ile tercih kalıcı hale getirilir
 */
export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved === 'light') {
            setIsDark(false)
            document.documentElement.classList.remove('dark')
        } else {
            setIsDark(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleTheme = () => {
        const next = !isDark
        setIsDark(next)
        if (next) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative w-12 h-12 flex items-center justify-center rounded-full bg-bg-secondary border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group dark:bg-bg-card dark:border-primary-light/20 dark:hover:border-primary-light/50"
            aria-label={isDark ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'}
            title={isDark ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'}
        >
            {/* Güneş ikonu */}
            <svg
                className={`w-5 h-5 text-warning absolute transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            {/* Ay ikonu */}
            <svg
                className={`w-5 h-5 text-primary-light absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
        </button>
    )
}
