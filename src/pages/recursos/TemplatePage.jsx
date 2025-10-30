import { Container, Title, Text, Stack, Badge, Button, Card, Loader, Alert } from '@mantine/core';
import { Link, useSearchParams } from 'react-router-dom';
import { IconArrowLeft, IconExternalLink, IconAlertCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

// Mock function to get template data (replace with actual data fetching from templates.json)
async function getTemplateData(templateId) {
  const templateDatabase = {
    'toolkit-L3': { title: 'Template: Toolkit Pessoal de IA', week: 3, description: 'Um template simples no Google Slides para organizar suas ferramentas de IA favoritas.', url: 'YOUR_GOOGLE_SLIDE_LINK_HERE' },
    'workflow-docs-L4': { title: 'Template: Workflow no Google Docs', week: 4, description: 'Estrutura para documentar seus workflows de IA passo a passo.', url: 'YOUR_GOOGLE_DOC_LINK_HERE' },
    'apresentacao-L6': { title: 'Template: Apresentação Problema-Solução', week: 6, description: 'Modelo de Google Slides para pitchs curtos e impactantes.', url: 'YOUR_GOOGLE_SLIDE_LINK_HERE' },
    'plano-ataque-L9': { title: 'Template: Plano de Ataque de Projeto', week: 9, description: 'Estrutura no Google Docs para decompor projetos em tarefas.', url: 'YOUR_GOOGLE_DOC_LINK_HERE' },
    'estacionamento-ideias-L10': { title: 'Template: Estacionamento de Ideias', week: 10, description: 'Modelo simples no Google Keep ou Notion para anotar ideias futuras.', url: 'YOUR_NOTION_OR_KEEP_LINK_HERE' },
    'diario-bordo-L12': { title: 'Template: Diário de Bordo', week: 12, description: 'Modelo no Google Slides para documentar seu progresso diário em um desafio de aprendizado.', url: 'YOUR_GOOGLE_SLIDE_LINK_HERE' },
    'microaula-L18': { title: 'Template: Plano de Microaula', week: 18, description: 'Estrutura no Google Docs para planejar uma aula de 3 minutos.', url: 'YOUR_GOOGLE_DOC_LINK_HERE' },
    'persona-L21': { title: 'Template: Ficha de Persona', week: 21, description: 'Modelo no Google Docs para criar personas de usuário detalhadas.', url: 'YOUR_GOOGLE_DOC_LINK_HERE' },
    'pitch-L24': { title: 'Template: Apresentação de Pitch', week: 24, description: 'Estrutura no Google Slides para pitchs de 3 minutos.', url: 'YOUR_GOOGLE_SLIDE_LINK_HERE' },
    // Add all other template IDs here...
  };
  await new Promise(resolve => setTimeout(resolve, 120)); // Simulate loading
  return templateDatabase[templateId] || null;
}

export default function TemplatePage() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('id');
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    if (!templateId) {
      setError('ID do template não especificado na URL.');
      setLoading(false);
      return;
    }

    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const data = await getTemplateData(templateId);
        if (!data) {
          throw new Error(`Template com ID "${templateId}" não encontrado.`);
        }
        setTemplateData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTemplateData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId]);

  if (loading) {
    return (
      <Container size="md" py="5rem">
        <Stack align="center" gap="md">
          <Loader size="lg" color="turquoise" />
          <Text c="dimmed">Carregando template...</Text>
        </Stack>
      </Container>
    );
  }

   if (error || !templateData) {
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
        <Alert icon={<IconAlertCircle size={16} />} title="Erro ao Carregar Template" color="red">
          {error || 'Não foi possível carregar as informações do template.'}
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
            Template (Semana {templateData.week})
          </Badge>
          <Title order={1} mb="md">{templateData.title}</Title>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Text>
              {templateData.description}
            </Text>
            <Button
              component="a"
              href={templateData.url}
              target="_blank" // Open in new tab
              rel="noopener noreferrer"
              color="turquoise"
              size="lg"
              leftSection={<IconExternalLink size={20} />}
            >
              Acessar Template
            </Button>
            <Text size="xs" c="dimmed">
              (Você pode precisar fazer uma cópia para editar)
            </Text>
          </Stack>
        </Card>

      </Stack>
    </Container>
  );
}