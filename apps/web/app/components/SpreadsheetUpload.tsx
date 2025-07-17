
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
      <input type="file" onChange={handleFileUpload} disabled={uploading} accept=".csv, .xlsx" />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default SpreadsheetUpload;
