import React, { useEffect, createRef } from 'react';
import multirange from 'multirange';

function getChangeHandler(onChange) {
  return function() {
    const [newLow, newHigh] = this.value.split(",").map(i => parseInt(i))
    onChange({ low: newLow, high: newHigh })
  }
}

const MultiRange = ({ className, value, onChange }) => {
  const ref = createRef()

  const { low, high } = value;
  const valueString = [low, high].join(',')

  useEffect(() => {
    ref.current.oninput = getChangeHandler(onChange)
    multirange(ref.current)
  }, [ref, onChange])
  return (
    <div style={{position: 'relative', width: '100%'}}>
      <input className={className} style={{width: "100%"}} ref={ref} type="range" multiple value={valueString} onChange={() => {}} min="0" max="34"/>
    </div>
  );
} 

export default MultiRange;