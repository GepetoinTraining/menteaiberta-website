import { Affix, Card, Accordion, Title, Text, ThemeIcon, Group } from '@mantine/core';
import { IconBook2 } from '@tabler/icons-react';

const terms = [
  {
    value: 'cmv',
    label: 'CMV (Custo da Mercadoria Vendida)',
    description: 'Representa o custo direto dos insumos usados para produzir suas refeições. Um CMV de 35% significa que para cada R$100 vendidos, R$35 foram gastos em ingredientes.',
  },
  {
    value: 'custos-fixos',
    label: 'Custos Fixos',
    description: 'São as despesas que não mudam independentemente do volume de vendas, como aluguel, salários da equipe administrativa, software e contabilidade.',
  },
  {
    value: 'margem-lucro',
    label: 'Margem de Lucro Líquida',
    description: 'É o percentual do faturamento que sobra como lucro após pagar absolutamente todas as despesas (CMV, custos fixos, impostos, etc.). É o indicador final da saúde financeira do negócio.',
  },
  {
    value: 'kpi',
    label: 'KPI (Key Performance Indicator)',
    description: 'Indicador-Chave de Performance. É uma métrica crucial que você define para medir o sucesso de um objetivo. Ex: "Reduzir o desperdício em 10%" é um objetivo; o KPI é o "% de Desperdício".',
  },
];

function Glossary() {
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Card withBorder shadow="lg" p="md" radius="md" w={350}>
        <Group>
          <ThemeIcon color="turquoise" variant="light" size="lg">
            <IconBook2 size={24} />
          </ThemeIcon>
          <Title order={4}>Glossário Rápido</Title>
        </Group>
        <Text size="xs" c="dimmed" mt={4} mb="md">
          Passe o mouse sobre os ícones de ajuda (?) no formulário para mais dicas.
        </Text>
        <Accordion variant="separated">
          {terms.map((term) => (
            <Accordion.Item key={term.value} value={term.value}>
              <Accordion.Control>{term.label}</Accordion.Control>
              <Accordion.Panel>{term.description}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    </Affix>
  );
}

export default Glossary;