import { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}

export default function Select({ options, value, onChange, label, id }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="form-group" ref={ref}>
      <label htmlFor={id}>{label}</label>
      <div className={`custom-select ${open ? 'open' : ''}`} id={id} tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(o => !o); if (e.key === 'Escape') setOpen(false); }}
        onClick={() => setOpen(o => !o)}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="custom-select__value">{selected?.label}</span>
        <span className="custom-select__chevron">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>

        {open && (
          <ul className="custom-select__dropdown" role="listbox">
            {options.map(opt => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                className={`custom-select__option ${opt.value === value ? 'selected' : ''}`}
                onMouseDown={e => { e.preventDefault(); handleSelect(opt.value); }}
              >
                <span className="custom-select__option-label">{opt.label}</span>
                {opt.value === value && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3.5 3.5 5.5-6" stroke="#2D6A4F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
