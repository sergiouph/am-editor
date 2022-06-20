function useTemporalElement<T extends HTMLElement>(tagName: string, callback: (element: T) => void) {
    const element = document.createElement(tagName)

    document.body.appendChild(element)

    try {
        callback(element as T)
    }
    finally {
        element.remove()
    }
}


function createFileName(name: string, extension: string): string {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '')
    const nameWithTimestamp = `${name || ''} ${timestamp}`.trim()
    const normalized = []

    for (const c of nameWithTimestamp) {
        if (c.match(/\w/)) {
            normalized.push(c)
        }
        else if (normalized.length === 0 || normalized[normalized.length-1] !== '_') {
            normalized.push('_')
        }
    }

    return `${normalized.join('')}.${extension}`
}


export function downloadSvg(svg: SVGSVGElement, title: string) {
    useTemporalElement<HTMLCanvasElement>('canvas', (canvas) => {
        canvas.width = svg.width.baseVal.value
        canvas.height = svg.height.baseVal.value

        const img = new Image()
        const data = new XMLSerializer().serializeToString(svg)
        const blob = new Blob([data], { type: 'image/svg+xml' })
        const url = window.URL.createObjectURL(blob)
        img.onload = () => {
            const context = canvas.getContext('2d');
            if (context === null) {
                throw new Error('cannot get 2d context');
            }
            context.drawImage(img, 0, 0)
            window.URL.revokeObjectURL(url)
            const uri = canvas.toDataURL('image/png')
            useTemporalElement('a', (a: HTMLAnchorElement) => {
                a.href = uri
                a.target = '_blank'
                a.download = createFileName(title, 'png')
                a.click()
            })
        }
        img.src = url
    })
}
