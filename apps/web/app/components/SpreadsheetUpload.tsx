
'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const SpreadsheetUpload = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { blankrows: false });
        console.log("Parsed JSON from spreadsheet:", json); // <--- ADDED THIS LINE
        onUpload(json);
        setUploading(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h3 className="warren-section-header mb-4">Upload Your Survey Script</h3>
      <p className="warren-body-text mb-4" style={{ color: 'var(--warren-secondary-text)' }}>
        Upload a CSV or Excel file containing your survey questions. Warren will transform it into an interactive burrow.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <label className="warren-btn-primary cursor-pointer">
          {uploading ? 'Digging Burrow...' : 'Choose File'}
          <input 
            type="file" 
            onChange={handleFileUpload} 
            disabled={uploading} 
            accept=".csv, .xlsx"
            className="hidden"
          />
        </label>
        
        {uploading && (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent" 
                 style={{ borderColor: 'var(--warren-primary-dark-blue)' }}></div>
            <p className="warren-body-text" style={{ color: 'var(--warren-secondary-text)' }}>
              Warren is building your burrow...
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--warren-light-blue)' }}>
        <h4 className="warren-body-text font-semibold mb-2">File Format Requirements:</h4>
        <ul className="warren-body-text text-sm space-y-1" style={{ color: 'var(--warren-secondary-text)' }}>
          <li>• ID column (unique identifier for each question)</li>
          <li>• Message_Text column (the question or message text)</li>
          <li>• Question_Type column (statement, text, number, single_choice, multi_choice)</li>
          <li>• Next_ID column (for question flow and branching)</li>
        </ul>
      </div>
    </div>
  );
};

export default SpreadsheetUpload;
