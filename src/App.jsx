import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import FamilyTree from './components/FamilyTree';

export default function App() {
  return (
    <main className="w-full h-screen h-[100dvh] overflow-hidden bg-slate-50 font-sans text-slate-800 select-none">
      <ReactFlowProvider>
        <FamilyTree />
      </ReactFlowProvider>
    </main>
  );
}
