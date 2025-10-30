import { Container, Title, Text, Button, Grid, Card, Stack, Group, Box } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconSparkles, IconBook, IconUsers, IconRocket } from '@tabler/icons-react'

function Home() {
  const characters = [
    {
      name: 'Alex',
      subtitle: 'O Autodidata',
      icon: IconBook,
      color: '#00D1D1',
      image: '/images/characters/Alex.png'
    },
    {
      name: 'Carmen',
      subtitle: 'A Conectora',
      icon: IconUsers,
      color: '#FFD447',
      image: '/images/characters/Carmen.png'
    },
    {
      name: 'ARIA',
      subtitle: 'Mentora Digital',
      icon: IconSparkles,
      color: '#00D1D1',
      image: '/images/characters/ARIA.png'
    },
    {
      name: 'VECTOR',
      subtitle: 'O Criador',
      icon: IconRocket,
      color: '#1B2B34',
      image: '/images/characters/Vector.png'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <Box style={{ background: '#1B2B34', color: 'white', padding: '6rem 0' }}>
        <Container size="xl">
          <Grid>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="xl">
                <Title order={1} size="3.5rem" style={{ lineHeight: 1.2 }}>
                  Domine o{' '}
                  <span style={{ color: '#00D1D1' }}>Aprendizado com IA</span>
                  {' '}e Transforme seu Futuro
                </Title>
                
                <Text size="xl" c="dimmed" style={{ maxWidth: 600 }}>
                  O primeiro curso brasileiro completo que ensina estudantes do ensino médio a usar 
                  Inteligência Artificial para acelerar o aprendizado, desenvolver autonomia e 
                  criar soluções inovadoras.
                </Text>

                <Group gap="md">
                  <Button
                    component={Link}
                    to="/conhecimento"
                    size="xl"
                    color="turquoise"
                    leftSection={<IconSparkles size={24} />}
                  >
                    Explorar Conhecimento
                  </Button>
                  <Button
                    component="a"
                    href="#como-funciona"
                    size="xl"
                    variant="outline"
                    color="turquoise"
                  >
                    Como Funciona
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <Box
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  minHeight: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                  src="/images/backgrounds/Hero-MentAIberta.png"
                  alt="Estudantes aprendendo com IA"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 16
                  }}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Characters Section */}
      <Container size="xl" py="5rem">
        <Stack gap="xl">
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <Title order={2} mb="md">Conheça Seus Guias</Title>
            <Text size="lg" c="dimmed">
              Aprenda com personagens que representam diferentes formas de aprender e criar com IA
            </Text>
          </div>

          <Grid>
            {characters.map((char) => {
              const Icon = char.icon
              return (
                <Grid.Col key={char.name} span={{ base: 12, sm: 6, md: 3 }}>
                  <Card
                    shadow="sm"
                    padding="xl"
                    radius="md"
                    style={{
                      border: '2px solid #f0f0f0',
                      height: '100%',
                      textAlign: 'center',
                      transition: 'transform 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <Stack gap="md" align="center">
                      <img 
                        src={char.image}
                        alt={char.name}
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: 'contain'
                        }}
                      />
                      <div>
                        <Title order={3} size="h3">{char.name}</Title>
                        <Text c="dimmed" size="sm">{char.subtitle}</Text>
                      </div>
                    </Stack>
                  </Card>
                </Grid.Col>
              )
            })}
          </Grid>
        </Stack>
      </Container>

      {/* Como Funciona Section */}
      <Box id="como-funciona" style={{ background: '#f8f9fa', padding: '5rem 0' }}>
        <Container size="xl">
          <Stack gap="xl">
            <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
              <Title order={2} mb="md">Como Funciona o Curso</Title>
              <Text size="lg" c="dimmed">
                Uma jornada estruturada de 24 semanas para dominar o uso de IA na educação
              </Text>
            </div>

            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <Card shadow="sm" padding="xl" radius="md" h="100%">
                  <Stack gap="md">
                    <div style={{
                      width: 50,
                      height: 50,
                      background: '#00D1D1',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'white'
                    }}>
                      24
                    </div>
                    <Title order={3}>Semanas de Conteúdo</Title>
                    <Text c="dimmed">
                      Conteúdo progressivo que acompanha seu desenvolvimento, da descoberta básica 
                      até projetos avançados de IA
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <Card shadow="sm" padding="xl" radius="md" h="100%">
                  <Stack gap="md">
                    <IconBook size={50} color="#00D1D1" stroke={1.5} />
                    <Title order={3}>Módulos Temáticos</Title>
                    <Text c="dimmed">
                      Explorador, Criador e Colaborador - três perspectivas para dominar 
                      diferentes aplicações de IA
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <Card shadow="sm" padding="xl" radius="md" h="100%">
                  <Stack gap="md">
                    <IconSparkles size={50} color="#FFD447" stroke={1.5} />
                    <Title order={3}>Material Físico + Digital</Title>
                    <Text c="dimmed">
                      Livro impresso com QR codes que conectam a recursos interativos, 
                      vídeos e ferramentas online
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <Card shadow="sm" padding="xl" radius="md" h="100%">
                  <Stack gap="md">
                    <IconRocket size={50} color="#1B2B34" stroke={1.5} />
                    <Title order={3}>Aprendizado Prático</Title>
                    <Text c="dimmed">
                      Baseado em tarefas reais - cada lição ensina algo que você pode 
                      aplicar imediatamente nos estudos
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container size="xl" py="5rem">
        <Card
          shadow="sm"
          padding="3rem"
          radius="md"
          style={{
            background: 'linear-gradient(135deg, #1B2B34 0%, #2a3d49 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Stack gap="xl" align="center">
            <Title order={2}>Pronto para Começar?</Title>
            <Text size="lg" style={{ maxWidth: 600 }}>
              Explore o conteúdo do curso, descubra recursos interativos e comece 
              sua jornada de alfabetização em IA hoje mesmo.
            </Text>
            <Button
              component={Link}
              to="/conhecimento"
              size="xl"
              color="turquoise"
              leftSection={<IconSparkles size={24} />}
            >
              Acessar Conhecimento
            </Button>
          </Stack>
        </Card>
      </Container>
    </>
  )
}

export default Home