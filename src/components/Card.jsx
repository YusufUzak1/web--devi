/**
 * Card Bileşeni
 * Varyantlar: elevated (gölgeli), outlined (çerçeveli), filled (dolgulu)
 */
export default function Card({
    children,
    variant = 'elevated',
    title,
    className = '',
    ...props
}) {
    const baseClasses =
        'rounded-lg overflow-hidden transition-all duration-300'

    const variantClasses = {
        elevated:
            'bg-bg-card shadow-lg hover:shadow-xl hover:-translate-y-1 border border-transparent dark:bg-bg-card dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
        outlined:
            'bg-transparent border-2 border-primary/20 hover:border-primary/50 dark:border-primary-light/20 dark:hover:border-primary-light/50',
        filled:
            'bg-primary/10 border border-primary/15 hover:bg-primary/15 dark:bg-primary-light/10 dark:border-primary-light/15 dark:hover:bg-primary-light/15',
    }

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {title && (
                <div className="px-5 pt-5 pb-2">
                    <h3 className="text-lg font-bold text-text-heading dark:text-text-heading">
                        {title}
                    </h3>
                </div>
            )}
            <div className="p-5">{children}</div>
        </div>
    )
}
