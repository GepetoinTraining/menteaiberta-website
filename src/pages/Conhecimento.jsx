import { Container, Title, Text, Card, Stack, Grid, Badge, Group } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconBook, IconLock } from '@tabler/icons-react'

function Conhecimento() {
  const modules = [
    {
      title: 'Módulo 1: O Explorador',
      subtitle: 'Semanas 1-6',
      description: 'Descubra as ferramentas de IA e aprenda a usar cada uma para tarefas específicas',
      color: '#00D1D1',
      lessons: [
        { week: 1, title: 'Personalidades da IA', available: true },
        { week: 2, title: 'Prompts que Funcionam', available: false },
        { week: 3, title: 'Verificando Informações', available: false },
        { week: 4, title: 'IA como Tutor Pessoal', available: false },
        { week: 5, title: 'Criando Conteúdo', available: false },
        { week: 6, title: 'Projeto: Guia de Estudos', available: false }
      ]
    },
    {
      title: 'Módulo 2: O Criador',
      subtitle: 'Semanas 7-12',
      description: 'Crie projetos originais usando IA como ferramenta de criatividade e inovação',
      color: '#FFD447',
      lessons: [
        { week: 7, title: 'IA e Criatividade', available: false },
        { week: 8, title: 'Escrita Assistida', available: false },
        { week: 9, title: 'Imagens e Arte', available: false },
        { week: 10, title: 'Música e Áudio', available: false },
        { week: 11, title: 'Vídeo e Apresentações', available: false },
        { week: 12, title: 'Projeto: Portfolio Digital', available: false }
      ]
    },
    {
      title: 'Módulo 3: O Colaborador',
      subtitle: 'Semanas 13-18',
      description: 'Trabalhe em equipe com IA para resolver problemas complexos e desenvolver soluções',
      color: '#1B2B34',
      lessons: [
        { week: 13, title: 'IA em Grupo', available: false },
        { week: 14, title: 'Pesquisa Colaborativa', available: false },
        { week: 15, title: 'Gestão de Projetos', available: false },
        { week: 16, title: 'Apresentações Profissionais', available: false },
        { week: 17, title: 'Ética e Responsabilidade', available: false },
        { week: 18, title: 'Projeto: Solução Comunitária', available: false }
      ]
    },
    {
      title: 'Módulo 4: O Profissional',
      subtitle: 'Semanas 19-24',
      description: 'Prepare-se para o mercado de trabalho e universidade com competências avançadas em IA',
      color: '#00D1D1',
      lessons: [
        { week: 19, title: 'IA no Mercado', available: false },
        { week: 20, title: 'Automação Inteligente', available: false },
        { week: 21, title: 'Análise de Dados', available: false },
        { week: 22, title: 'Programação Assistida', available: false },
        { week: 23, title: 'Empreendedorismo com IA', available: false },
        { week: 24, title: 'Projeto Final: Seu Futuro', available: false }
      ]
    }
  ]

  return (
    <Container size="xl" py="3rem">
      <Stack gap="xl">
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <Title order={1} mb="md">Central de Conhecimento</Title>
          <Text size="lg" c="dimmed">
            24 semanas de conteúdo estruturado para dominar o uso de IA na educação e além. 
            Cada lição inclui teoria, prática e recursos interativos via QR code.
          </Text>
        </div>

        {modules.map((module, idx) => (
          <Card key={idx} shadow="sm" padding="xl" radius="md" withBorder>
            <Stack gap="lg">
              <div>
                <Group gap="xs" mb="xs">
                  <Badge color={module.color} size="lg" variant="filled">
                    {module.subtitle}
                  </Badge>
                </Group>
                <Title order={2} mb="xs">{module.title}</Title>
                <Text c="dimmed">{module.description}</Text>
              </div>

              <Grid>
                {module.lessons.map((lesson) => (
                  <Grid.Col key={lesson.week} span={{ base: 12, sm: 6, md: 4 }}>
                    {lesson.available ? (
                      <Card
                        component={Link}
                        to={`/conhecimento/semana-${lesson.week}`}
                        shadow="xs"
                        padding="lg"
                        radius="md"
                        style={{
                          border: '2px solid #00D1D1',
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)'
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,209,209,0.2)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = ''
                        }}
                      >
                        <Stack gap="xs">
                          <Group justify="space-between">
                            <Badge color="turquoise" variant="light">
                              Semana {lesson.week}
                            </Badge>
                            <IconBook size={20} color="#00D1D1" />
                          </Group>
                          <Title order={4} c="navy">{lesson.title}</Title>
                        </Stack>
                      </Card>
                    ) : (
                      <Card
                        shadow="xs"
                        padding="lg"
                        radius="md"
                        style={{
                          border: '2px solid #e0e0e0',
                          opacity: 0.6,
                          cursor: 'not-allowed'
                        }}
                      >
                        <Stack gap="xs">
                          <Group justify="space-between">
                            <Badge color="gray" variant="light">
                              Semana {lesson.week}
                            </Badge>
                            <IconLock size={20} color="#999" />
                          </Group>
                          <Title order={4} c="dimmed">{lesson.title}</Title>
                        </Stack>
                      </Card>
                    )}
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </Card>
        ))}

        <Card
          padding="xl"
          radius="md"
          style={{
            background: 'linear-gradient(135deg, #1B2B34 0%, #2a3d49 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Stack gap="md">
            <Title order={3}>Mais Conteúdo em Breve</Title>
            <Text>
              Novas lições serão liberadas progressivamente. Continue praticando 
              com a Semana 1 e fique atento às próximas atualizações!
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}

export default Conhecimento