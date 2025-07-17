'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Survey {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

const SurveyListPage = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/surveys');
      
      if (response.ok) {
        const data = await response.json();
        setSurveys(data);
        setError(null);
      } else {
        setError('Failed to load surveys');
      }
    } catch (err) {
      setError('Failed to load surveys');
      console.error('Error loading surveys:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading surveys...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Surveys</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadSurveys}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="warren-main-content">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="warren-hero-title mb-2">The Den</h1>
            <p className="warren-body-text" style={{ color: 'var(--warren-secondary-text)' }}>
              Browse your collection of conversational burrows and discover student insights.
            </p>
          </div>
          <Link
            href="/builder"
            className="warren-btn-primary"
          >
            🐰 Dig New Burrow
          </Link>
        </div>

        {surveys.length === 0 ? (
          <div className="warren-card-large text-center py-12">
            <div style={{ color: 'var(--warren-secondary-green)' }} className="text-6xl mb-4">🐰</div>
            <h2 className="warren-section-header mb-2">No Burrows Found</h2>
            <p className="warren-body-text mb-4" style={{ color: 'var(--warren-secondary-text)' }}>
              Get started by digging your first conversational burrow with Warren.
            </p>
            <Link
              href="/builder"
              className="warren-btn-primary"
            >
              🐰 Dig New Burrow
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {surveys.map((survey) => (
              <div key={survey.id} className="warren-card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="warren-section-header text-lg mb-2">
                      🐰 {survey.name}
                    </h3>
                    <p className="warren-secondary-text text-sm mb-4">
                      Created: {new Date(survey.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href={`/survey/${survey.id}`}
                        className="warren-btn-primary text-sm"
                      >
                        Enter Burrow
                      </Link>
                      <Link
                        href={`/builder?surveyId=${survey.id}`}
                        className="warren-btn-secondary text-sm"
                      >
                        Edit Burrow
                      </Link>
                      <Link
                        href={`/style?surveyId=${survey.id}`}
                        className="warren-btn-secondary text-sm"
                        style={{ backgroundColor: 'var(--warren-secondary-green)', color: 'white' }}
                      >
                        Style Warren
                      </Link>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="warren-secondary-text text-sm">
                      Burrow ID: {survey.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyListPage;