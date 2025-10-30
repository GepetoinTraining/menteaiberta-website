import { Container, Title, Text, Stack, Badge, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import ComparadorRespostas from '../../components/ComparadorRespostas'; // Adjust path if needed

export default function ComparadorPage() {
  return (
    <Container size="lg" py="3rem">
      <Stack gap="xl">
        <Button
          component={Link}
          to="/conhecimento" // Or maybe back to semana-1? Adjust as needed.
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          size="sm"
        >
          Voltar para Conhecimento
        </Button>
        <div>
          <Badge color="turquoise" size="lg" mb="md">
            Recurso Interativo (Semana 1)
          </Badge>
          <Title order={1} mb="md">Comparador de Respostas</Title>
          <Text c="dimmed" mb="lg">
            Use esta ferramenta para comparar as respostas de diferentes IAs lado a lado.
          </Text>
        </div>

        {/* Render the Comparador component */}
        <ComparadorRespostas />

      </Stack>
    </Container>
  );
}