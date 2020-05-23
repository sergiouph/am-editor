import React, { useEffect, useState } from 'react'
import { TabFolder, TabItem } from './TabFolder'
import { Syntax } from './Syntax'
import { About } from './About'

export const Menu = () => {
    return (
        <TabFolder className="menu">
            <TabItem value='Syntax'>
                <Syntax />       
            </TabItem>
            <TabItem value='About'>
                <About />
            </TabItem>
        </TabFolder>
    )
}