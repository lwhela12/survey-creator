
'use client';

import React, { useState } from 'react';
import Flow from '../components/Flow';
import SpreadsheetUpload from '../components/SpreadsheetUpload';

const BuilderPage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleUpload = (data) => {
    const findKey = (obj, keyToFind) => {
        const normalizedKeyToFind = keyToFind.toLowerCase().replace(/[_ ]/g, "");
        for (const key in obj) {
            if (key.toLowerCase().replace(/[_ ]/g, "") === normalizedKeyToFind) {
                return key;
            }
        }
        return undefined;
    }

    const newNodes = data.map((row, index) => {
      const idKey = findKey(row, 'ID');
      const messageKey = findKey(row, 'Message_Text');

      if (!idKey || row[idKey] === undefined) {
        console.error(`Row ${index + 1} is missing a valid 'ID' column:`, row);
        return null;
      }

      return {
        id: row[idKey].toString(),
        position: { x: 0, y: index * 100 },
        data: { label: row[messageKey] },
      };
    }).filter(Boolean);

    const newEdges = data
      .map((row) => {
        const idKey = findKey(row, 'ID');
        const nextIdKey = findKey(row, 'Next_ID');

        if (idKey && nextIdKey && row[idKey] !== undefined && row[nextIdKey] !== undefined) {
          return {
            id: `e${row[idKey]}-${row[nextIdKey]}`,
            source: row[idKey].toString(),
            target: row[nextIdKey].toString(),
          };
        }
        return null;
      })
      .filter(Boolean);

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleSave = async () => {
    const surveyId = 'mock-survey-id'; // Hardcoded for now
    const surveyData = {
      nodes: nodes.reduce((acc, node) => {
        acc[node.id] = {
          messageText: node.data.label,
          questionType: 'statement', // Hardcoded for now
          nextId: edges.find((edge) => edge.source === node.id)?.target,
        };
        return acc;
      }, {}),
    };

    try {
      const response = await fetch(`http://localhost:3001/api/surveys/${surveyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        console.log('Survey saved successfully');
      } else {
        console.error('Failed to save survey');
      }
    } catch (error) {
      console.error('Error saving survey:', error);
    }
  };

  const handleLoad = async () => {
    const surveyId = 'mock-survey-id'; // Hardcoded for now

    try {
      const response = await fetch(`http://localhost:3001/api/surveys/${surveyId}`);
      if (response.ok) {
        const surveyData = await response.json();
        const newNodes = Object.entries(surveyData.nodes).map(([id, node], index) => ({
          id,
          position: { x: 0, y: index * 100 },
          data: { label: node.messageText },
        }));

        const newEdges = Object.entries(surveyData.nodes)
          .filter(([id, node]) => node.nextId)
          .map(([id, node]) => ({
            id: `e${id}-${node.nextId}`,
            source: id,
            target: node.nextId,
          }));

        setNodes(newNodes);
        setEdges(newEdges);
        console.log('Survey loaded successfully');
      } else {
        console.error('Failed to load survey');
      }
    } catch (error) {
      console.error('Error loading survey:', error);
    }
  };

  return (
    <div className="warren-main-content">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="warren-hero-title mb-2">Burrow Builder</h1>
          <p className="warren-body-text" style={{ color: 'var(--warren-secondary-text)' }}>
            Create your conversational survey burrow by uploading a spreadsheet or building from scratch.
          </p>
        </div>

        <div className="warren-card mb-6">
          <SpreadsheetUpload onUpload={handleUpload} />
        </div>

        <div className="flex gap-4 mb-6">
          <button onClick={handleSave} className="warren-btn-primary">
            Save Burrow
          </button>
          <button onClick={handleLoad} className="warren-btn-secondary">
            Load Burrow
          </button>
        </div>

        <div className="warren-card-large">
          <Flow initialNodes={nodes} initialEdges={edges} />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
