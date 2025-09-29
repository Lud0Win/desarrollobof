import { useState, useEffect } from 'react';

// Este hook toma un valor (como el texto de búsqueda) y solo lo actualiza
// después de que el usuario deja de escribir por un tiempo determinado (delay).
// Esto evita hacer llamadas a la API con cada letra tecleada.
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpia el temporizador si el valor cambia (ej: el usuario sigue escribiendo)
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
