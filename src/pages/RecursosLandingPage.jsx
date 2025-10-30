import { Container, Title, Text, Stack, Card, SimpleGrid, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconBook, IconVideo, IconTemplate, IconPuzzle, IconMessages, IconListDetails } from '@tabler/icons-react';

export default function RecursosLandingPage() {

  const resourceTypes = [
    { title: 'Biblioteca de Prompts', link: '/recursos/biblioteca-prompts', icon: IconMessages, color: 'blue' },
    { title: 'Quizzes e Diagnósticos', link: '/recursos/quiz', icon: IconPuzzle, color: 'red' },
    { title: 'Vídeos Incorporados', link: '/recursos/video', icon: IconVideo, color: 'green' },
    { title: 'Templates (Modelos)', link: '/recursos/template', icon: IconTemplate, color: 'orange' },
    { title: 'Galerias de Exemplos', link: '/recursos/galeria', icon: IconBook, color: 'violet' }, // Using IconBook for gallery now
    { title: 'Recursos Diversos', link: '/recursos/outros', icon: IconListDetails, color: 'gray' }, // Link to a page listing :slug resources or handle differently
  ];


  return (
    <Container size="lg" py="3rem">
      <Stack gap="xl">
        <Title order={1} ta="center" mb="md">Central de Recursos</Title>
        <Text c="dimmed" ta="center" mb="lg" style={{ maxWidth: 600, margin: '0 auto' }}>
          Explore os materiais digitais interativos que complementam seu livro Mente Aberta.
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {resourceTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card key={type.title} shadow="sm" padding="lg" radius="md" withBorder>
                <Stack align="center" gap="md">
                   <Icon size={48} color={type.color ? `var(--mantine-color-${type.color}-6)` : 'var(--mantine-color-gray-7)'} stroke={1.5} />
                  <Title order={3} size="h4" ta="center">{type.title}</Title>
                  <Button
                    component={Link}
                    to={type.link}
                    variant="light"
                    color={type.color || 'gray'}
                    fullWidth
                  >
                    Acessar
                  </Button>
                </Stack>
              </Card>
            )
          })}
        </SimpleGrid>

         {/* Optional: Add a section linking to the glossary */}
         <Card shadow="sm" padding="lg" radius="md" mt="xl" style={{ backgroundColor: 'var(--mantine-color-blue-light)' }}>
           <Group justify="space-between">
              <Stack gap={0}>
                 <Title order={4}>Glossário do Curso</Title>
                 <Text size="sm" c="dimmed">Definições importantes dos termos usados nas lições.</Text>
              </Stack>
              <Button component={Link} to="/conhecimento" variant="white" color="blue">
                 Ver Glossário
              </Button>
           </Group>
         </Card>

      </Stack>
    </Container>
  );
}