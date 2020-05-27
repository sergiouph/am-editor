import { DotWriter } from './DotWriter'


export class Node {
    name: string
    shape: string
    label: string
    xlabel: string

    constructor(name: string) {
        this.name = name
        this.shape = null
        this.label = null
        this.xlabel = null
    }

    render(writer: DotWriter) {
        writer.writeStatement(() => {
            writer.writeString(this.name)
            writer.writeProperties({
                'shape': this.shape,
                'label': this.label,
                'xlabel': this.xlabel,
            })
        })
    }
}