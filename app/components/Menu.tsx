import React from 'react'
import { RenderOptions } from '../lib/machine-formatter'
import { About } from './About'
import { Options } from './Options'
import { Syntax } from './Syntax'
import { TabFolder, TabItem } from './TabFolder'

interface MenuProps {
    options: RenderOptions
    setter: (options: RenderOptions) => void
}

export const Menu = ({ options, setter }: MenuProps) => {
    return (
        <TabFolder className="menu">
            <TabItem value='Syntax'>
                <Syntax />
            </TabItem>
            <TabItem value='About'>
                <About />
            </TabItem>
            <TabItem value='Options'>
                <Options options={options} setter={setter} />
            </TabItem>
        </TabFolder>
    )
}
