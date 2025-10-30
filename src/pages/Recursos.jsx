import { Container, Title, Text, Stack, Badge, Button, Loader, Alert } from '@mantine/core';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';
import QuizInterativo from '../../components/QuizInterativo'; // Adjust path if needed
import { useEffect, useState } from 'react'; // Added for fetching quiz metadata (optional)

// Mock function to get quiz metadata (replace with actual data fetching)
async function getQuizMetadata(quizId) {
  // In a real app, you'd fetch this from a quizzes.json or an API
  const quizDatabase = {
    'semana1-quiz': { title: 'Qual IA combina com seu estilo?', week: 1 },
    'semana2-puzzle': { title: 'Quebra-Cabeças Lógicos', week: 2 },
    'semana13-diagnostico': { title: 'Diagnóstico de Estilo de Aprendizagem', week: 13 },
    'semana15-verdadeiro-falso': { title: 'Verdadeiro ou Falso?', week: 15 },
    // Add other quiz IDs here...
  };
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate loading
  return quizDatabase[quizId] || null;
}

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('id');
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!quizId) {
      setError('ID do quiz não especificado na URL.');
      setLoading(false);
      return;
    }

    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const data = await getQuizMetadata(quizId);
        if (!data) {
          throw new Error(`Metadados para o quiz ID "${quizId}" não encontrados.`);
        }
        setMetadata(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMetadata(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [quizId]);

  if (loading) {
    return (
      <Container size="md" py="5rem">
        <Stack align="center" gap="md">
          <Loader size="lg" color="turquoise" />
          <Text c="dimmed">Carregando quiz...</Text>
        </Stack>
      </Container>
    );
  }

  if (error || !metadata) {
    return (
      <Container size="lg" py="3rem">
         <Button
            component={Link}
            to="/conhecimento" // Link back to main knowledge page
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            size="sm"
            mb="lg"
          >
            Voltar para Conhecimento
          </Button>
        <Alert icon={<IconAlertCircle size={16} />} title="Erro ao Carregar Quiz" color="red">
          {error || 'Não foi possível carregar as informações do quiz.'}
        </Alert>
      </Container>
    );
  }

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
            Recurso Interativo (Semana {metadata.week})
          </Badge>
          <Title order={1} mb="md">{metadata.title}</Title>
          <Text c="dimmed" mb="lg">
            Complete o quiz abaixo para testar seu conhecimento.
          </Text>
        </div>

        {/* Render the Quiz component, passing the ID */}
        <QuizInterativo quizId={quizId} />

      </Stack>
    </Container>
  );
}