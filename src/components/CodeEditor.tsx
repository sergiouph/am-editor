import React, { useEffect, useState } from 'react'

export const CodeEditor = ({ value, onChange }) => {
    return <textarea className="code-editor" value={value} onChange={onChange} wrap='off' />
}
