import { useState, useEffect } from 'react'; // Added useEffect
import { Card, Stack, Title, Text, TextInput, Select, Grid, Button, Group, Badge, CopyButton, Tooltip, Loader, Center } from '@mantine/core'; // Added Loader, Center
import { IconBook, IconSearch, IconCopy, IconCheck } from '@tabler/icons-react';

// Mock function to load prompts (replace with actual fetch from prompts.json)
async function loadAllPrompts() {
  // In a real app, you would fetch('/content/data/prompts.json')
  const allPrompts = [
    // --- Added Lesson Numbers ---
    {
      id: 1,
      lesson: 1, // Added
      title: 'O Gerador de Ideias Criativas',
      category: 'Criatividade & Escrita',
      bestAI: 'Claude',
      aiColor: '#00D1D1',
      description: 'Para quando você está aprendendo programação e precisa de ajuda com erros',
      prompt: 'Estou aprendendo Python e estou com um erro no meu código. O objetivo do código é [OBJETIVO DO CÓDIGO]. O erro que recebo é [MENSAGEM DE ERRO]. Aqui está o código: [SEU CÓDIGO]. Explique o que está errado e sugira uma correção.'
    },
    {
      id: 6,
      lesson: 4, // Added (Assuming Cronogramas relates to Lesson 4 Workflow)
      title: 'O Criador de Cronogramas',
      category: 'Produtividade',
      bestAI: 'ChatGPT',
      aiColor: '#10a37f',
      description: 'Organize seus estudos com um plano estruturado e realista',
      prompt: 'Preciso criar um cronograma de estudos para [MATÉRIA/PROVA] que acontece em [TEMPO DISPONÍVEL]. Tenho [X HORAS POR DIA] disponíveis. Atue como um tutor experiente e crie um plano realista e eficiente, dividido por dias.'
    },
    {
      id: 7,
      lesson: 11, // Added (Assuming Correção relates to Lesson 11 Iteration)
      title: 'O Corretor de Redação',
      category: 'Criatividade & Escrita',
      bestAI: 'Gemini',
      aiColor: '#4285f4',
      description: 'Receba feedback construtivo sobre seus textos',
      prompt: 'Escrevi uma redação sobre [TEMA] e preciso de feedback. Analise o texto abaixo e aponte: 1) Pontos fortes; 2) O que pode melhorar; 3) Sugestões específicas de como aprimorar. Seja honesto mas construtivo.\n\n[COLE SUA REDAÇÃO AQUI]'
    },
    {
      id: 8,
      lesson: 16, // Added (Assuming Questões relates to Lesson 16 Creative Materials)
      title: 'O Gerador de Questões de Estudo',
      category: 'Estudo & Aprendizagem',
      bestAI: 'ChatGPT',
      aiColor: '#10a37f',
      description: 'Crie questões para testar seu próprio conhecimento',
      prompt: 'Acabei de estudar sobre [TEMA/CAPÍTULO]. Atue como um professor exigente e crie 10 questões de múltipla escolha para testar meu entendimento. Inclua: questões fáceis (3), médias (5) e difíceis (2). No final, forneça as respostas corretas com explicações.'
    },
    // --- ADD ALL OTHER PROMPTS HERE with their respective 'lesson' number ---
    // Example from Lesson 7
     {
      id: 9, // Example ID
      lesson: 7,
      title: 'Deconstrutor de Prompt (Ex. 1)',
      category: 'Engenharia de Prompt',
      bestAI: 'Any',
      aiColor: '#888',
      description: 'Analise um prompt para identificar Papel, Tarefa e Formato.',
      prompt: 'Atue como um nutricionista. Liste os 5 melhores alimentos para o café da manhã para um estudante adolescente. Apresente a lista em formato de bullet points.'
    },
    // Example from Lesson 20
    {
      id: 20, // Example ID
      lesson: 20,
      title: 'Sparring de Pensamento Crítico',
      category: 'Habilidades Futuro',
      bestAI: 'Gemini',
      aiColor: '#4285f4',
      description: 'Analise criticamente uma notícia recente.',
      prompt: 'Atue como um jornalista investigativo cético, aplicando o pensamento crítico. Acabei de ler a seguinte notícia: [COLE O TÍTULO E O PRIMEIRO PARÁGRAFO DA NOTÍCIA]. Faça 5 perguntas investigativas que me ajudem a analisar esta notícia de forma mais profunda. As perguntas devem focar em identificar o viés, questionar as fontes, considerar outras perspectivas e avaliar as evidências apresentadas.'
    },
     // Add prompts related to L10, L11, L14, L15, L17, L20, L22, L23 here...
  ];
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate loading
  return allPrompts;
}


// 1. Accept the currentWeek prop
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
    { value: 'Habilidades Futuro', label: 'Habilidades Futuro' },
    { value: 'Projetos Escolares', label: 'Projetos Escolares' },
    { value: 'Produtividade', label: 'Produtividade' },
    // Add other categories as needed
  ];

  // 3. Modify filteredPrompts logic
  const filteredPrompts = allPrompts.filter(prompt => {
    // --- THIS IS THE NEW LOGIC ---
    // Ensure lesson is defined and <= currentWeek
    const matchesWeek = prompt.lesson && prompt.lesson <= parseInt(currentWeek);
    if (!matchesWeek) return false;
    // --- END NEW LOGIC ---

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
    )
  }

  if (error) {
     return (
        <Alert title="Erro" color="red" radius="md">
          {error}
        </Alert>
     )
  }

  return (
    <Stack gap="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
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
                   {/* Card Header */}
                  <Group justify="space-between" mb="xs">
                    <Title order={4} size="h5">{item.title}</Title>
                     <Tooltip label={`Desbloqueado na Semana ${item.lesson}`}>
                        <Badge color="gray" variant="light" size="sm">
                          Semana {item.lesson}
                        </Badge>
                      </Tooltip>
                  </Group>

                  {/* Category and Best AI */}
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


                  {/* Description */}
                  <Text size="sm" c="dimmed" mb="md">
                    {item.description}
                  </Text>

                  {/* Prompt Text */}
                  <Card padding="sm" radius="md" style={{ background: '#f8f9fa' }}>
                    <Text size="sm" style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                      {item.prompt}
                    </Text>
                  </Card>
                </div>

                {/* Copy Button */}
                <div>
                  <CopyButton value={item.prompt} timeout={2000}>
                    {({ copied, copy }) => (
                      <Button
                        color={copied ? 'teal' : 'turquoise'}
                        onClick={copy}
                        leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                        fullWidth
                        variant={copied ? 'light' : 'filled'}
                        mt="md" // Added margin top
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

      {/* No Results Message */}
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

      {/* Usage Tip */}
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