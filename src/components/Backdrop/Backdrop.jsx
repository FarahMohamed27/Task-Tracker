import React from 'react'
import './Backdrop.css'

export default function Backdrop({children, onClose}) {
    return (
        <div className="backdrop" onClick={onClose}>
          <div className="backdrop-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      );
}
