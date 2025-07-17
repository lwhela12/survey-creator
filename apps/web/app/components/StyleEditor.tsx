'use client';

import React, { useState, useEffect } from 'react';
import ChatClient from './ChatClient';

interface StyleConfig {
  botMessageBg: string;
  userMessageBg: string;
  botMessageText: string;
  userMessageText: string;
  chatBackground: string;
  avatarUrl: string;
  messageDelay: number;
}

interface StyleEditorProps {
  surveyId: string;
  initialStyleConfig?: Partial<StyleConfig>;
  onStyleChange?: (styleConfig: StyleConfig) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({
  surveyId,
  initialStyleConfig = {},
  onStyleChange
}) => {
  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    botMessageBg: '#ECEFF1',
    userMessageBg: '#007AFF',
    botMessageText: '#000000',
    userMessageText: '#FFFFFF',
    chatBackground: '#FFFFFF',
    avatarUrl: '',
    messageDelay: 1200,
    ...initialStyleConfig
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  useEffect(() => {
    if (onStyleChange) {
      onStyleChange(styleConfig);
    }
  }, [styleConfig, onStyleChange]);

  const handleColorChange = (property: keyof StyleConfig, value: string) => {
    setStyleConfig(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const handleDelayChange = (value: number) => {
    setStyleConfig(prev => ({
      ...prev,
      messageDelay: value
    }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setStyleConfig(prev => ({
          ...prev,
          avatarUrl: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      // Handle favicon upload logic here
    }
  };

  const ColorPicker = ({ 
    label, 
    value, 
    onChange 
  }: { 
    label: string; 
    value: string; 
    onChange: (value: string) => void; 
  }) => (
    <div className="flex flex-col gap-1">
      <label className="warren-body-text text-sm font-medium">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-8 border rounded cursor-pointer"
          style={{ borderColor: 'var(--warren-border)' }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="warren-input flex-1 h-10 text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Style Controls Panel */}
      <div className="warren-card-large overflow-y-auto">
        <h2 className="warren-section-header mb-4">Warren Style Configuration</h2>
        
        <div className="space-y-4">
          {/* Message Colors */}
          <div>
            <h3 className="warren-section-header text-lg mb-3">Burrow Message Colors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPicker
                label="Warren Bot Message Background"
                value={styleConfig.botMessageBg}
                onChange={(value) => handleColorChange('botMessageBg', value)}
              />
              <ColorPicker
                label="Warren Bot Message Text"
                value={styleConfig.botMessageText}
                onChange={(value) => handleColorChange('botMessageText', value)}
              />
              <ColorPicker
                label="Student Message Background"
                value={styleConfig.userMessageBg}
                onChange={(value) => handleColorChange('userMessageBg', value)}
              />
              <ColorPicker
                label="Student Message Text"
                value={styleConfig.userMessageText}
                onChange={(value) => handleColorChange('userMessageText', value)}
              />
            </div>
          </div>

          {/* Chat Background */}
          <div>
            <h3 className="warren-section-header text-lg mb-3">Burrow Background</h3>
            <ColorPicker
              label="Burrow Background Color"
              value={styleConfig.chatBackground}
              onChange={(value) => handleColorChange('chatBackground', value)}
            />
          </div>

          {/* Avatar Upload */}
          <div>
            <h3 className="warren-section-header text-lg mb-3">Warren Avatar</h3>
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="warren-input cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:cursor-pointer"
                style={{ 
                  color: 'var(--warren-secondary-text)'
                } as React.CSSProperties}
              />
              {styleConfig.avatarUrl && (
                <div className="flex items-center gap-2">
                  <img 
                    src={styleConfig.avatarUrl} 
                    alt="Warren Avatar" 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="warren-body-text text-sm" style={{ color: 'var(--warren-secondary-text)' }}>
                    Current Warren avatar
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Favicon Upload */}
          <div>
            <h3 className="warren-section-header text-lg mb-3">Burrow Favicon</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleFaviconUpload}
              className="warren-input cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:cursor-pointer"
              style={{ 
                color: 'var(--warren-secondary-text)'
              } as React.CSSProperties}
            />
          </div>

          {/* Message Delay */}
          <div>
            <h3 className="warren-section-header text-lg mb-3">Warren Conversation Pacing</h3>
            <div className="flex flex-col gap-2">
              <label className="warren-body-text text-sm font-medium">
                Message Delay: {styleConfig.messageDelay}ms
              </label>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={styleConfig.messageDelay}
                onChange={(e) => handleDelayChange(parseInt(e.target.value))}
                className="w-full"
                style={{ accentColor: 'var(--warren-primary-dark-blue)' }}
              />
              <div className="flex justify-between warren-secondary-text text-xs">
                <span>Fast (500ms)</span>
                <span>Slow (3000ms)</span>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <h3 className="warren-section-header text-lg mb-3">Warren Style Presets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setStyleConfig(prev => ({
                  ...prev,
                  botMessageBg: '#DAEDF0',
                  userMessageBg: '#032E46',
                  botMessageText: '#032E46',
                  userMessageText: '#FFFFFF',
                  chatBackground: '#F6F4ED'
                }))}
                className="warren-btn-secondary text-sm"
              >
                🐰 Warren Classic
              </button>
              <button
                onClick={() => setStyleConfig(prev => ({
                  ...prev,
                  botMessageBg: '#F3E5F5',
                  userMessageBg: '#6EAD7C',
                  botMessageText: '#032E46',
                  userMessageText: '#FFFFFF',
                  chatBackground: '#F8F7F4'
                }))}
                className="warren-btn-secondary text-sm"
              >
                🌱 Educational Green
              </button>
              <button
                onClick={() => setStyleConfig(prev => ({
                  ...prev,
                  botMessageBg: '#E8F5E8',
                  userMessageBg: '#6EAD7C',
                  botMessageText: '#2E7D32',
                  userMessageText: '#FFFFFF',
                  chatBackground: '#F6F4ED'
                }))}
                className="warren-btn-secondary text-sm"
              >
                🎓 Academic Fresh
              </button>
              <button
                onClick={() => setStyleConfig(prev => ({
                  ...prev,
                  botMessageBg: '#2F2F2F',
                  userMessageBg: '#6EAD7C',
                  botMessageText: '#FFFFFF',
                  userMessageText: '#FFFFFF',
                  chatBackground: '#1A1A1A'
                }))}
                className="warren-btn-secondary text-sm"
              >
                🌙 Night Burrow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Panel */}
      <div className="warren-card-large">
        <h2 className="warren-section-header mb-4">Live Warren Preview</h2>
        <ChatClient
          surveyId={surveyId}
          styleConfig={styleConfig}
        />
      </div>
    </div>
  );
};

export default StyleEditor;