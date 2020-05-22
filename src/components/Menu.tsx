import React, { useEffect, useState } from 'react'
import { TabFolder, TabItem } from './TabFolder'

export const Menu = () => {
    return (
        <TabFolder className="menu">
            <TabItem value='Syntax'>
                <p>
                    Initial state: <code>I name</code>
                </p>
                <p>
                    Accepted state: <code>A name</code>
                </p>
                <p>
                    Normal state: <code>S name</code>
                </p>
                <p>
                    Empty transition: <code>T source -> target</code>
                </p>
                <p>
                    Transition with symbol: <code>T source -> target : symbol</code>
                </p>
                <p>
                    Adding actions to states and transitions: append <code>! action</code> to the declaration.
                </p>
                <p>
                    For using names with spaces put it delimited by double-quotes or single-quotes: <code>"name with spaces"</code>
                </p>        
            </TabItem>
            <TabItem value='About'>
                <p>
                    Created by <a href="https://github.com/sergiouph" target="_blank">Sergio P</a>.
                </p>
                <p> 
                    See the <a href="https://github.com/sergiouph/am-editor" target="_blank">GitHub repository</a>.
                </p>
                <p>
                    This app uses  <a href="http://viz-js.com/" target="_blank">Viz.js</a> and <a href="https://www.graphviz.org/doc/info/lang.html" target="_blank">DOT</a> for the diagram rendering.
                </p>
            </TabItem>
        </TabFolder>
    )
}