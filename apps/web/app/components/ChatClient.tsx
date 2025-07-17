'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  questionType?: string;
  options?: string[];
}

interface ChatClientProps {
  surveyId: string;
  styleConfig?: {
    botMessageBg?: string;
    userMessageBg?: string;
    botMessageText?: string;
    userMessageText?: string;
    chatBackground?: string;
    avatarUrl?: string;
    messageDelay?: number;
  };
  onResponse?: (questionId: string, answer: any) => void;
}

const ChatClient: React.FC<ChatClientProps> = ({
  surveyId,
  styleConfig = {},
  onResponse
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState<string>('1');
  const [surveyNodes, setSurveyNodes] = useState<any>({});
  const [userResponses, setUserResponses] = useState<{[key: string]: any}>({});
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultStyle = {
    botMessageBg: '#ECEFF1',
    userMessageBg: '#007AFF',
    botMessageText: '#000000',
    userMessageText: '#FFFFFF',
    chatBackground: '#FFFFFF',
    messageDelay: 1200,
    ...styleConfig
  };

  useEffect(() => {
    loadSurveyData();
  }, [surveyId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadSurveyData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/surveys/${surveyId}/public`);
      if (response.ok) {
        const data = await response.json();
        setSurveyNodes(data.nodes);
        processNextMessage('1', data.nodes);
      }
    } catch (error) {
      console.error('Error loading survey data:', error);
    }
  };

  const processNextMessage = (nodeId: string, nodes: any) => {
    const node = nodes[nodeId];
    if (!node) {
      setIsComplete(true);
      return;
    }

    setIsTyping(true);
    
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `bot-${nodeId}`,
        type: 'bot',
        content: node.messageText,
        timestamp: new Date(),
        questionType: node.questionType,
        options: node.options
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, defaultStyle.messageDelay);
  };

  const handleUserResponse = (nodeId: string, answer: any) => {
    const userMessage: ChatMessage = {
      id: `user-${nodeId}`,
      type: 'user',
      content: Array.isArray(answer) ? answer.join(', ') : answer.toString(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserResponses(prev => ({ ...prev, [nodeId]: answer }));
    setInputValue('');

    if (onResponse) {
      onResponse(nodeId, answer);
    }

    // Determine next node
    const currentNode = surveyNodes[nodeId];
    let nextNodeId = currentNode.nextId;

    // Handle branching logic for single_choice
    if (currentNode.questionType === 'single_choice' && currentNode.nextLogic) {
      nextNodeId = currentNode.nextLogic[answer] || currentNode.nextId;
    }

    if (nextNodeId) {
      setCurrentNodeId(nextNodeId);
      processNextMessage(nextNodeId, surveyNodes);
    } else {
      setIsComplete(true);
      submitResponses();
    }
  };

  const submitResponses = async () => {
    try {
      await fetch('http://localhost:3001/api/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyId,
          answers: userResponses
        })
      });
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };

  const renderUserInput = () => {
    const currentNode = surveyNodes[currentNodeId];
    if (!currentNode || isComplete) return null;

    switch (currentNode.questionType) {
      case 'statement':
        return (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleUserResponse(currentNodeId, 'continue')}
          >
            Continue
          </button>
        );

      case 'text':
        return (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Type your answer..."
              onKeyPress={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  handleUserResponse(currentNodeId, inputValue.trim());
                }
              }}
            />
            <button
              onClick={() => {
                if (inputValue.trim()) {
                  handleUserResponse(currentNodeId, inputValue.trim());
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        );

      case 'number':
        return (
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Enter a number..."
              onKeyPress={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  handleUserResponse(currentNodeId, parseFloat(inputValue));
                }
              }}
            />
            <button
              onClick={() => {
                if (inputValue.trim()) {
                  handleUserResponse(currentNodeId, parseFloat(inputValue));
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        );

      case 'single_choice':
        return (
          <div className="flex flex-col gap-2">
            {currentNode.options?.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleUserResponse(currentNodeId, option)}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded text-left"
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'multi_choice':
        return (
          <div className="flex flex-col gap-2">
            {currentNode.options?.map((option: string, index: number) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const currentSelections = userResponses[currentNodeId] || [];
                    if (e.target.checked) {
                      const newSelections = [...currentSelections, option];
                      setUserResponses(prev => ({ ...prev, [currentNodeId]: newSelections }));
                    } else {
                      const newSelections = currentSelections.filter((item: string) => item !== option);
                      setUserResponses(prev => ({ ...prev, [currentNodeId]: newSelections }));
                    }
                  }}
                />
                {option}
              </label>
            ))}
            <button
              onClick={() => handleUserResponse(currentNodeId, userResponses[currentNodeId] || [])}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Continue
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="flex flex-col h-96 border rounded-lg"
      style={{ backgroundColor: defaultStyle.chatBackground }}
    >
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user' ? 'rounded-br-none' : 'rounded-bl-none'
              }`}
              style={{
                backgroundColor: message.type === 'user' ? defaultStyle.userMessageBg : defaultStyle.botMessageBg,
                color: message.type === 'user' ? defaultStyle.userMessageText : defaultStyle.botMessageText,
              }}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div 
              className="px-4 py-2 rounded-lg rounded-bl-none"
              style={{
                backgroundColor: defaultStyle.botMessageBg,
                color: defaultStyle.botMessageText,
              }}
            >
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        {isComplete ? (
          <div className="text-center text-gray-500">
            Thank you for completing the survey!
          </div>
        ) : (
          renderUserInput()
        )}
      </div>
    </div>
  );
};

export default ChatClient;