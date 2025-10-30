import { useState, useEffect } from 'react';
import { Card, Stack, Title, Text, TextInput, Select, Grid, Button, Group, Badge, CopyButton, Tooltip, Loader, Center, Alert } from '@mantine/core'; // Added Alert
import { IconBook, IconSearch, IconCopy, IconCheck, IconAlertCircle } from '@tabler/icons-react'; // Added IconAlertCircle
import { loadAllPrompts } from '../../data/promptsData'; // --- IMPORT THE DATA FUNCTION ---

// Removed the inline mock function

export default function BibliotecaPrompts({ currentWeek = 24 }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [allPrompts, setAllPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        // --- USE THE IMPORTED FUNCTION ---
        const data = await loadAllPrompts();
        setAllPrompts(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load prompts:", err);
        setError("Não foi possível carregar os prompts.");
        setAllPrompts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []); // Load once on mount


  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'Estudo & Aprendizagem', label: 'Estudo & Aprendizagem' },
    { value: 'Criatividade & Escrita', label: 'Criatividade & Escrita' },
    { value: 'Engenharia de Prompt', label: 'Engenharia de Prompt' },
    { value: 'Pensamento Crítico', label: 'Pensamento Crítico' },
    { value: 'Pesquisa & Verificação', label: 'Pesquisa & Verificação' },
    { value: 'Projetos & Inovação', label: 'Projetos & Inovação' },
    { value: 'Habilidades Futuro', label: 'Habilidades Futuro' },
    { value: 'Projetos Escolares', label: 'Projetos Escolares' },
    { value: 'Produtividade', label: 'Produtividade' },
    // Add other categories derived from the data if needed
  ];

  // Filter logic remains the same
  const filteredPrompts = allPrompts.filter(prompt => {
    const matchesWeek = prompt.lesson && prompt.lesson <= parseInt(currentWeek);
    if (!matchesWeek) return false;

    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Center style={{ height: 200 }}>
        <Loader color="turquoise" />
      </Center>
    );
  }

  if (error) {
     return (
        <Alert title="Erro" color="red" radius="md" icon={<IconAlertCircle size={16}/>}>
          {error}
        </Alert>
     );
  }

  // --- JSX rendering remains largely the same ---
  // Ensure the fields accessed in the map (item.title, item.lesson, etc.)
  // match the structure in promptsData.js

  return (
    <Stack gap="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
         {/* ... Search and Filter UI ... */}
         <Stack gap="md">
          <Group justify="space-between" align="flex-start" wrap="wrap">
            <div style={{ flex: 1, minWidth: 250 }}>
              <Title order={3} size="h4" mb="xs">Biblioteca de Prompts</Title>
              <Text size="sm" c="dimmed">
                Prompts prontos para usar nas suas tarefas. Copie, personalize e experimente!
              </Text>
            </div>
            <Badge size="lg" color="turquoise" variant="light">
              {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt desbloqueado' : 'prompts desbloqueados'}
            </Badge>
          </Group>

          <Grid>
            <Grid.Col span={{ base: 12, sm: 8 }}>
              <TextInput
                placeholder="Buscar prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftSection={<IconSearch size={16} />}
                size="md"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                data={categories}
                size="md"
                placeholder="Filtrar por categoria"
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      <Grid>
        {filteredPrompts.map((item) => (
          <Grid.Col key={item.id} span={{ base: 12, md: 6 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
              <Stack gap="md" h="100%" justify="space-between">
                <div>
                  <Group justify="space-between" mb="xs">
                    <Title order={4} size="h5">{item.title}</Title>
                     <Tooltip label={`Desbloqueado na Semana ${item.lesson}`}>
                        <Badge color="gray" variant="light" size="sm">
                          Semana {item.lesson}
                        </Badge>
                      </Tooltip>
                  </Group>

                  <Group justify="space-between" mb="md">
                     <Badge color="cyan" variant="outline" size="xs">
                        {item.category}
                      </Badge>
                     {item.bestAI && (
                       <Group gap="xs">
                        <Text size="xs" c="dimmed">Melhor IA:</Text>
                        <Badge
                          size="sm"
                          variant="dot"
                          style={{
                            borderColor: item.aiColor || '#888',
                            color: item.aiColor || '#888'
                          }}
                        >
                          {item.bestAI}
                        </Badge>
                      </Group>
                     )}
                  </Group>

                  <Text size="sm" c="dimmed" mb="md">
                    {item.description}
                  </Text>

                  <Card padding="sm" radius="md" style={{ background: '#f8f9fa' }}>
                    <Text size="sm" style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                      {item.prompt}
                    </Text>
                  </Card>
                </div>

                <div>
                  <CopyButton value={item.prompt} timeout={2000}>
                    {({ copied, copy }) => (
                      <Button
                        color={copied ? 'teal' : 'turquoise'}
                        onClick={copy}
                        leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                        fullWidth
                        variant={copied ? 'light' : 'filled'}
                        mt="md"
                      >
                        {copied ? 'Copiado!' : 'Copiar Prompt'}
                      </Button>
                    )}
                  </CopyButton>
                </div>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {!loading && filteredPrompts.length === 0 && (
         <Card padding="xl" radius="md" style={{ background: '#f8f9fa', textAlign: 'center' }}>
          <Stack gap="md" align="center">
            <IconBook size={48} color="#ccc" />
            <div>
              <Title order={4} c="dimmed">Nenhum prompt encontrado</Title>
              <Text size="sm" c="dimmed">
                Tente ajustar os filtros, a busca ou avance nas semanas para desbloquear mais prompts!
              </Text>
            </div>
          </Stack>
        </Card>
      )}

      <Card padding="md" radius="md" style={{ background: '#f8f9fa' }}>
        <Stack gap="xs">
          <Text fw={600} size="sm">💡 Dica de Uso</Text>
          <Text size="sm">
            Os prompts são templates - substitua os textos entre [COLCHETES] com suas
            informações específicas. Quanto mais contexto você der, melhor será a resposta da IA!
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
}