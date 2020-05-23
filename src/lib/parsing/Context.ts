import { Source } from './Source'
import { Machine } from '../machine-engine'


export class Context {

    source: Source
    machine: Machine

    constructor(source: Source, machine: Machine) {
        this.source = source;
        this.machine = machine
    }

}