import { useState } from 'react'

/**
 * Button Bileşeni
 * Varyantlar: primary, secondary, danger, ghost
 * Boyutlar: sm, md, lg
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    className = '',
    ...props
}) {
    const baseClasses =
        'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-focus disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses = {
        primary:
            'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg active:scale-95 dark:bg-primary-light dark:text-bg dark:hover:bg-primary',
        secondary:
            'bg-bg-secondary text-text border border-primary/30 hover:border-primary hover:bg-primary/10 active:scale-95 dark:bg-bg-card dark:text-text dark:border-primary-light/30 dark:hover:border-primary-light',
        danger:
            'bg-error text-white hover:bg-red-700 shadow-md hover:shadow-lg active:scale-95 dark:bg-error/90 dark:hover:bg-error',
        ghost:
            'bg-transparent text-primary hover:bg-primary/10 active:scale-95 dark:text-primary-light dark:hover:bg-primary-light/10',
    }

    const sizeClasses = {
        sm: 'text-xs px-3 py-1.5 gap-1.5',
        md: 'text-sm px-5 py-2.5 gap-2',
        lg: 'text-base px-7 py-3.5 gap-2.5',
    }

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
