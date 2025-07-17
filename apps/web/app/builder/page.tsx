"use client";

import React, { useState } from "react";
import Flow from "../components/Flow";
import SpreadsheetUpload from "../components/SpreadsheetUpload";

const BuilderPage = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  const showNotification = (
    type: "success" | "error" | "warning",
    message: string,
  ) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleUpload = (data: any[]) => {
    setIsLoading(true);

    try {
      console.log("Processing spreadsheet data:", data);

      // Log the first row to understand the column structure
      if (data.length > 0) {
        console.log("First row columns:", Object.keys(data[0]));
      }
      // Column alias mapping for common spreadsheet variations
      const columnAliases = {
        ID: [
          "id",
          "ID",
          "Id",
          "item_id",
          "item id",
          "question_id",
          "question id",
          "node_id",
          "node id",
          "step",
          "step_id",
          "step id",
          "Block #",
          "block #",
          "Block",
          "block",
          "Block Number",
          "block number",
        ],
        Message_Text: [
          "message_text",
          "Message_Text",
          "message text",
          "Message Text",
          "text",
          "Text",
          "question",
          "Question",
          "content",
          "Content",
          "message",
          "Message",
          "Question/Content",
          "question/content",
          "Question Content",
          "question content",
        ],
        Question_Type: [
          "question_type",
          "Question_Type",
          "question type",
          "Question Type",
          "type",
          "Type",
          "kind",
          "Kind",
          "format",
          "Format",
          "Response Type",
          "response type",
          "ResponseType",
          "response_type",
        ],
        Next_ID: [
          "next_id",
          "Next_ID",
          "next id",
          "Next ID",
          "nextid",
          "NextID",
          "next",
          "Next",
          "goto",
          "GoTo",
          "target",
          "Target",
          "Logic/Branching",
          "logic/branching",
          "Logic",
          "logic",
          "Branching",
          "branching",
        ],
      };

      const findKey = (obj: any, keyToFind: string) => {
        const aliases = columnAliases[
          keyToFind as keyof typeof columnAliases
        ] || [keyToFind];

        for (const alias of aliases) {
          // First try exact match
          if (obj.hasOwnProperty(alias)) {
            console.log(`Found exact match for ${keyToFind}: ${alias}`);
            return alias;
          }

          // Then try case-insensitive match
          const normalizedAlias = alias.toLowerCase().replace(/[_ ]/g, "");
          for (const key in obj) {
            if (key.toLowerCase().replace(/[_ ]/g, "") === normalizedAlias) {
              console.log(
                `Found normalized match for ${keyToFind}: ${key} (matched alias: ${alias})`,
              );
              return key;
            }
          }
        }

        console.log(`No match found for ${keyToFind}. Tried aliases:`, aliases);
        return undefined;
      };

      const newNodes = data
        .map((row: any, index: number) => {
          const idKey = findKey(row, "ID");
          const messageKey = findKey(row, "Message_Text");

          if (!idKey || row[idKey] === undefined) {
            const availableColumns = Object.keys(row).join(", ");
            console.error(
              `Row ${index + 1} is missing a valid 'ID' column. Available columns: ${availableColumns}`,
              row,
            );
            return null;
          }

          // Skip header rows or section dividers (non-numeric IDs that look like headers)
          const idValue = row[idKey];
          if (
            typeof idValue === "string" &&
            (idValue.includes("CONVERSATION") ||
              idValue.includes("SECTION") ||
              idValue.includes("OPENING") ||
              idValue.includes("CLOSING") ||
              (idValue.toUpperCase() === idValue && idValue.length > 10))
          ) {
            console.log(`Skipping header/section row: ${idValue}`);
            return null;
          }

          return {
            id: row[idKey].toString(),
            position: {
              x: 100 + (index % 3) * 250,
              y: 50 + Math.floor(index / 3) * 150,
            },
            data: {
              label: row[messageKey || ""] || `Question ${index + 1}`,
              questionType:
                row[findKey(row, "Question_Type") || ""] || "statement",
            },
            style: {
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              border: "2px solid #e7e7ef",
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0 4px 16px rgba(33, 150, 243, 0.2)",
              minWidth: "200px",
            },
          };
        })
        .filter(Boolean);

      // Check if we have any valid nodes
      if (newNodes.length === 0) {
        const firstRow = data[0];
        const availableColumns = firstRow
          ? Object.keys(firstRow).join(", ")
          : "No columns found";
        throw new Error(
          `No valid survey nodes found. Please check your spreadsheet format. Available columns: ${availableColumns}`,
        );
      }

      // Build edges using Next_ID when available and valid. If a row doesn't
      // specify a next step, fall back to connecting to the following node so
      // the flow is still traversable.
      const nodeIds = newNodes.map((n: any) => n.id);
      const edgesFromNext = data
        .map((row: any) => {
          const idKey = findKey(row, "ID");
          const nextIdKey = findKey(row, "Next_ID");

          if (
            idKey &&
            nextIdKey &&
            row[idKey] !== undefined &&
            row[nextIdKey] !== undefined
          ) {
            const nextRaw = row[nextIdKey].toString();
            const exact = nodeIds.find((id) => id === nextRaw.trim());
            const target = exact || nodeIds.find((id) => nextRaw.includes(id));
            if (target) {
              return {
                id: `e${row[idKey]}-${target}`,
                source: row[idKey].toString(),
                target,
                style: {
                  stroke: "#6EAD7C",
                  strokeWidth: 3,
                  strokeDasharray: "5,5",
                },
                animated: true,
              };
            }
          }
          return null;
        })
        .filter(Boolean);

      // Add sequential edges for any nodes without an explicit connection
      const connectedSources = new Set(
        (edgesFromNext as any[]).map((e) => e.source),
      );
      const sequentialEdges = [] as any[];
      for (let i = 0; i < newNodes.length - 1; i++) {
        const source = newNodes[i]!.id;
        if (!connectedSources.has(source)) {
          const target = newNodes[i + 1]!.id;
          sequentialEdges.push({
            id: `e${source}-${target}`,
            source,
            target,
            style: {
              stroke: "#6EAD7C",
              strokeWidth: 3,
              strokeDasharray: "5,5",
            },
            animated: true,
          });
        }
      }

      const newEdges = [...edgesFromNext, ...sequentialEdges];

      setNodes(newNodes);
      setEdges(newEdges);
      showNotification(
        "success",
        `🎉 Successfully created burrow with ${newNodes.length} nodes!`,
      );
    } catch (error) {
      console.error("Error processing upload:", error);
      showNotification(
        "error",
        "❌ Failed to process your spreadsheet. Please check the format.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const surveyId = "mock-survey-id";

    try {
      const surveyData = {
        nodes: nodes.reduce((acc, node) => {
          acc[node.id] = {
            messageText: node.data.label,
            questionType: node.data.questionType || "statement",
            nextId: edges.find((edge) => edge.source === node.id)?.target,
          };
          return acc;
        }, {}),
      };

      const response = await fetch(
        `http://localhost:3001/api/surveys/${surveyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(surveyData),
        },
      );

      if (response.ok) {
        showNotification(
          "success",
          "💾 Burrow saved successfully! Your survey is ready.",
        );
      } else {
        showNotification(
          "error",
          "❌ Failed to save burrow. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error saving survey:", error);
      showNotification(
        "error",
        "❌ Network error. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = async () => {
    setIsLoading(true);
    const surveyId = "mock-survey-id";

    try {
      const response = await fetch(
        `http://localhost:3001/api/surveys/${surveyId}`,
      );
      if (response.ok) {
        const surveyData = await response.json();
        const newNodes = Object.entries(surveyData.nodes).map(
          ([id, node]: [string, any], index: number) => ({
            id,
            position: {
              x: 100 + (index % 3) * 250,
              y: 50 + Math.floor(index / 3) * 150,
            },
            data: {
              label: node.messageText,
              questionType: node.questionType || "statement",
            },
            style: {
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              border: "2px solid #e7e7ef",
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0 4px 16px rgba(3, 46, 70, 0.12)",
              minWidth: "200px",
            },
          }),
        );

        const newEdges = Object.entries(surveyData.nodes)
          .filter(([id, node]: [string, any]) => node.nextId)
          .map(([id, node]: [string, any]) => ({
            id: `e${id}-${node.nextId}`,
            source: id,
            target: node.nextId,
            style: {
              stroke: "#6EAD7C",
              strokeWidth: 3,
              strokeDasharray: "5,5",
            },
            animated: true,
          }));

        setNodes(newNodes);
        setEdges(newEdges);
        showNotification("success", "📂 Burrow loaded successfully!");
      } else {
        showNotification(
          "error",
          "❌ Failed to load burrow. Survey not found.",
        );
      }
    } catch (error) {
      console.error("Error loading survey:", error);
      showNotification(
        "error",
        "❌ Network error. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSample = () => {
    const sampleNodes = [
      {
        id: "1",
        position: { x: 100, y: 50 },
        data: {
          label: "Welcome to our course feedback survey! 🎓",
          questionType: "statement",
        },
        style: {
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          border: "2px solid #2196f3",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 4px 16px rgba(33, 150, 243, 0.2)",
          minWidth: "200px",
        },
      },
      {
        id: "2",
        position: { x: 350, y: 50 },
        data: {
          label: "What is your name?",
          questionType: "text",
        },
        style: {
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          border: "2px solid #e7e7ef",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 4px 16px rgba(3, 46, 70, 0.12)",
          minWidth: "200px",
        },
      },
      {
        id: "3",
        position: { x: 600, y: 50 },
        data: {
          label: "How would you rate this course overall?",
          questionType: "single_choice",
        },
        style: {
          background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
          border: "2px solid #4caf50",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 4px 16px rgba(76, 175, 80, 0.2)",
          minWidth: "200px",
        },
      },
    ];

    const sampleEdges = [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        style: {
          stroke: "#6EAD7C",
          strokeWidth: 3,
          strokeDasharray: "5,5",
        },
        animated: true,
      },
      {
        id: "e2-3",
        source: "2",
        target: "3",
        style: {
          stroke: "#6EAD7C",
          strokeWidth: 3,
          strokeDasharray: "5,5",
        },
        animated: true,
      },
    ];

    setNodes(sampleNodes);
    setEdges(sampleEdges);
    showNotification(
      "success",
      "✨ Sample burrow created! Feel free to modify and customize.",
    );
  };

  return (
    <div className="warren-main-content">
      <div className="container mx-auto">
        {/* Notification */}
        {notification && (
          <div
            className={`mb-6 ${
              notification.type === "success"
                ? "warren-success"
                : notification.type === "warning"
                  ? "warren-warning"
                  : "warren-error"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Header Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="warren-hero-title mb-4">Survey Builder</h1>
            <p
              className="warren-body-text max-w-2xl mx-auto"
              style={{ color: "var(--warren-secondary-text)" }}
            >
              Create your conversational survey by uploading a spreadsheet or
              building from scratch.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="warren-card text-center">
              <div className="text-lg mb-2">📊</div>
              <div className="warren-body-text font-semibold">
                {nodes.length}
              </div>
              <div className="warren-secondary-text text-sm">Survey Nodes</div>
            </div>
            <div className="warren-card text-center">
              <div className="text-lg mb-2">🔗</div>
              <div className="warren-body-text font-semibold">
                {edges.length}
              </div>
              <div className="warren-secondary-text text-sm">Connections</div>
            </div>
            <div className="warren-card text-center">
              <div className="text-lg mb-2">⚡</div>
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
            <div
              className="flex-1 h-px"
              style={{ background: "var(--warren-border)" }}
            ></div>
            <div className="px-4 warren-secondary-text font-medium">or</div>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--warren-border)" }}
            ></div>
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <h3 className="warren-section-header text-lg mb-4">
              Quick Start Options
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCreateSample}
                className="warren-btn-secondary"
                disabled={isLoading}
              >
                Create Sample Survey
              </button>
              <button
                onClick={handleLoad}
                className="warren-btn-secondary"
                disabled={isLoading}
              >
                Load Existing Survey
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
              "Save Survey"
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
              "Load Survey"
            )}
          </button>

          {nodes.length > 0 && (
            <a href="/style" className="warren-btn-success">
              Customize Style
            </a>
          )}

          {nodes.length > 0 && (
            <a
              href="/survey/mock-survey-id"
              className="warren-btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview Survey
            </a>
          )}
        </div>

        {/* Flow Editor */}
        <div className="warren-card-large">
          <div className="mb-6 text-center">
            <h2 className="warren-section-header mb-2">Visual Survey Editor</h2>
            {nodes.length === 0 && (
              <div className="warren-secondary-text text-sm">
                Upload a spreadsheet or create a sample to get started
              </div>
            )}
          </div>

          <div className="relative">
            {nodes.length === 0 ? (
              // Empty State
              <div
                className="h-96 rounded-lg border-2 border-dashed flex items-center justify-center"
                style={{
                  borderColor: "var(--warren-border)",
                  background: "var(--warren-gray-50)",
                }}
              >
                <div className="text-center max-w-md">
                  <div className="w-6 h-6 mx-auto mb-4">
                    <img
                      src="/NesolagusLogo.png"
                      alt="Nesolagus Logo"
                      className="w-6 h-6 object-contain opacity-50"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </div>
                  <h3 className="warren-section-header text-lg mb-2">
                    Ready to Build Your Survey?
                  </h3>
                  <p className="warren-secondary-text mb-6">
                    Upload your survey spreadsheet above or create a sample
                    survey to see the visual editor in action.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleCreateSample}
                      className="warren-btn-primary"
                    >
                      Create Sample Survey
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Flow Editor
              <div
                style={{
                  height: "600px",
                  border: "1px solid var(--warren-border)",
                  borderRadius: "var(--warren-radius-lg)",
                }}
              >
                <Flow initialNodes={nodes} initialEdges={edges} />
              </div>
            )}
          </div>

          {nodes.length > 0 && (
            <div
              className="mt-6 p-4 rounded-lg border"
              style={{
                background: "var(--warren-gray-50)",
                borderColor: "var(--warren-border)",
              }}
            >
              <h4 className="warren-body-text font-semibold mb-2">
                Editor Tips:
              </h4>
              <ul className="warren-secondary-text text-sm space-y-1">
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
          <h2 className="warren-section-header mb-4">
            Need Help Getting Started?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="warren-body-text font-semibold mb-2">
                📋 Spreadsheet Format
              </h4>
              <p className="warren-secondary-text text-sm mb-4">
                Your spreadsheet should include these columns (various naming
                formats supported):
              </p>
              <ul className="warren-secondary-text text-sm space-y-1">
                <li>
                  <strong>ID:</strong> Unique identifier (also accepts: Block #,
                  id, item_id, question_id, step, etc.)
                </li>
                <li>
                  <strong>Message_Text:</strong> The question text (also
                  accepts: Question/Content, message, text, question, content)
                </li>
                <li>
                  <strong>Question_Type:</strong> Question type (also accepts:
                  Response Type, type, kind, format) - statement, text, number,
                  single_choice, multi_choice
                </li>
                <li>
                  <strong>Next_ID:</strong> Next question (also accepts:
                  Logic/Branching, next, goto, target)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="warren-body-text font-semibold mb-2">
                🎯 Best Practices
              </h4>
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
