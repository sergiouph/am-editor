import { useEffect } from 'react'

export function useAsync(promise) {
    useEffect(() => {
        try {
            promise().then().catch(console.error)
        }
        catch(e) {
            console.error(e)
        }
    })
}