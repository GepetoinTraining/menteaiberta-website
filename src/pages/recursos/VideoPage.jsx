import { Container, Title, Text, Stack, Badge, Button, AspectRatio, Loader, Alert } from '@mantine/core';
import { Link, useSearchParams } from 'react-router-dom';
import { IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

// Mock function to get video data (replace with actual data fetching from videos.json)
async function getVideoData(videoId) {
  const videoDatabase = {
    'erros-ia-L2': { title: 'Erros Engraçados de IAs', week: 2, youtubeId: 'dQw4w9WgXcQ' }, // Example ID, replace!
    'stacking-L3': { title: 'Tutoriais de Stacking de Ferramentas', week: 3, youtubeId: 'VIDEO_ID_HERE' },
    'workflow-prod-L4': { title: 'Workflow de IA para Produtividade', week: 4, youtubeId: 'VIDEO_ID_HERE' },
    'truques-visao-L5': { title: 'Truques de Visão Computacional', week: 5, youtubeId: 'VIDEO_ID_HERE' },
    'ted-pitch-L6': { title: 'A Arte de Fazer Pitches Curtos (TED)', week: 6, youtubeId: 'VIDEO_ID_HERE' },
    'kanban-L9': { title: 'Tutorial Ferramenta Kanban (Trello)', week: 9, youtubeId: 'VIDEO_ID_HERE' },
    'processo-escrita-L11': { title: 'Processo Real de Escrita e Rascunho', week: 11, youtubeId: 'VIDEO_ID_HERE' },
    'josh-kaufman-L12': { title: 'As Primeiras 20 Horas (Josh Kaufman)', week: 12, youtubeId: 'VIDEO_ID_HERE' },
    'teded-estilos-L13': { title: 'Estilos de Aprendizagem (TED-Ed)', week: 13, youtubeId: 'VIDEO_ID_HERE' },
    'ciencia-visual-L14': { title: 'Canais de Ciência Visual (Kurzgesagt, etc.)', week: 14, youtubeId: 'PLAYLIST_ID_HERE' }, // Example Playlist
    'feynman-L16': { title: 'A Técnica de Feynman', week: 16, youtubeId: 'VIDEO_ID_HERE' },
    'feynman-original-L17': { title: 'Origem da Técnica de Feynman', week: 17, youtubeId: 'VIDEO_ID_HERE' },
    'ted-comunicacao-L18': { title: 'Como Tornar Ideias Complexas Memoráveis (TED)', week: 18, youtubeId: 'VIDEO_ID_HERE' },
    '4cs-L20': { title: 'A Importância dos 4 Cs', week: 20, youtubeId: 'VIDEO_ID_HERE' },
    'mvp-dropbox-L22': { title: 'O Conceito de MVP (Exemplo Dropbox)', week: 22, youtubeId: 'VIDEO_ID_HERE' },
    'ycombinator-L23': { title: 'A Importância de Falar com Usuários (Y Combinator)', week: 23, youtubeId: 'VIDEO_ID_HERE' },
    'pitch-disrupt-L24': { title: 'Exemplo de Pitch (TechCrunch Disrupt)', week: 24, youtubeId: 'VIDEO_ID_HERE' },
    // Add all other video IDs here...
  };
  await new Promise(resolve => setTimeout(resolve, 150)); // Simulate loading
  return videoDatabase[videoId] || null;
}

export default function VideoPage() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('id');
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) {
      setError('ID do vídeo não especificado na URL.');
      setLoading(false);
      return;
    }

    const fetchVideo = async () => {
      try {
        setLoading(true);
        const data = await getVideoData(videoId);
        if (!data) {
          throw new Error(`Vídeo com ID "${videoId}" não encontrado.`);
        }
        setVideoData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setVideoData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading) {
    return (
      <Container size="md" py="5rem">
        <Stack align="center" gap="md">
          <Loader size="lg" color="turquoise" />
          <Text c="dimmed">Carregando vídeo...</Text>
        </Stack>
      </Container>
    );
  }

  if (error || !videoData) {
     return (
      <Container size="lg" py="3rem">
         <Button
            component={Link}
            to="/conhecimento"
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            size="sm"
            mb="lg"
          >
            Voltar para Conhecimento
          </Button>
        <Alert icon={<IconAlertCircle size={16} />} title="Erro ao Carregar Vídeo" color="red">
          {error || 'Não foi possível carregar as informações do vídeo.'}
        </Alert>
      </Container>
    );
  }

  // Construct YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoData.youtubeId}`;

  return (
    <Container size="lg" py="3rem">
      <Stack gap="xl">
        <Button
          component={Link}
          to="/conhecimento" // Link back to main knowledge page
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          size="sm"
        >
          Voltar para Conhecimento
        </Button>
        <div>
          <Badge color="turquoise" size="lg" mb="md">
            Recurso em Vídeo (Semana {videoData.week})
          </Badge>
          <Title order={1} mb="md">{videoData.title}</Title>
          {videoData.description && (
             <Text c="dimmed" mb="lg">{videoData.description}</Text>
          )}
        </div>

        <AspectRatio ratio={16 / 9}>
          <iframe
            src={embedUrl}
            title={videoData.title}
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>

      </Stack>
    </Container>
  );
}