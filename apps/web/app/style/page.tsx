'use client';

import React, { useState, useEffect } from 'react';
import StyleEditor from '../components/StyleEditor';

const StylePage = () => {
  const [surveyId, setSurveyId] = useState('mock-survey-id');
  const [styleConfig, setStyleConfig] = useState({});

  const handleStyleChange = (newStyleConfig: any) => {
    setStyleConfig(newStyleConfig);
  };

  const handleSaveStyle = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/surveys/${surveyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          styleConfig: styleConfig
        }),
      });

      if (response.ok) {
        console.log('Style configuration saved successfully');
        alert('Style configuration saved successfully!');
      } else {
        console.error('Failed to save style configuration');
        alert('Failed to save style configuration');
      }
    } catch (error) {
      console.error('Error saving style configuration:', error);
      alert('Error saving style configuration');
    }
  };

  const handleLoadStyle = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/surveys/${surveyId}`);
      if (response.ok) {
        const surveyData = await response.json();
        if (surveyData.styleConfig) {
          setStyleConfig(surveyData.styleConfig);
        }
        console.log('Style configuration loaded successfully');
      } else {
        console.error('Failed to load style configuration');
      }
    } catch (error) {
      console.error('Error loading style configuration:', error);
    }
  };

  useEffect(() => {
    handleLoadStyle();
  }, []);

  return (
    <div className="warren-main-content">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="warren-hero-title mb-2">Warren Style</h1>
            <p className="warren-body-text" style={{ color: 'var(--warren-secondary-text)' }}>
              Customize your burrow's appearance to match your institution's brand and personality.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleLoadStyle}
              className="warren-btn-secondary"
            >
              Load Warren Style
            </button>
            <button
              onClick={handleSaveStyle}
              className="warren-btn-primary"
            >
              Save Warren Style
            </button>
          </div>
        </div>

        <StyleEditor
          surveyId={surveyId}
          initialStyleConfig={styleConfig}
          onStyleChange={handleStyleChange}
        />
      </div>
    </div>
  );
};

export default StylePage;