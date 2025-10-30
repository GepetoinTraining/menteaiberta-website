import { useParams, Link } from 'react-router-dom';
import { Container, Title, Text, Card, Stack, Alert, Loader, Badge, Button, Group } from '@mantine/core';
import { IconAlertCircle, IconExternalLink, IconArrowLeft } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

// --- Default function to render standard text content ---
function TextContent({ content }) {
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Stack gap="md">
        {content.sections?.map((section, idx) => (
          <div key={idx}>
            {section.heading && (
              <Title order={3} size="h4" mb="sm">{section.heading}</Title>
            )}
            {/* Using dangerouslySetInnerHTML for potential simple formatting like bold/italic if needed,
                otherwise just use <Text>{section.text}</Text> */}
            <Text dangerouslySetInnerHTML={{ __html: section.text }} />
          </div>
        ))}
      </Stack>
    </Card>
  );
}

// --- Add other specific content renderers if needed ---
// Example: A component for interactive workflows might go here
// function WorkflowRenderer({ content }) { ... }

export default function ResourcePage() {
  // Use 'slug' to match the route parameter /recursos/:slug
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load resource content from JSON based on the slug
    const loadResource = async () => {
      if (!slug) {
        setError("Identificador do recurso não encontrado na URL.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch from the public content folder using the slug
        const response = await fetch(`/content/recursos/${slug}.json`); // Adjusted path

        if (!response.ok) {
           if (response.status === 404) {
              throw new Error(`Recurso "${slug}" não encontrado. Verifique se o arquivo JSON existe em /public/content/recursos/`);
           } else {
              throw new Error(`Erro ao carregar recurso: ${response.statusText}`);
           }
        }

        const data = await response.json();
        setContent(data);
        setError(null);
      } catch (err) {
        console.error("Error loading resource:", err);
        setError(err.message);
        setContent(null); // Clear content on error
      } finally {
        setLoading(false);
      }
    };

    loadResource();
  }, [slug]); // Reload when the slug changes

  if (loading) {
    return (
      <Container size="md" py="5rem">
        <Stack align="center" gap="md">
          <Loader size="lg" color="turquoise" />
          <Text c="dimmed">Carregando recurso...</Text>
        </Stack>
      </Container>
    );
  }

  // Back Button (always useful)
  const BackButton = () => (
     <Button
        component={Link}
        to="/conhecimento" // Link back to main knowledge page
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        size="sm"
        mb="lg" // Add margin bottom for spacing
      >
        Voltar para Conhecimento
      </Button>
  );

  if (error || !content) {
    return (
      <Container size="md" py="3rem">
        <Stack gap="lg">
           <BackButton />
           <Alert
            icon={<IconAlertCircle size={24} />}
            title="Erro ao Carregar Recurso"
            color="red"
          >
            <Text>
              Desculpe, não foi possível carregar este recurso. Verifique o URL ou tente novamente mais tarde.
            </Text>
            <Text mt="md" size="sm" c="dimmed">
              Detalhes: {error || 'Conteúdo não encontrado.'}
            </Text>
          </Alert>
        </Stack>
      </Container>
    );
  }

  // --- Render content based on its type ---
  // Default assumes 'text-content' for now. Expand this as needed.
  let ContentComponent;
  switch (content.type) {
    // Add cases for other types if your JSONs have them
    // case 'interactive-workflow':
    //   ContentComponent = WorkflowRenderer;
    //   break;
    case 'text-content': // Assuming this is a common type in your JSONs
    default:
      ContentComponent = TextContent;
  }


  return (
    <Container size="lg" py="3rem">
      <Stack gap="xl">
        <BackButton />

        {/* Header */}
        <div>
          {content.week && ( // Display week if available in the JSON
             <Badge color="turquoise" size="lg" mb="md">
                Semana {content.week}
             </Badge>
          )}
          <Title order={1} mb="md">{content.title || 'Recurso'}</Title>
          {content.description && (
            <Text size="lg" c="dimmed">{content.description}</Text>
          )}
        </div>

        {/* Render the specific content component */}
        <ContentComponent content={content} />

        {/* Optional: Add related links or next steps */}

      </Stack>
    </Container>
  );
}

// Ensure TextContent is defined (copied from previous ResourcePage version or keep as above)
// function TextContent({ content }) { ... }