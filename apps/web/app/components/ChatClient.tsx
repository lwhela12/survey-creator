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
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef<number>(0);

  const defaultStyle = {
    botMessageBg: '#F1F5F9',
    userMessageBg: '#032E46',
    botMessageText: '#1E293B',
    userMessageText: '#FFFFFF',
    chatBackground: '#FFFFFF',
    messageDelay: 800,
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
        // Only start the first message if not already initialized
        if (!isInitialized) {
          setIsInitialized(true);
          processNextMessage('1', data.nodes);
        }
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
        id: `bot-${nodeId}-${messageIdCounter.current++}`,
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
      id: `user-${nodeId}-${messageIdCounter.current++}`,
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
    let nextNodeId = currentNode.nextId; // Default fallback

    // Branching Logic
    if (currentNode.questionType === 'single_choice' && currentNode.nextLogic) {
      if (currentNode.nextLogic[answer]) {
        // Path for a specific answer
        nextNodeId = currentNode.nextLogic[answer];
      } else if (currentNode.nextLogic.default) {
        // Fallback to a default path
        nextNodeId = currentNode.nextLogic.default;
      }
      // If no specific path and no default, use the original nextId
    }

    console.log(`Branching from node ${nodeId} with answer "${answer}" to node ${nextNodeId}`);

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
          className="btn btn-primary w-full text-lg py-3 rounded-full"
          onClick={() => handleUserResponse(currentNodeId, 'continue')}
        >
          Continue
        </button>
        );

      case 'text':
        return (
          <div className="flex gap-6 items-end">
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-full bg-[#DAEDF0] focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none text-base min-h-[54px] shadow-sm"
                placeholder="Type your message..."
                rows={1}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && inputValue.trim()) {
                    e.preventDefault();
                    handleUserResponse(currentNodeId, inputValue.trim());
                  }
                }}
                style={{ 
                  height: 'auto',
                  minHeight: '70px',
                  maxHeight: '140px'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 140) + 'px';
                }}
              />
            </div>
            <button
              onClick={() => inputValue.trim() && handleUserResponse(currentNodeId, inputValue.trim())}
              disabled={!inputValue.trim()}
              className="btn btn-primary px-6 py-3 rounded-full disabled:opacity-50 text-lg font-medium shadow transition-all duration-300"
            >
              Send
            </button>
          </div>
        );

      case 'number':
        return (
          <div className="flex gap-6 items-end">
            <div className="flex-1">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-full bg-[#DAEDF0] focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-base shadow-sm"
                placeholder="Enter a number..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    handleUserResponse(currentNodeId, parseFloat(inputValue));
                  }
                }}
              />
            </div>
            <button
              onClick={() => inputValue.trim() && handleUserResponse(currentNodeId, parseFloat(inputValue))}
              disabled={!inputValue.trim()}
              className="btn btn-primary px-6 py-3 rounded-full disabled:opacity-50 text-lg font-medium shadow transition-all duration-300"
            >
              Send
            </button>
          </div>
        );

      case 'single_choice':
        return (
          <div className="space-y-4">
            {currentNode.options?.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleUserResponse(currentNodeId, option)}
                className="btn btn-primary w-full text-lg py-3 rounded-full"
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'multi_choice':
        return (
          <div className="space-y-5">
            <div className="space-y-4">
              {currentNode.options?.map((option: string, index: number) => (
                <label
                  key={index}
                  className="flex items-center justify-between w-full p-4 border border-border rounded-lg bg-surface hover:border-primary transition-all duration-300"
                >
                  <span className="text-lg font-medium">{option}</span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary border border-border rounded focus:ring-4 focus:ring-primary/20"
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
                  <span className="text-lg font-medium">{option}</span>
                </label>
              ))}
            </div>
            <button
              onClick={() => handleUserResponse(currentNodeId, userResponses[currentNodeId] || [])}
              className="btn btn-primary w-full text-lg py-3 rounded-full font-medium shadow transition-all duration-300"
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
      className="flex flex-col h-full w-full rounded-xl border border-border shadow-lg overflow-hidden"
      style={{ backgroundColor: defaultStyle.chatBackground }}
    >
      {/* Header with optional avatar */}
      <div className="flex items-center gap-3 px-6 py-4 bg-surface border-b border-border">
        {defaultStyle.avatarUrl && (
          <img
            src={defaultStyle.avatarUrl}
            alt="Bot Avatar"
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="text-primary font-semibold">Warren</span>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div
              className={`max-w-[80%] px-4 py-3 shadow-sm rounded-xl ${
                message.type === 'user' ? 'ml-auto' : 'mr-auto'
              }`}
              style={{
                backgroundColor: message.type === 'user' ? defaultStyle.userMessageBg : defaultStyle.botMessageBg,
                color: message.type === 'user' ? defaultStyle.userMessageText : defaultStyle.botMessageText,
              }}
            >
              <p className="text-base leading-relaxed font-medium">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-left-2 duration-500">
            <div
              className="px-4 py-3 shadow-sm rounded-xl mr-auto"
              style={{
                backgroundColor: defaultStyle.botMessageBg,
                color: defaultStyle.botMessageText,
              }}
            >
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border bg-surface p-6">
        {isComplete ? (
          <div className="text-center text-secondary">
            <p className="text-lg font-medium">Thank you for completing the survey!</p>
          </div>
        ) : (
          renderUserInput()
        )}
      </div>
    </div>
  );
};

export default ChatClient;
