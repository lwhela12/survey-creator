'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ChatClient from '../../components/ChatClient';

interface SurveyData {
  id: string;
  name: string;
  nodes: any;
  styleConfig: any;
}

const PublicSurveyPage = () => {
  const params = useParams();
  const surveyId = params.surveyId as string;
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<{[key: string]: any}>({});

  useEffect(() => {
    loadSurveyData();
  }, [surveyId]);

  const loadSurveyData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/surveys/${surveyId}/public`);
      
      if (response.ok) {
        const data = await response.json();
        setSurveyData(data);
        setError(null);
      } else {
        setError('Survey not found or not available');
      }
    } catch (err) {
      setError('Failed to load survey');
      console.error('Error loading survey:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (questionId: string, answer: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading survey...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Survey Not Available</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadSurveyData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!surveyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">No survey data available</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: surveyData.styleConfig?.chatBackground || 'var(--warren-page-background)' }}
    >
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="warren-hero-title mb-2" style={{ color: 'var(--warren-primary-dark-blue)' }}>
            🐰 {surveyData.name || 'Warren Burrow'}
          </h1>
          <p className="warren-body-text" style={{ color: 'var(--warren-secondary-text)' }}>
            Welcome to this conversational burrow. Warren will guide you through some questions to gather your valuable insights.
          </p>
        </div>

        <div className="warren-card-large shadow-lg overflow-hidden">
          <ChatClient
            surveyId={surveyId}
            styleConfig={surveyData.styleConfig}
            onResponse={handleResponse}
          />
        </div>

        <div className="mt-4 text-center warren-secondary-text text-sm">
          <p>🐰 Powered by Warren - Your Gateway to Student Voice Insights</p>
        </div>
      </div>
    </div>
  );
};

export default PublicSurveyPage;