
'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload, Lightbulb } from 'lucide-react';

const SpreadsheetUpload = ({ onUpload }: { onUpload: (data: any[]) => void }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result && typeof result !== 'string') {
          const data = new Uint8Array(result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          if (sheetName) {
            const worksheet = workbook.Sheets[sheetName];
            if (worksheet) {
              const json = XLSX.utils.sheet_to_json(worksheet, { blankrows: false });
              console.log("Parsed JSON from spreadsheet:", json);
              onUpload(json);
              setUploading(false);
            }
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h3 className="warren-section-header mb-4">Upload Your Survey Script</h3>
      <p className="warren-body-text mb-4" style={{ color: 'var(--warren-secondary-text)' }}>
        Upload a CSV or Excel file containing your survey questions. Warren will transform it into an interactive conversation.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <label className="warren-btn-primary cursor-pointer">
          <span className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {uploading ? 'Processing...' : 'Choose File'}
          </span>
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
              Processing your survey...
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--warren-gray-50)', border: '1px solid var(--warren-border)' }}>
        <h4 className="warren-body-text font-semibold mb-2">File Format Requirements:</h4>
        <ul className="warren-body-text text-sm space-y-1" style={{ color: 'var(--warren-secondary-text)' }}>
          <li>• <strong>ID column</strong> (unique identifier) - accepts: Block #, ID, id, item_id, question_id, step</li>
          <li>• <strong>Message/Text column</strong> (question text) - accepts: Question/Content, Message_Text, message, text, question, content</li>
          <li>• <strong>Type column</strong> (optional) - accepts: Response Type, Question_Type, type, kind, format</li>
          <li>• <strong>Next column</strong> (optional, for branching) - accepts: Logic/Branching, Next_ID, next, goto, target</li>
        </ul>
        <p className="warren-secondary-text text-xs mt-2">
          <Lightbulb className="w-3 h-3 inline-block mr-1" />Warren is flexible with column names - if upload fails, check the browser console for available columns.
        </p>
      </div>
    </div>
  );
};

export default SpreadsheetUpload;
