import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface SelectBoxProps {
    data: {
        name: string,
        value: string
    }[],
    placeHolder: string,
    onChange: (value: string) => void,
    value: string,
    className: string
}

const SelectBox: React.FC<SelectBoxProps> = ({
    data,
    placeHolder,
    onChange,
    value,
    className
}) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeHolder} />
            </SelectTrigger>
            <SelectContent>
                {
                    data.map((item,index)=>(
                        <SelectItem value={item.value} key={index}>
                            {item.name}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>

    )
}

export default SelectBox