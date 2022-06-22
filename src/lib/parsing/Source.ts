const nameFirstChar = /[0-9a-zA-Z_]/
const nameOtherChar = /[0-9a-zA-Z_-]/

const SPECIAL_MARKS = ['\\', '!', ':', ',']

export class Location {
    line: number
    column: number
    position: number

    constructor(line: number, column: number, position: number) {
        this.line = line
        this.column = column
        this.position = position
    }
}


export class Source {
    content: string
    position: number
    length: number

    constructor(content: string) {
        this.content = content
        this.position = 0
        this.length = content.length
    }

    transaction(action: () => boolean): boolean {
        const pos0 = this.position

        if (action()) {
            return true
        }

        this.position = pos0
        return false
    }

    error(message: string, location: Location | null = null) {
        if (location === null) {
            location = this.getLocation()
        }

        throw new Error(`${message} @ ${location.line}, ${location.column}`)
    }

    isAlive(): boolean {
        return this.position < this.length
    }

    pullKeyword(): string | null {
        if (this.pullToken('@')) {
            return this.pullName()
        }

        return null
    }

    pullToken(token: string): boolean {
        for (let i = 0; i < token.length; i++) {
            const char = this.content[this.position + i]

            if (char !== token[i]) {
                return false
            }
        }

        this.position += token.length
        return true
    }

    pullName(): string | null {
        const chars = []

        while (this.position < this.length) {
            const char = this.content[this.position]
            const regex = (chars.length === 0 ? nameFirstChar : nameOtherChar)

            if (char.match(regex)) {
                chars.push(char)
                this.position++
            }
            else {
                break
            }
        }

        // names cannot end with a dash
        if (chars.length > 0 && chars[chars.length - 1] === '-') {
            chars.pop()
            this.position--
        }

        const name = chars.join('')

        if (name.length == 0) {
            return null
        }

        return name
    }

    pullText(stopMarks: string[]): string | null {
        const chars = []

        let escaped = false

        while (this.position < this.length) {
            const char = this.content[this.position]

            if (escaped) {
                escaped = false
                if (!stopMarks.includes(char) && !SPECIAL_MARKS.includes(char)) {
                    throw this.error(`Invalid escaped char: ${JSON.stringify(char)}`)
                }

                chars.push(char)
            }
            else if (char === '\\') {
                escaped = true
            }
            else if (stopMarks.includes(char)) {
                break
            }
            else {
                chars.push(char)
            }

            this.position++
        }

        const text = chars.join('').trim()

        if (text.length === 0) {
            return null
        }

        return text
    }

    skipSpaces() {
        while (this.position < this.length) {
            const char = this.content[this.position]

            if (char === '#') {
                do {
                    this.position++
                } while (this.position < this.length && this.content[this.position] !== '\n')
            }
            else if ([' ', '\t'].includes(char)) {
                this.position++
            }
            else {
                break
            }
        }
    }

    skipLines() {
        while (this.position < this.length) {
            const char = this.content[this.position]

            if (char === '#') {
                do {
                    this.position++
                } while (this.position < this.length && this.content[this.position] !== '\n')
            }
            else if ([' ', '\t', '\n', '\r'].includes(char)) {
                this.position++
            }
            else {
                break
            }
        }
    }

    getLocation() {
        let line = 1
        let column = 1

        for (let i = 0; i < this.position; i++) {
            if (this.content[i] === '\n')  {
                line++
                column = 1
            }
            else {
                column++
            }
        }

        return new Location(line, column, this.position)
    }

}
