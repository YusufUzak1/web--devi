/**
 * Input Bileşeni
 * Durumlar: normal, error, disabled
 */
export default function Input({
    label,
    error,
    disabled = false,
    id,
    className = '',
    ...props
}) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    const baseClasses =
        'w-full px-4 py-2.5 rounded-md font-sans text-sm transition-all duration-200 focus:outline-none'

    const stateClasses = error
        ? 'bg-bg-secondary border-2 border-error text-text placeholder-text-muted/60 focus:border-error focus:ring-2 focus:ring-error/20 dark:bg-bg-card dark:border-error dark:text-text'
        : disabled
            ? 'bg-bg-secondary/50 border-2 border-primary/10 text-text-muted cursor-not-allowed opacity-60 dark:bg-bg-card/50 dark:border-primary-light/10'
            : 'bg-bg-secondary border-2 border-primary/20 text-text placeholder-text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-bg-card dark:border-primary-light/20 dark:text-text dark:focus:border-primary-light dark:focus:ring-primary-light/20'

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-xs font-semibold uppercase tracking-wide text-text-heading dark:text-text-heading"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`${baseClasses} ${stateClasses}`}
                disabled={disabled}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? `${inputId}-error` : undefined}
                {...props}
            />
            {error && (
                <small
                    id={`${inputId}-error`}
                    className="text-xs text-error"
                    role="alert"
                >
                    {error}
                </small>
            )}
        </div>
    )
}
