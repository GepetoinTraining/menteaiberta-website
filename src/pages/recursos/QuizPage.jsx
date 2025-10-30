import { Container, Title, Text, Stack, Badge, Button, Loader, Alert } from '@mantine/core';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';
import QuizInterativo from '../../components/QuizInterativo'; // Adjust path if needed
import { useEffect, useState } from 'react';

// Mock function to get quiz metadata (replace with actual data fetching)
async function getQuizMetadata(quizId) {
  // In a real app, you'd fetch this from '/content/data/quizzes.json'
  const response = await fetch('/content/data/quizzes.json');
  if (!response.ok) {
    throw new Error('Failed to load quiz database');
  }
  const quizDatabase = await response.json();
  // console.log("Quiz DB:", quizDatabase); // Debugging line
  // console.log("Looking for ID:", quizId); // Debugging line
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
      setError('ID do quiz não especificado na URL (ex: /recursos/quiz?id=semana1-quiz).');
      setLoading(false);
      return;
    }

    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const data = await getQuizMetadata(quizId);
        if (!data) {
          throw new Error(`Metadados para o quiz ID "${quizId}" não encontrados em quizzes.json.`);
        }
        setMetadata(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching quiz metadata:", err);
        setError(err.message);
        setMetadata(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [quizId]);

  // Back Button Component
  const BackButton = () => (
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
  );


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
         <BackButton />
        <Alert icon={<IconAlertCircle size={16} />} title="Erro ao Carregar Quiz" color="red" radius="md">
          {error || 'Não foi possível carregar as informações do quiz.'}
          <Text size="xs" mt="xs">Verifique se o ID "{quizId}" existe em <code>public/content/data/quizzes.json</code>.</Text>
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="3rem">
      <Stack gap="xl">
        <BackButton />
        <div>
          <Badge color="turquoise" size="lg" mb="md">
            Recurso Interativo (Semana {metadata.week})
          </Badge>
          <Title order={1} mb="md">{metadata.title}</Title>
          {metadata.description && (
             <Text c="dimmed" mb="lg">{metadata.description}</Text>
          )}
           {!metadata.description && (
             <Text c="dimmed" mb="lg">Complete o quiz abaixo para testar seu conhecimento.</Text>
           )}
        </div>

        {/* Render the Quiz component, passing the ID */}
        <QuizInterativo quizId={quizId} />

      </Stack>
    </Container>
  );
}