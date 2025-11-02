import { Routes, Route } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


// Core Pages
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';

// --- ROTAS DE EXPANSÃO ATUALIZADAS ---
// 1. Restaurante (o antigo BlueprintForm)
import BlueprintForm from './pages/BlueprintForm';
// 2. Marcenaria (O NOVO MVP)
import MarcenariaPromptGenerator from './pages/MarcenariaPromptGenerator';
// --- FIM DAS ATUALIZAÇÕES ---

// Resource Hub Pages
import QuizPage from './pages/recursos/QuizPage.jsx';
import ComparadorPage from './pages/recursos/ComparadorPage.jsx';
import BibliotecaPromptsPage from './pages/recursos/BibliotecaPromptsPage.jsx';
import VideoPage from './pages/recursos/VideoPage.jsx';
import TemplatePage from './pages/recursos/TemplatePage.jsx';
import ResourcePage from './pages/recursos/ResourcePage.jsx';
import RecursosLandingPage from './pages/RecursosLandingPage.jsx';

// Glossary Pages
import GlossaryTermPage from './pages/recursos/GlossaryTermPage.jsx';
import GlossaryIndexPage from './pages/GlossaryIndexPage.jsx';

// Canva Privado
import BusinessModelCanvas from './pages/BusinessModelCanvas';



function App() {
  return (
    <AppShell
      header={{ height: 70 }}
      padding={0}
    >
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>

      <AppShell.Main
        style={{ background: '#f8f9fa' }}
      >
        <Routes>
          {/* Core App Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />

          {/* --- ROTAS DE EXPANSÃO ATUALIZADAS --- */}
          {/* Rota antiga /blueprint agora é /expansao/restaurante */}
          <Route path="/expansao/restaurante" element={<BlueprintForm />} />
          {/* Nova rota para o MVP de Marcenaria */}
          <Route path="/expansao/marcenaria" element={<MarcenariaPromptGenerator />} />
          {/* --- FIM DAS ATUALIZAÇÕES --- */}

          {/* Resource Hub Routes */}
          <Route path="/recursos" element={<RecursosLandingPage />} />
          <Route path="/recursos/quiz" element={<QuizPage />} />
          <Route path="/recursos/comparador" element={<ComparadorPage />} />
          <Route path="/recursos/biblioteca-prompts" element={<BibliotecaPromptsPage />} />
          <Route path="/recursos/video" element={<VideoPage />} />
          <Route path="/recursos/template" element={<TemplatePage />} />
          <Route path="/recursos/:slug" element={<ResourcePage />} />

          {/* Glossary Routes */}
          <Route path="/conhecimento" element={<GlossaryIndexPage />} />
          <Route path="/conhecimento/glossario/:slug" element={<GlossaryTermPage />} />

          {/* Canva Privado Route */}
          <Route path="/canvas-privado" element={<BusinessModelCanvas />} />

        </Routes>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
