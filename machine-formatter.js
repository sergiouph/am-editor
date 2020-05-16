function generateVizCode(machine) {
    const output = []
    const notesLegend = {}
    const notesLegendPrefix = '#'
    let notesLegendNextID = 1

    function registerNotesLegend(notes) {
        const key = `${notesLegendPrefix}${notesLegendNextID}`
        notesLegendNextID++
        notesLegend[key] = notes
        return key
    }

    output.push('digraph automaton {\n')
    output.push('  rankdir=LR;\n')
    output.push('  forcelabels=true;\n')

    output.push('\n')
    output.push('  /* States */\n')

    function renderStates(states) {
        for (const state of states) {
            let label = state.name
            let xlabel
        
            if (state.notes.length > 0) {
                xlabel = registerNotesLegend(state.notes)
            }

            output.push('  ')
            output.push(state.name)
            output.push(' [label=')
            output.push(JSON.stringify(label))
            if (xlabel) {
                output.push(', xlabel=')
                output.push(JSON.stringify(xlabel))
            }
            output.push('];\n')
        }
    }

    const normalStates = machine.states.filter(s => !s.accepted)
    if (normalStates.length > 0) {
        output.push('  node [shape = circle];\n')

        renderStates(normalStates)
    }

    const acceptedStates = machine.states.filter(s => s.accepted)
    if (acceptedStates.length > 0) {
        output.push('  node [shape = doublecircle];\n')
    
        renderStates(acceptedStates)
    }

    const initialStates = machine.states.filter(s => s.initial)
    if (initialStates.length > 0) {
        output.push('\n')
        output.push('  /* Initial State Transitions */\n')
        for (const state of initialStates) {
            const tempState = `${state.name}__TEMP__${(Math.random() * 1000000).toFixed(0)}`
            output.push(`  ${tempState} [label="", shape=none];\n`)
            output.push('  ')
            output.push(tempState)
            output.push(' -> ')
            output.push(state.name)
            output.push('[arrowhead=vee];\n')
        }
    }

    output.push('\n')
    output.push('  /* Transitions */\n')

    for (const transition of machine.transitions) {
        let label

        if (transition.symbols.size === 0) {
            label = '\u03B5'
        }
        else {
            label = [...transition.symbols].join(', ')
        }

        if (transition.notes.length > 0) {
            const legendKey = registerNotesLegend(transition.notes)

            label = `${label} / ${legendKey}`
        }

        output.push('  ')
        output.push(transition.source.name)
        output.push(' -> ')
        output.push(transition.target.name)
        output.push(' [label = ')
        output.push(JSON.stringify(label))
        output.push('];\n')
    }

    if (Object.keys(notesLegend).length > 0) {
        output.push('\n')
        output.push('  /* Notes Legend */\n')
        output.push('  node [shape=plaintext]\n')
        output.push('  subgraph notes_legend { \n')
        output.push('    label="Notes";\n')
        output.push('    label="Notes";\n')
        output.push('    notes_legend_table [label=<\n')
        output.push('      <table border="0" cellpadding="2" cellspacing="0" cellborder="1">\n')
        
        for (const key of Object.keys(notesLegend)) {
            output.push(`      <tr><td>${key}</td><td>${JSON.stringify(notesLegend[key])}</td></tr>`)
        }

        output.push('      </table>\n')
        output.push('    >]\n')
        output.push('  }\n')
    }
    
    output.push('}\n')

    return output.join('')
}