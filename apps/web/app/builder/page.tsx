'use client';

import React, { useState } from 'react';
import Flow from '../components/Flow';
import SpreadsheetUpload from '../components/SpreadsheetUpload';

const BuilderPage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'warning', message: string } | null>(null);

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleUpload = (data) => {
    setIsLoading(true);
    
    try {
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
          position: { x: 100 + (index % 3) * 250, y: 50 + Math.floor(index / 3) * 150 },
          data: { 
            label: row[messageKey],
            questionType: row[findKey(row, 'Question_Type')] || 'statement'
          },
          style: {
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '2px solid #e7e7ef',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(33, 150, 243, 0.2)',
            minWidth: '200px'
          }
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
              style: {
                stroke: '#6EAD7C',
                strokeWidth: 3,
                strokeDasharray: '5,5'
              },
              animated: true
            };
          }
          return null;
        })
        .filter(Boolean);

      setNodes(newNodes);
      setEdges(newEdges);
      showNotification('success', `🎉 Successfully created burrow with ${newNodes.length} nodes!`);
    } catch (error) {
      console.error('Error processing upload:', error);
      showNotification('error', '❌ Failed to process your spreadsheet. Please check the format.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const surveyId = 'mock-survey-id';
    
    try {
      const surveyData = {
        nodes: nodes.reduce((acc, node) => {
          acc[node.id] = {
            messageText: node.data.label,
            questionType: node.data.questionType || 'statement',
            nextId: edges.find((edge) => edge.source === node.id)?.target,
          };
          return acc;
        }, {}),
      };

      const response = await fetch(`http://localhost:3001/api/surveys/${surveyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        showNotification('success', '💾 Burrow saved successfully! Your survey is ready.');
      } else {
        showNotification('error', '❌ Failed to save burrow. Please try again.');
      }
    } catch (error) {
      console.error('Error saving survey:', error);
      showNotification('error', '❌ Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = async () => {
    setIsLoading(true);
    const surveyId = 'mock-survey-id';

    try {
      const response = await fetch(`http://localhost:3001/api/surveys/${surveyId}`);
      if (response.ok) {
        const surveyData = await response.json();
        const newNodes = Object.entries(surveyData.nodes).map(([id, node], index) => ({
          id,
          position: { x: 100 + (index % 3) * 250, y: 50 + Math.floor(index / 3) * 150 },
          data: { 
            label: node.messageText,
            questionType: node.questionType || 'statement'
          },
          style: {
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '2px solid #e7e7ef',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(3, 46, 70, 0.12)',
            minWidth: '200px'
          }
        }));

        const newEdges = Object.entries(surveyData.nodes)
          .filter(([id, node]) => node.nextId)
          .map(([id, node]) => ({
            id: `e${id}-${node.nextId}`,
            source: id,
            target: node.nextId,
            style: {
              stroke: '#6EAD7C',
              strokeWidth: 3,
              strokeDasharray: '5,5'
            },
            animated: true
          }));

        setNodes(newNodes);
        setEdges(newEdges);
        showNotification('success', '📂 Burrow loaded successfully!');
      } else {
        showNotification('error', '❌ Failed to load burrow. Survey not found.');
      }
    } catch (error) {
      console.error('Error loading survey:', error);
      showNotification('error', '❌ Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSample = () => {
    const sampleNodes = [
      {
        id: '1',
        position: { x: 100, y: 50 },
        data: { 
          label: 'Welcome to our course feedback survey! 🎓',
          questionType: 'statement'
        },
        style: {
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          border: '2px solid #2196f3',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 4px 16px rgba(33, 150, 243, 0.2)',
          minWidth: '200px'
        }
      },
      {
        id: '2',
        position: { x: 350, y: 50 },
        data: { 
          label: 'What is your name?',
          questionType: 'text'
        },
        style: {
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '2px solid #e7e7ef',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 4px 16px rgba(3, 46, 70, 0.12)',
          minWidth: '200px'
        }
      },
      {
        id: '3',
        position: { x: 600, y: 50 },
        data: { 
          label: 'How would you rate this course overall?',
          questionType: 'single_choice'
        },
        style: {
          background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
          border: '2px solid #4caf50',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 4px 16px rgba(76, 175, 80, 0.2)',
          minWidth: '200px'
        }
      }
    ];

    const sampleEdges = [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        style: {
          stroke: '#6EAD7C',
          strokeWidth: 3,
          strokeDasharray: '5,5'
        },
        animated: true
      },
      {
        id: 'e2-3',
        source: '2',
        target: '3',
        style: {
          stroke: '#6EAD7C',
          strokeWidth: 3,
          strokeDasharray: '5,5'
        },
        animated: true
      }
    ];

    setNodes(sampleNodes);
    setEdges(sampleEdges);
    showNotification('success', '✨ Sample burrow created! Feel free to modify and customize.');
  };

  return (
    <div className="warren-main-content">
      <div className="container mx-auto">
        {/* Notification */}
        {notification && (
          <div className={`mb-6 ${
            notification.type === 'success' ? 'warren-success' : 
            notification.type === 'warning' ? 'warren-warning' : 
            'warren-error'
          }`}>
            {notification.message}
          </div>
        )}

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center text-2xl">
              🏗️
            </div>
            <div>
              <h1 className="warren-hero-title mb-2">Burrow Builder</h1>
              <p className="warren-body-text" style={{ color: 'var(--warren-secondary-text)' }}>
                Create your conversational survey burrow by uploading a spreadsheet or building from scratch.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="warren-card text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="warren-body-text font-semibold">{nodes.length}</div>
              <div className="warren-secondary-text text-sm">Survey Nodes</div>
            </div>
            <div className="warren-card text-center">
              <div className="text-2xl mb-2">🔗</div>
              <div className="warren-body-text font-semibold">{edges.length}</div>
              <div className="warren-secondary-text text-sm">Connections</div>
            </div>
            <div className="warren-card text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="warren-body-text font-semibold">Live</div>
              <div className="warren-secondary-text text-sm">Preview Ready</div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="warren-card-large mb-8">
          <SpreadsheetUpload onUpload={handleUpload} />
          
          {/* Or Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="px-4 warren-secondary-text font-medium">or</div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          {/* Quick Actions */}
          <div className="text-center">
            <h3 className="warren-section-header text-lg mb-4">Quick Start Options</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleCreateSample}
                className="warren-btn-secondary"
                disabled={isLoading}
              >
                <span>✨</span>
                Create Sample Burrow
              </button>
              <button 
                onClick={handleLoad}
                className="warren-btn-secondary"
                disabled={isLoading}
              >
                <span>📂</span>
                Load Existing Burrow
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={handleSave} 
            className="warren-btn-primary"
            disabled={isLoading || nodes.length === 0}
          >
            {isLoading ? (
              <>
                <div className="warren-loading"></div>
                Saving...
              </>
            ) : (
              <>
                <span>💾</span>
                Save Burrow
              </>
            )}
          </button>
          
          <button 
            onClick={handleLoad} 
            className="warren-btn-secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="warren-loading"></div>
                Loading...
              </>
            ) : (
              <>
                <span>📂</span>
                Load Burrow
              </>
            )}
          </button>

          {nodes.length > 0 && (
            <a 
              href="/style" 
              className="warren-btn-success"
            >
              <span>🎨</span>
              Style Your Warren
            </a>
          )}

          {nodes.length > 0 && (
            <a 
              href="/survey/mock-survey-id" 
              className="warren-btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>👁️</span>
              Preview Burrow
            </a>
          )}
        </div>

        {/* Flow Editor */}
        <div className="warren-card-large">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="warren-section-header">Visual Burrow Editor</h2>
            {nodes.length === 0 && (
              <div className="warren-secondary-text text-sm">
                Upload a spreadsheet or create a sample to get started
              </div>
            )}
          </div>
          
          <div className="relative">
            {nodes.length === 0 ? (
              // Empty State
              <div className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="text-6xl mb-4">🐰</div>
                  <h3 className="warren-section-header text-lg mb-2">Ready to Dig Your First Burrow?</h3>
                  <p className="warren-secondary-text mb-6">
                    Upload your survey spreadsheet above or create a sample burrow to see the visual editor in action.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={handleCreateSample}
                      className="warren-btn-primary"
                    >
                      <span>✨</span>
                      Create Sample Burrow
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Flow Editor
              <div style={{ height: '600px', border: '1px solid var(--warren-border)', borderRadius: 'var(--warren-radius-lg)' }}>
                <Flow initialNodes={nodes} initialEdges={edges} />
              </div>
            )}
          </div>
          
          {nodes.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="warren-body-text font-semibold mb-2 text-blue-800">💡 Editor Tips:</h4>
              <ul className="warren-secondary-text text-sm space-y-1 text-blue-700">
                <li>• Drag nodes to rearrange your conversation flow</li>
                <li>• Connect nodes by dragging from the edge handles</li>
                <li>• Use the minimap and controls in the bottom right</li>
                <li>• Different colors represent different question types</li>
              </ul>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="warren-card-large mt-8">
          <h2 className="warren-section-header mb-4">Need Help Getting Started?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="warren-body-text font-semibold mb-2">📋 Spreadsheet Format</h4>
              <p className="warren-secondary-text text-sm mb-4">
                Your spreadsheet should include these columns:
              </p>
              <ul className="warren-secondary-text text-sm space-y-1">
                <li><strong>ID:</strong> Unique identifier for each question</li>
                <li><strong>Message_Text:</strong> The question or message text</li>
                <li><strong>Question_Type:</strong> statement, text, number, single_choice, multi_choice</li>
                <li><strong>Next_ID:</strong> Which question comes next</li>
              </ul>
            </div>
            <div>
              <h4 className="warren-body-text font-semibold mb-2">🎯 Best Practices</h4>
              <ul className="warren-secondary-text text-sm space-y-1">
                <li>• Start with a friendly welcome message</li>
                <li>• Keep questions clear and concise</li>
                <li>• Use Warren's conversational tone</li>
                <li>• Test your flow before sharing</li>
                <li>• Consider branching for personalized paths</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <a href="/docs" className="warren-btn-secondary">
              <span>📖</span>
              View Full Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;