import React, { useEffect, useState, ChangeEventHandler } from 'react'
import { classNames, uid } from '../lib/tools';

interface Option {
    value: string
    label?: string
    help?: string
}

interface OptionGroupProps {
    options: Option[]
    className?: string
    onChange?
    value?: string
}

export const OptionGroup = (props: OptionGroupProps) => {
    const children = props.options.map((option, index) => {
        const isSelected = (props.value === option.value)
        const onClick = () => {
            if (props.onChange) {
                props.onChange(option.value)
            }
        }
        return (
            <span key={index} className={classNames('item', isSelected ? 'selected' : null)} onClick={onClick} title={option.help}>
                <span className="label">{option.label || option.value}</span>
            </span>
        )
    })
    return (
        <span className={classNames(props.className, 'option-group')}>
            {children}
        </span>
    )
};