'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Chatbot from '../components/Chatbot';
import '../i18n.js';

export default function ClientLayout({ children }) {
  return (
    <div className="App">
      <Navbar />
      <main>
        {children}
      </main>
      <Chatbot />
    </div>
  );
}
