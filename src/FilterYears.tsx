import React, { useState } from 'react';

const YEARS = {
    '0': 'Не выбран',
    '2009': '2009',
    '2008': '2008',
    '2007': '2007',
    '2006': '2006',
    '1990-2005': '1990-2005',
    '1950-1989': '1950-1989',
}
function FilterYears({ onYearChange }: { onYearChange: (year: string) => void }) {
    const [selectedYear, setSelectedYear] = useState('0');
  
    return (
      <div>
        <select value={selectedYear} onChange={(e) => {
          setSelectedYear(e.target.value);
          onYearChange(e.target.value); 
        }}>
          {Object.entries(YEARS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
export default FilterYears