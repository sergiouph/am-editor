import React, { useEffect, useState } from 'react'
import { TabFolder, TabItem } from './TabFolder'
import { Syntax } from './Syntax'
import { About } from './About'
import { Options } from './Options'

export const Menu = (props) => {
    return (
        <TabFolder className="menu">
            <TabItem value='Syntax'>
                <Syntax />       
            </TabItem>
            <TabItem value='About'>
                <About />
            </TabItem>
            <TabItem value='Options'>
                <Options options={props.options} setter={props.setter} />       
            </TabItem>
        </TabFolder>
    )
}