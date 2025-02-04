import {useState} from 'react';

interface ExpandableTextProps {
    children: string;
    maxLength: number;
}

const ExpandableText = ({children, maxLength}: ExpandableTextProps) => {
    if (children.length <= maxLength) return <div>{children}</div>;

    const [isExpanded, setIsExpanded] = useState(false);

    const expand = () => setIsExpanded(!isExpanded);

    const text = isExpanded ?
        children : children.substring(0, maxLength);

  return (
    <div>{text}{!isExpanded ? '...' : null} <button onClick={expand}>{!isExpanded ? 'More' : 'Less'}</button>
    </div>
  )
}

export default ExpandableText