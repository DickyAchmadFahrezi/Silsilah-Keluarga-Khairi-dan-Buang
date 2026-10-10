import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
} from '@xyflow/react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { Sparkles, ZoomIn, ZoomOut, RotateCcw, MapPin, Info, ArrowDown } from 'lucide-react';

import PersonNode from './PersonNode';
import MarriageEdge from './MarriageEdge';
import SiblingEdge from './SiblingEdge';
import LineageEdge from './LineageEdge';
import Header from './Header';
import BranchBar from './BranchBar';
import Legend from './Legend';
import PersonDetailModal from './PersonDetailModal';
import JsonDataModal from './JsonDataModal';
import FamilyListView from './FamilyListView';

import { familyData, getPersonById } from '../data';
import { generateTreeElements } from '../utils/layout';

const nodeTypes = {
  personNode: PersonNode,
};

const edgeTypes = {
  marriageEdge: MarriageEdge,
  siblingEdge: SiblingEdge,
  lineageEdge: LineageEdge,
};

export default function FamilyTree() {
  const [viewMode, setViewMode] = useState('tree'); // 'tree' atau 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBranch, setActiveBranch] = useState('Maryamah'); // Default ke Maryamah agar bagan rapi & tidak ruwet
  const [isCousinHighlight, setIsCousinHighlight] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);

  const reactFlowWrapper = useRef(null);
  const { fitView, setCenter, zoomIn, zoomOut } = useReactFlow();

  // Hitung nodes & edges
  const { initialNodes, initialEdges, branchBounds, centralX } = useMemo(() => {
    const { nodes, edges, branchBounds, centralX } = generateTreeElements(familyData, {
      activeBranch,
      searchQuery,
      isCousinHighlight,
    });
    return { initialNodes: nodes, initialEdges: edges, branchBounds, centralX };
  }, [searchQuery, activeBranch, isCousinHighlight]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync saat data/filter berubah
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Otomatis posisikan bagan pas di layar saat cabang berganti
  useEffect(() => {
    const timer = setTimeout(() => {
      if (viewMode === 'tree') {
        if (activeBranch === 'all') {
          fitView({ padding: 0.15, duration: 600 });
        } else if (activeBranch === 'khairi_buang') {
          setCenter(centralX, 260, { zoom: 0.9, duration: 600 });
        } else if (branchBounds && branchBounds[activeBranch]) {
          const bound = branchBounds[activeBranch];
          const zoomLevel = window.innerWidth < 640 ? 0.65 : 0.85;
          setCenter(bound.midX, 600, { zoom: zoomLevel, duration: 600 });
        } else {
          fitView({ padding: 0.2, duration: 600 });
        }
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [activeBranch, viewMode, fitView, setCenter, centralX, branchBounds]);

  const handleSelectBranch = useCallback((branchId) => {
    setActiveBranch(branchId);
  }, []);

  const onNodeClick = useCallback((event, node) => {
    const person = getPersonById(node.id, familyData);
    if (person) {
      setSelectedPerson(person);
    }
  }, []);

  const handleSelectPersonFromModal = useCallback((person) => {
    setSelectedPerson(person);
    const targetNode = nodes.find((n) => n.id === person.id);
    if (targetNode) {
      setCenter(targetNode.position.x + 120, targetNode.position.y + 70, {
        zoom: 1.1,
        duration: 600,
      });
    }
  }, [nodes, setCenter]);

  const toggleCousinHighlight = useCallback(() => {
    setIsCousinHighlight((prev) => {
      const next = !prev;
      if (next) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#f43f5e', '#a855f7', '#fbbf24', '#10b981'],
        });
        if (centralX) {
          setCenter(centralX, 280, { zoom: 0.95, duration: 600 });
        }
      }
      return next;
    });
  }, [centralX, setCenter]);

  const handleResetView = useCallback(() => {
    setSearchQuery('');
    if (activeBranch === 'all') {
      fitView({ padding: 0.15, duration: 600 });
    } else if (branchBounds && branchBounds[activeBranch]) {
      const bound = branchBounds[activeBranch];
      const zoomLevel = window.innerWidth < 640 ? 0.65 : 0.85;
      setCenter(bound.midX, 600, { zoom: zoomLevel, duration: 600 });
    } else {
      fitView({ padding: 0.2, duration: 600 });
    }
  }, [fitView, activeBranch, branchBounds, setCenter]);

  const handleJumpToRoots = useCallback(() => {
    if (centralX) {
      setCenter(centralX, 180, { zoom: 0.9, duration: 600 });
    }
  }, [centralX, setCenter]);

  const handleExportImage = useCallback(() => {
    const flowElement = document.querySelector('.react-flow__viewport');
    if (!flowElement) return;

    toPng(flowElement, {
      backgroundColor: '#f8fafc',
      quality: 0.95,
      pixelRatio: 2,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'silsilah-keluarga-khairi-buang.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Gagal mengekspor gambar:', err);
      });
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-slate-50 overflow-hidden select-none">
      {/* Header Utama */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isCousinHighlight={isCousinHighlight}
        toggleCousinHighlight={toggleCousinHighlight}
        onResetView={handleResetView}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onExportImage={handleExportImage}
      />

      {/* Bilah Pilihan Keluarga di Atas (Sangat memudahkan orang tua) */}
      {viewMode === 'tree' && (
        <BranchBar
          activeBranch={activeBranch}
          onSelectBranch={handleSelectBranch}
        />
      )}

      {/* Konten Utama */}
      {viewMode === 'tree' ? (
        <div className="relative flex-1 w-full h-full bg-slate-50" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesDraggable={false} /* PENTING: Node terkunci agar tidak geser berantakan saat disentuh orang tua */
            panOnDrag={true}
            zoomOnPinch={true}
            zoomOnScroll={true}
            preventScrolling={false}
            minZoom={0.25}
            maxZoom={1.6}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            proOptions={{ hideAttribution: true }}
            className="touch-manipulation"
          >
            <Background color="#cbd5e1" gap={24} size={1.2} />

            {/* Desktop Controls */}
            <Controls position="bottom-right" showInteractive={false} className="hidden sm:block" />

            {/* Panduan Ramah Orang Tua di pojok atas */}
            <Panel position="top-left" className="m-3 pointer-events-none hidden sm:block">
              <div className="p-3 rounded-xl bg-white border-2 border-emerald-300 text-xs text-slate-800 max-w-xs space-y-1 shadow-md">
                <div className="font-black text-emerald-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>Cara Mudah Melihat:</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Tekan tombol nomor di atas (misal: <strong>2. Maryamah</strong> atau <strong>3. Maryanah</strong>) untuk melihat satu keluarga secara rapi & tidak pusing.
                </p>
              </div>
            </Panel>
          </ReactFlow>

          {/* Tombol Kontrol Nyaman di HP (Besar & Mudah Ditekan) */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5">
            <button
              onClick={handleJumpToRoots}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white text-amber-900 text-xs font-black border-2 border-amber-400 shadow-md active:scale-95"
              title="Lompat ke Kakek Khairi & Buang"
            >
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Ke Moyang</span>
            </button>

            <button
              onClick={handleResetView}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white text-emerald-900 text-xs font-black border-2 border-emerald-400 shadow-md active:scale-95"
              title="Pas-kan bagan di layar"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pas Layar</span>
            </button>

            <button
              onClick={() => zoomIn({ duration: 300 })}
              className="p-2 rounded-xl bg-white text-slate-900 border-2 border-slate-300 shadow-md active:scale-95 sm:hidden font-black text-sm"
              title="Perbesar Tulisan"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => zoomOut({ duration: 300 })}
              className="p-2 rounded-xl bg-white text-slate-900 border-2 border-slate-300 shadow-md active:scale-95 sm:hidden font-black text-sm"
              title="Perkecil"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Legenda Indikator */}
          <Legend />
        </div>
      ) : (
        /* Mode Buku Silsilah - Format Urut Tanpa Geser-Geser Kanvas */
        <FamilyListView
          onSelectPerson={(person) => {
            setSelectedPerson(person);
          }}
        />
      )}

      {/* Modal Detail Profil Anggota */}
      {selectedPerson && (
        <PersonDetailModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
          onSelectPerson={handleSelectPersonFromModal}
        />
      )}

      {/* Modal Data JSON */}
      {isJsonModalOpen && (
        <JsonDataModal onClose={() => setIsJsonModalOpen(false)} />
      )}
    </div>
  );
}
