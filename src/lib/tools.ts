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

export function classNames(...args: any[]) {
    const names: string[] = []

    function push(arg: any) {
        if (arg !== null && arg !== undefined) {
            if (typeof arg === 'string') {
                const name = arg.trim()

                if (name) {
                    names.push(name)
                }
            }
            else if (arg.length) {
                for (let i = 0; i < arg.length; i++) {
                    push(arg[i])
                }
            }
            else {
                throw new Error(`Unsupported class name type: ${typeof arg}`)
            }
        }
    }

    for (const arg of args) {
        push(arg)
    }

    return names.join(' ')
}


let nextID = 1

export function uid() {
    const id = `id_${nextID}`
    nextID++
    return id
}