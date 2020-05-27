function isSpace(c) {
    return c === ' ' || c === '\n'
}


export class DotWriter {
    
    private buffer: string[]
    private indentation: number

    public constructor() {
        this.buffer = []
        this.indentation = 0
    }
    
    private write(value) {
        if (value.length > 0) {
            this.buffer.push(value)
        }
    }

    private ensureSpace() {
        if (this.buffer.length > 0) {
            const lastItem = this.buffer[this.buffer.length - 1]

            if (!isSpace(lastItem[lastItem.length - 1])) {
                this.buffer.push(' ')
            }
        }
    }

    private ensureBreak() {
        if (this.buffer.length > 0) {
            const lastItem = this.buffer[this.buffer.length - 1]

            if (lastItem[lastItem.length - 1] !== '\n') {
                this.buffer.push('\n')
                this.buffer.push(' '.repeat(this.indentation))
            }
        }
    }

    public writeString(value: string) {
        this.ensureSpace()
        this.write(JSON.stringify(value))
    }

    public writeToken(value: string) {
        this.ensureSpace()
        this.write(value)
    }

    public getCode(): string {
        return this.buffer.join('')
    }

    public writeBody(content: () => void) {
        this.ensureSpace()
        this.write('{')

        this.indentation++

        this.ensureBreak()

        content()

        this.indentation--

        this.ensureBreak()
        this.write('}')
    }

    public writeStatement(content: () => void) {
        this.ensureBreak()

        content()

        this.write(';')
    }

    public writeProperty(name: string, value) {
        this.writeToken(name)
        this.writeToken('=')
        this.writeString(value)
    }

    public writeProperties(properties: object) {
        const names = Object.keys(properties)
        
        if (names.length > 0) {
            this.ensureSpace()
            this.writeToken('[')
    
            let count = 0
    
            for (const name of names) {
                const value = properties[name]
    
                if (value !== null) {
                    if (count > 0) {
                        this.writeToken(',')
                    }
    
                    this.writeProperty(name, value)
    
                    count++
                }
            }
    
            this.writeToken(']')
        }
    }

}