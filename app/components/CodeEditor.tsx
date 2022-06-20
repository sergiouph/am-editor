import React, { ChangeEventHandler } from 'react'

interface CodeEditorProps {
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>
}

export const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
    return <textarea className="code-editor" value={value} onChange={onChange} wrap='off' />
}
