import { Container, Title, Text, Card, Stack, Grid, Avatar, Group } from '@mantine/core'
import { IconSparkles, IconBrain, IconCode } from '@tabler/icons-react'

function Sobre() {
  const coCreators = [
    {
      name: 'Claude',
      company: 'Anthropic',
      role: 'Design Pedagógico & Estruturação de Conteúdo',
      icon: IconSparkles,
      color: '#00D1D1',
      contribution: 'Responsável pela arquitetura pedagógica do curso, design dos personagens e estruturação das lições seguindo princípios de task-based learning.'
    },
    {
      name: 'ChatGPT',
      company: 'OpenAI',
      role: 'Desenvolvimento Técnico & Implementação',
      icon: IconCode,
      color: '#10a37f',
      contribution: 'Desenvolvimento do website, ferramentas interativas e infraestrutura técnica que sustenta a experiência digital do curso.'
    },
    {
      name: 'Gemini',
      company: 'Google',
      role: 'Análise & Estruturação de Dados',
      icon: IconBrain,
      color: '#4285f4',
      contribution: 'Parsing e estruturação de conteúdo educacional, conversão de material bruto em formatos estruturados e validação de consistência.'
    }
  ]

  return (
    <Container size="xl" py="3rem">
      <Stack gap="xl">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <Title order={1} mb="md">Sobre o Menteaberta</Title>
          <Text size="lg" c="dimmed">
            Um curso co-criado COM IA para ensinar SOBRE IA - provando que humanos e 
            inteligências artificiais podem colaborar de forma genuína quando guiados 
            por princípios pedagógicos sólidos.
          </Text>
        </div>

        {/* O Projeto */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>O Projeto</Title>
            <Text>
              Menteaberta nasceu da observação direta de uma realidade inevitável: estudantes 
              do ensino médio já usam IA em seus estudos, mas sem compreender seu potencial 
              real ou seus riscos. Em vez de proibir ou ignorar essa realidade, decidimos educar.
            </Text>
            <Text>
              Este não é apenas um curso sobre IA - é um curso que demonstra, através de sua 
              própria existência, como a colaboração entre humanos e IA pode produzir resultados 
              educacionais de qualidade quando orientada por expertise pedagógica e transparência ética.
            </Text>
            <Text>
              Acreditamos que alfabetização em IA não é sobre decorar comandos ou funções. É sobre 
              desenvolver autonomia para fazer as perguntas certas, pensamento crítico para avaliar 
              respostas, e criatividade para aplicar ferramentas de forma inovadora.
            </Text>
          </Stack>
        </Card>

        {/* Fundador */}
        <Card shadow="sm" padding="xl" radius="md" style={{ background: '#f8f9fa' }}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <img 
                src="/assets_global/images/backgrounds/Hero-MentaIberta.png"
                alt="Pedro"
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto',
                  display: 'block'
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 9 }}>
              <Stack gap="md">
                <div>
                  <Title order={2} mb="xs">Pedro</Title>
                  <Text size="lg" c="dimmed">Fundador & Diretor</Text>
                </div>
                <Text>
                  Pedro é diretor e fundador de uma escola de idiomas em Joinville, Santa Catarina, 
                  com mais de uma década de experiência transformando a forma como jovens brasileiros 
                  aprendem. Pai de dois filhos e em breve três, Pedro vive diariamente os desafios 
                  e oportunidades da educação moderna.
                </Text>
                <Text>
                  A criação do curso Menteaberta nasceu da observação direta: seus alunos já usavam 
                  IA informalmente, mas sem compreender seu potencial real ou seus riscos. Em vez de 
                  proibir ou ignorar essa realidade, Pedro decidiu ensinar - transformando ferramentas 
                  em pedagogia estruturada.
                </Text>
                <Card padding="md" radius="md" style={{ background: 'white', borderLeft: '4px solid #00D1D1' }}>
                  <Text fs="italic">
                    "Acredito que educação verdadeira não é sobre memorizar respostas, mas sobre 
                    desenvolver autonomia para fazer as perguntas certas. A IA não substitui o 
                    pensamento crítico; quando bem utilizada, ela o amplifica."
                  </Text>
                </Card>
                <Text>
                  Com formação em educação e profundo interesse em filosofia espírita e desenvolvimento 
                  recursivo, Pedro enxerga a alfabetização em IA como uma competência fundamental para 
                  a geração atual - não apenas para o mercado de trabalho, mas para a formação de 
                  cidadãos críticos e criativos em um mundo cada vez mais mediado por tecnologia.
                </Text>
                <Text>
                  O curso Menteaberta é, ele mesmo, um exemplo de sua filosofia: foi co-criado com 
                  Claude, ChatGPT e Gemini - provando que humanos e IAs podem colaborar de forma 
                  genuína quando guiados por princípios pedagógicos sólidos e transparência ética.
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Co-Criadores */}
        <div>
          <Title order={2} mb="lg" ta="center">Os Co-Criadores</Title>
          <Text size="lg" c="dimmed" ta="center" mb="xl" style={{ maxWidth: 700, margin: '0 auto 2rem' }}>
            Este curso foi desenvolvido em colaboração genuína com três sistemas de IA, 
            cada um contribuindo com suas especialidades únicas
          </Text>

          <Grid>
            {coCreators.map((creator) => {
              const Icon = creator.icon
              return (
                <Grid.Col key={creator.name} span={{ base: 12, md: 4 }}>
                  <Card shadow="sm" padding="xl" radius="md" withBorder h="100%">
                    <Stack gap="md">
                      <img 
                        src={`/assets_global/images/characters/${creator.name}.png`}
                        alt={creator.name}
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: 'contain',
                          margin: '0 auto'
                        }}
                      />
                      <div style={{ textAlign: 'center' }}>
                        <Title order={3} size="h3">{creator.name}</Title>
                        <Text size="sm" c="dimmed" mb="xs">{creator.company}</Text>
                        <Text size="sm" fw={600} c={creator.color}>
                          {creator.role}
                        </Text>
                      </div>
                      <Text size="sm">
                        {creator.contribution}
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>
              )
            })}
          </Grid>
        </div>

        {/* Nossa Filosofia */}
        <Card shadow="sm" padding="xl" radius="md" style={{ background: '#1B2B34', color: 'white' }}>
          <Stack gap="lg">
            <Title order={2}>Nossa Filosofia</Title>
            
            <div>
              <Title order={4} size="h5" mb="xs" c="turquoise">
                Task-Based Learning
              </Title>
              <Text>
                Cada lição ensina algo que você pode aplicar imediatamente. Não memorizamos 
                teoria abstrata - desenvolvemos competências práticas através de tarefas reais.
              </Text>
            </div>

            <div>
              <Title order={4} size="h5" mb="xs" c="turquoise">
                Real Students, Real Impact
              </Title>
              <Text>
                Testado com estudantes reais em contexto brasileiro. Cada exemplo, analogia 
                e exercício foi validado com adolescentes do ensino médio.
              </Text>
            </div>

            <div>
              <Title order={4} size="h5" mb="xs" c="turquoise">
                Pedagogical Honesty
              </Title>
              <Text>
                Transparência total sobre o uso de IA na criação do curso. Acreditamos que 
                honestidade sobre ferramentas e métodos é parte essencial da educação.
              </Text>
            </div>

            <div>
              <Title order={4} size="h5" mb="xs" c="turquoise">
                Student Autonomy Over Data
              </Title>
              <Text>
                Seus dados são seus. Não coletamos, não vendemos, não rastreamos. O aprendizado 
                acontece no seu material físico e nas ferramentas que você escolhe usar.
              </Text>
            </div>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}

export default Sobre