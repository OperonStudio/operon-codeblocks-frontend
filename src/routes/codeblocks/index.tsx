import { useState, useCallback, useMemo, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FlowBoard, Box, Button } from "@operon/ui";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import type {
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ArrowLeft, Layers, Plus, Save, Trash2, Unplug } from "@operon/icons";

interface SavedMacro {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
}

export const Route = createFileRoute("/codeblocks/")({
  component: CodeblocksPage,
});

const initialNodes: Node[] = [
  {
    id: "trigger",
    type: "operonCustom",
    position: { x: 50, y: 150 },
    data: {
      label: "Webhook Trigger",
      sublabel: "Start of Flow",
      nodeType: "source",
      icon: "play",
    },
  },
  {
    id: "response",
    type: "operonCustom",
    position: { x: 700, y: 150 },
    data: {
      label: "API Response",
      sublabel: "End of Flow",
      nodeType: "sink",
      icon: "check",
    },
  },
];

const initialEdges: Edge[] = [];

function CodeblocksPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [savedMacros, setSavedMacros] = useState<SavedMacro[]>([]);
  const [editingContext, setEditingContext] = useState<{ type: 'main' } | { type: 'macro', id: string }>({ type: 'main' });
  const [mainFlowData, setMainFlowData] = useState<{ nodes: Node[], edges: Edge[] }>({ nodes: initialNodes, edges: initialEdges });

  useEffect(() => {
    const saved = localStorage.getItem("operon-macros");
    if (saved) {
      try {
        setSavedMacros(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse macros");
      }
    }
  }, []);

  const saveCurrentAsMacro = () => {
    const name = window.prompt("Enter a name for this Macro:");
    if (!name) return;

    const newMacro: SavedMacro = {
      id: `macro-${Date.now()}`,
      name,
      nodes,
      edges,
    };
    const updated = [...savedMacros, newMacro];
    setSavedMacros(updated);
    localStorage.setItem("operon-macros", JSON.stringify(updated));
    
    // Reset the board to a fresh state
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setEditingContext({ type: 'main' });
  };

  const updateSavedMacro = (id: string, n: Node[], e: Edge[]) => {
    setSavedMacros(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, nodes: n, edges: e } : m);
      localStorage.setItem("operon-macros", JSON.stringify(updated));
      return updated;
    });
  };

  const openMacro = (macroId: string) => {
    if (editingContext.type === 'main') {
      setMainFlowData({ nodes, edges });
    } else {
      updateSavedMacro(editingContext.id, nodes, edges);
    }
    
    const macro = savedMacros.find(m => m.id === macroId);
    if (macro) {
      setNodes(macro.nodes);
      setEdges(macro.edges);
      setEditingContext({ type: 'macro', id: macroId });
      setSelectedNodeId(null);
      setSelectedEdgeId(null);
    }
  };

  const backToMain = () => {
    if (editingContext.type === 'macro') {
      updateSavedMacro(editingContext.id, nodes, edges);
    }
    setNodes(mainFlowData.nodes);
    setEdges(mainFlowData.edges);
    setEditingContext({ type: 'main' });
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  };

  const addMacroToBoard = (macro: SavedMacro) => {
    const newNode: Node = {
      id: `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: "operonCustom",
      position: { x: 300, y: 150 + Math.random() * 100 },
      data: {
        label: macro.name,
        sublabel: "Macro Block",
        nodeType: "pipe",
        icon: "layers",
        isMacro: true,
        macroId: macro.id,
      },
    };
    setNodes(nds => [...nds, newNode]);
  };

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      
      const selectChange = changes.find((c) => c.type === 'select' && c.selected);
      const deselectChange = changes.find((c) => c.type === 'select' && !c.selected);
      
      if (selectChange && selectChange.type === 'select') {
        setSelectedNodeId(selectChange.id);
        setSelectedEdgeId(null);
      } else if (deselectChange && deselectChange.type === 'select') {
        if (selectedNodeId === deselectChange.id) setSelectedNodeId(null);
      }
      
      const removeChange = changes.find((c) => c.type === 'remove');
      if (removeChange && removeChange.type === 'remove') {
        if (selectedNodeId === removeChange.id) setSelectedNodeId(null);
      }
    },
    [selectedNodeId]
  );
  
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
      
      const selectChange = changes.find((c) => c.type === 'select' && c.selected);
      const deselectChange = changes.find((c) => c.type === 'select' && !c.selected);
      
      if (selectChange && selectChange.type === 'select') {
        setSelectedEdgeId(selectChange.id);
        setSelectedNodeId(null);
      } else if (deselectChange && deselectChange.type === 'select') {
        if (selectedEdgeId === deselectChange.id) setSelectedEdgeId(null);
      }
      
      const removeChange = changes.find((c) => c.type === 'remove');
      if (removeChange && removeChange.type === 'remove') {
        if (selectedEdgeId === removeChange.id) setSelectedEdgeId(null);
      }
    },
    [selectedEdgeId]
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addBlock = (type: "source" | "pipe" | "sink", label: string, sublabel: string, icon: string) => {
    const newNode: Node = {
      id: `node-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      type: "operonCustom",
      position: { x: 300, y: 150 + Math.random() * 100 },
      data: {
        label,
        sublabel,
        nodeType: type,
        icon,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const selectedNode = useMemo(() => nodes.find(n => n.id === selectedNodeId), [nodes, selectedNodeId]);
  const selectedEdge = useMemo(() => edges.find(e => e.id === selectedEdgeId), [edges, selectedEdgeId]);

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", backgroundColor: "#f9fafb" }}>
      {/* Header Toolbar */}
      <Box style={{ 
        padding: "16px 24px", 
        borderBottom: "1px solid var(--operon-color-border)",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ fontWeight: 600, fontSize: "18px", display: "flex", alignItems: "center" }}>
          {editingContext.type === 'macro' && (
            <Button size="sm" variant="ghost" onClick={backToMain} style={{ padding: "0 8px", marginRight: 12 }}>
              <ArrowLeft size={18} style={{ marginRight: 6 }}/> Back to Main Flow
            </Button>
          )}
          {editingContext.type === 'main' ? 'Operon Codeblocks' : `Editing Macro: ${savedMacros.find(m => m.id === editingContext.id)?.name}`}
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {editingContext.type === 'main' && (
            <>
              <Button size="sm" variant="ghost" onClick={saveCurrentAsMacro} style={{ color: "var(--operon-color-text-muted)" }}>
                <Save size={16} style={{ marginRight: 6 }}/> Save as Macro
              </Button>
              <div style={{ width: "1px", height: "24px", backgroundColor: "var(--operon-color-border)", margin: "0 4px" }} />
            </>
          )}
          <Button size="sm" variant="outline" onClick={() => addBlock("source", "New Trigger", "External Webhook", "play")}>
            <Plus size={16} style={{ marginRight: 6 }}/> Add Trigger
          </Button>
          <Button size="sm" variant="primary" onClick={() => addBlock("pipe", "Codeblock", "Custom API", "code")}>
            <Plus size={16} style={{ marginRight: 6 }}/> Add Codeblock
          </Button>
          <Button size="sm" variant="outline" onClick={() => addBlock("sink", "New Response", "Return JSON", "check")}>
            <Plus size={16} style={{ marginRight: 6 }}/> Add Response
          </Button>
        </div>
      </Box>

      {/* Main Canvas Area */}
      <div style={{ display: "flex", flex: 1, height: "calc(100vh - 65px)", overflow: "hidden" }}>
        
        {/* Left Macro Library Sidebar */}
        <Box style={{ 
          width: "280px", 
          borderRight: "1px solid var(--operon-color-border)",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
        }}>
          <Box style={{ padding: "16px", borderBottom: "1px solid var(--operon-color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: "14px" }}>Flow Library</span>
            <Button size="sm" variant="ghost" style={{ padding: "4px" }} onClick={() => {
              setNodes(initialNodes);
              setEdges(initialEdges);
              setSelectedNodeId(null);
              setSelectedEdgeId(null);
              setEditingContext({ type: 'main' });
            }}>
              <Plus size={16} />
            </Button>
          </Box>
          <Box style={{ padding: "16px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
            {savedMacros.length === 0 ? (
              <div style={{ fontSize: "13px", color: "var(--operon-color-text-muted)", textAlign: "center", marginTop: 20 }}>
                No flows saved yet.
              </div>
            ) : (
              savedMacros.map(macro => (
                <div 
                  key={macro.id}
                  onClick={() => editingContext.type === 'main' && addMacroToBoard(macro)}
                  style={{
                    padding: "12px",
                    border: "1px solid var(--operon-color-border)",
                    borderRadius: "8px",
                    cursor: editingContext.type === 'main' ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    backgroundColor: "#f9fafb",
                    opacity: editingContext.type === 'main' ? 1 : 0.5,
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (editingContext.type === 'main') {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.borderColor = 'var(--operon-color-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (editingContext.type === 'main') {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.borderColor = 'var(--operon-color-border)';
                    }
                  }}
                >
                  <div style={{ color: "var(--operon-color-primary)", display: "flex" }}><Layers size={18}/></div>
                  <div style={{ fontWeight: 500, fontSize: "13px" }}>{macro.name}</div>
                </div>
              ))
            )}
          </Box>
        </Box>
        
        {/* ReactFlow Canvas */}
        <div style={{ flex: 1, height: "100%", position: "relative" }}>
          <FlowBoard
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodesConnectable={true}
            height="100%"
            width="100%"
          />
        </div>

        {/* Right Configuration Sidebar */}
        <Box style={{ 
          width: "320px", 
          borderLeft: "1px solid var(--operon-color-border)",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
        }}>
          <Box style={{ padding: "16px", borderBottom: "1px solid var(--operon-color-border)" }}>
            <span style={{ fontWeight: 600, fontSize: "14px" }}>Configuration</span>
          </Box>
          <Box style={{ padding: "16px", flex: 1, overflowY: "auto" }}>
            {selectedNode ? (
              <Box style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Box>
                  <div style={{ fontSize: "12px", color: "var(--operon-color-text-muted)", marginBottom: 4 }}>Block Type</div>
                  <div style={{ fontWeight: 500 }}>{selectedNode.data.nodeType as string}</div>
                </Box>
                <Box>
                  <div style={{ fontSize: "12px", color: "var(--operon-color-text-muted)", marginBottom: 4 }}>Label</div>
                  <input 
                    type="text" 
                    value={selectedNode.data.label as string}
                    onChange={(e) => {
                      setNodes(nds => nds.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, label: e.target.value } } : n));
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid var(--operon-color-border)",
                      outline: "none"
                    }}
                  />
                </Box>
                <Box>
                  <div style={{ fontSize: "12px", color: "var(--operon-color-text-muted)", marginBottom: 4 }}>Sublabel</div>
                  <input 
                    type="text" 
                    value={(selectedNode.data.sublabel as string) || ""}
                    onChange={(e) => {
                      setNodes(nds => nds.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, sublabel: e.target.value } } : n));
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid var(--operon-color-border)",
                      outline: "none"
                    }}
                  />
                </Box>
                
                {Boolean(selectedNode.data.isMacro) && (
                  <Button 
                    size="sm" 
                    variant="primary" 
                    onClick={() => openMacro(selectedNode.data.macroId as string)}
                    style={{ marginTop: "12px", width: "100%", justifyContent: "center" }}
                  >
                    Edit Macro Implementation
                  </Button>
                )}

                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setNodes(nds => nds.filter(n => n.id !== selectedNode.id))}
                  style={{ marginTop: "24px", color: "#ef4444", borderColor: "#fca5a5" }}
                >
                  <Trash2 size={16} style={{ marginRight: 6 }}/> Delete Block
                </Button>
              </Box>
            ) : selectedEdge ? (
              <Box style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Box>
                  <div style={{ fontSize: "12px", color: "var(--operon-color-text-muted)", marginBottom: 4 }}>Connection Path</div>
                  <div style={{ fontWeight: 500, fontSize: "13px" }}>From: {selectedEdge.source}</div>
                  <div style={{ fontWeight: 500, fontSize: "13px", marginTop: 4 }}>To: {selectedEdge.target}</div>
                </Box>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    setEdges(eds => eds.filter(e => e.id !== selectedEdge.id));
                    setSelectedEdgeId(null);
                  }}
                  style={{ marginTop: "24px", color: "#ef4444", borderColor: "#fca5a5" }}
                >
                  <Unplug size={16} style={{ marginRight: 6 }}/> Delete Connection
                </Button>
              </Box>
            ) : (
              <Box style={{ textAlign: "center", color: "var(--operon-color-text-muted)", marginTop: "40px", fontSize: "13px" }}>
                Click on a node or edge to configure it.
                <br/><br/>
                Drag handles to connect nodes. Select a node or edge and press Backspace to delete it.
              </Box>
            )}
          </Box>
        </Box>

      </div>
    </div>
  );
}
