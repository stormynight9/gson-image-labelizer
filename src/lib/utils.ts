import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const recognize = async (url: string) => {
    try {
        const response = await fetch('/api/recognize', {
            method: 'POST',
            body: JSON.stringify({
                inputs: url,
            }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error recognizing image', error)
        return { result: 'Error recognizing image' }
    }
}
