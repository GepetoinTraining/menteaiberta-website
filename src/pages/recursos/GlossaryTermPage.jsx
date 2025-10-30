import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Title, Text, Stack, Badge, Button, Loader, Alert, Card, Group } from '@mantine/core';
import { IconArrowLeft, IconAlertCircle } from '@tabler/icons-react';

// Mock function to load glossary data
async function getGlossaryData() {
  // In a real app, fetch('/content/data/glossary_internal.json')
  const response = await fetch('/content/data/glossary_internal.json');
  if (!response.ok) {
    throw new Error('Failed to load internal glossary database');
  }
  return await response.json();
}

export default function GlossaryTermPage() {
  const { slug } = useParams(); // Get term slug from URL
  const [termData, setTermData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTerms, setAllTerms] = useState(null); // To lookup related terms

  useEffect(() => {
    const fetchTerm = async () => {
      if (!slug) {
        setError("Termo não especificado na URL.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getGlossaryData();
        setAllTerms(data); // Store all terms for related lookups

        if (data[slug]) {
          setTermData(data[slug]);
          setError(null);
        } else {
          throw new Error(`Termo "${slug}" não encontrado no glossário interno.`);
        }
      } catch (err) {
        console.error("Error fetching glossary term:", err);
        setError(err.message);
        setTermData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTerm();
  }, [slug]);

  // Back Button Component
  const BackButton = () => (
     <Button
        component={Link}
        to="/conhecimento" // Link to the main glossary index page (to be created)
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        size="sm"
        mb="lg"
      >
        Voltar para Glossário
      </Button>
  );

  if (loading) {
    return (
      <Container size="md" py="5rem">
        <Stack align="center" gap="md">
          <Loader size="lg" color="turquoise" />
          <Text c="dimmed">Carregando termo...</Text>
        </Stack>
      </Container>
    );
  }

  if (error || !termData) {
    return (
      <Container size="lg" py="3rem">
         <BackButton />
        <Alert icon={<IconAlertCircle size={16} />} title="Erro ao Carregar Termo" color="red" radius="md">
          {error || 'Não foi possível carregar as informações do termo.'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="md" py="3rem">
      <Stack gap="xl">
        <BackButton />
        <div>
          <Badge color="cyan" size="lg" mb="md">
            Glossário (Semana {termData.week})
          </Badge>
          <Title order={1} mb="md">{termData.term}</Title>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={4} size="h5">Definição</Title>
            <Text>{termData.definition}</Text>

            {termData.context && (
              <>
                <Title order={4} size="h5" mt="md">Contexto Adicional</Title>
                <Text size="sm" c="dimmed">{termData.context}</Text>
              </>
            )}

            {termData.relatedTerms && termData.relatedTerms.length > 0 && allTerms && (
               <>
                <Title order={4} size="h5" mt="md">Termos Relacionados</Title>
                 <Group gap="xs">
                   {termData.relatedTerms.map(relatedSlug => (
                     allTerms[relatedSlug] ? (
                       <Button
                         key={relatedSlug}
                         component={Link}
                         to={`/conhecimento/glossario/${relatedSlug}`}
                         variant="light"
                         color="blue"
                         size="xs"
                         radius="xl"
                       >
                         {allTerms[relatedSlug].term}
                       </Button>
                     ) : null // Silently ignore if related term doesn't exist
                   ))}
                 </Group>
               </>
            )}
          </Stack>
        </Card>

      </Stack>
    </Container>
  );
}