import React, { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Stack,
  List,
  ThemeIcon,
  ScrollArea,
  Group,
  Tabs,
  Paper,
  SimpleGrid,
  NumberInput,
  Slider,
  Alert,
  Box,
} from '@mantine/core';
import {
  IconUsers,
  IconGift,
  IconTruckDelivery,
  IconHeart,
  IconCash,
  IconKey,
  IconActivity,
  IconHeartHandshake,
  IconReceipt,
  IconLayoutGrid,
  IconCalculator,
  IconChartPie,
  IconArrowUpRight,
  IconArrowDownRight,
  IconScale,
} from '@tabler/icons-react';

// --- Data for the Business Model Canvas (Hormozi-style Focus) ---
// This object holds all the data we discussed, structured for the 9 blocks.
const bmcData = {
  // ... (BMC data remains unchanged from the provided file) ...
  keyPartners: {
    title: 'Key Partners',
    icon: IconHeartHandshake,
    color: 'lime',
    items: [
      {
        title: 'Local Schools & Universities',
        desc: 'To create a student pipeline for the B2C AI Academy.',
      },
      {
        title: 'Local Businesses / Industry',
        desc: 'To find professionals for the B2B Incubator program.',
      },
      {
        title: 'Online Teacher Communities',
        desc: 'To find independent teachers for the B2B Co-Teaching Hub.',
      },
    ],
  },
  keyActivities: {
    title: 'Key Activities',
    icon: IconActivity,
    color: 'yellow',
    items: [
      {
        title: 'Teaching & Facilitating',
        desc: 'Running the B2C MenteAiberta courses (3 sessions/week).',
      },
      {
        title: 'Course Co-Creation',
        desc: 'Executing the B2B Incubator service.',
      },
      {
        title: 'Inventory Management',
        desc: "Actively selling and scheduling the 390+ weekly 'room-hours'.",
      },
    ],
  },
  keyResources: {
    title: 'Key Resources',
    icon: IconKey,
    color: 'grape',
    items: [
      {
        title: 'Physical Asset',
        desc: 'The 5-classroom school (8am-9pm). Our main inventory.',
      },
      {
        title: 'Intellectual Property',
        desc: "The 'MenteAiberta' brand & AI-pedagogy framework.",
      },
      {
        title: 'Human Capital',
        desc: "Founder's proven expertise in teaching & AI-assisted course creation.",
      },
    ],
  },
  valuePropositions: {
    title: 'Value Propositions',
    icon: IconGift,
    color: 'green',
    items: [
      {
        title: "B2C: 'MenteAiberta' Course",
        desc: 'A 24-lesson, structured curriculum for AI mastery (R$ 252/month).',
      },
      {
        title: "B2B (Tier 1): 'Professionalism On-Demand'",
        desc: 'Rentable, fully-equipped classrooms with Time-of-Day pricing (R$ 45-75/hr).',
      },
      {
        title: "B2B (Tier 2): 'Teacher-in-a-Box'",
        desc: 'A complete incubation service (R$ 5,000) to build a 24-lesson course *for* them.',
      },
    ],
  },
  customerRelationships: {
    title: 'Customer Relationships',
    icon: IconHeart,
    color: 'red',
    items: [
      {
        title: 'Long-Term (B2C Academy)',
        desc: 'In-person, cohort-based learning.',
      },
      {
        title: 'Transactional (B2B Hub)',
        desc: 'Automated booking system.',
      },
      {
        title: 'High-Touch (B2B Incubator)',
        desc: 'Project-based, 1-on-1 co-creation.',
      },
    ],
  },
  channels: {
    title: 'Channels',
    icon: IconTruckDelivery,
    color: 'orange',
    items: [
      {
        title: 'B2C (AI Academy)',
        desc: 'Targeted Instagram/TikTok Ads driving to MenteAiberta website.',
      },
      {
        title: 'B2B (Educator Hub)',
        desc: "Localized Google Ads (e.g., 'sala para aula particular joinville').",
      },
      {
        title: "B2B (Teacher Incubator)",
        desc: "Direct Outreach via LinkedIn (e.g., 'Monetize your expertise').",
      },
    ],
  },
  customerSegments: {
    title: 'Customer Segments',
    icon: IconUsers,
    color: 'blue',
    items: [
      {
        title: 'B2C (AI Academy)',
        desc: 'Teens (14-18) seeking a high-value skill for their future.',
      },
      {
        title: 'B2B (Educator Hub)',
        desc: 'Independent Tutors (Languages, Math) working from home/cafes.',
      },
      {
        title: 'B2B (Teacher Incubator)',
        desc: 'Established Professionals (e.g., Sr. Programmer) wanting a new income stream.',
      },
    ],
  },
  costStructure: {
    title: 'Cost Structure',
    icon: IconReceipt,
    color: 'cyan',
    items: [
      {
        title: 'Fixed Costs (The Hurdle)',
        desc: 'R$ 11,000 / month (Rent, utilities, insurance, base salaries).',
      },
      {
        title: 'Variable Costs',
        desc: 'Marketing spend, additional instructor fees, late payment processing (8%).',
      },
    ],
  },
  revenueStreams: {
    title: 'Revenue Streams',
    icon: IconCash,
    color: 'teal',
    items: [
      {
        title: 'B2C AI Academy (Recurring)',
        desc: 'R$ 252/student @ 42 students (w/ 5% churn) = R$ 10,054/mo.',
      },
      {
        title: 'B2B Co-Teaching Space (Transactional)',
        desc: 'Hourly (R$ 45-75/hr) & Package sales (Flex/Dedicated Slots).',
      },
      {
        title: 'B2B Teacher Incubator (High-Margin)',
        desc: 'R$ 5,000/course @ 1 sale/2 months = R$ 2,500/mo.',
      },
    ],
  },
};

// --- Helper component to render each BMC card ---
function BmcCard({ title, icon: Icon, color, items = [] }) {
  return (
    <Card shadow="sm" radius="md" withBorder h="100%">
      <Stack h="100%" gap="md">
        <Group>
          <ThemeIcon color={color} variant="light" size="lg" radius="md">
            <Icon size="1.5rem" />
          </ThemeIcon>
          <Title order={4} size="h5">{title}</Title>
        </Group>

        <List spacing="sm" size="sm" style={{ flex: 1 }}>
          {items.map((item) => (
            <List.Item key={item.title}>
              <strong>{item.title}:</strong> {item.desc}
            </List.Item>
          ))}
        </List>
      </Stack>
    </Card>
  );
}

// --- NEW: Financial Simulator Component ---
function FinancialSimulator() {
  // --- Constants (based on our discussion) ---
  const fixedCost = 11000;
  const b2cTicket = 252;
  const b2cChurnRate = 0.05; // 5%
  const b2bIncPrice = 5000;
  const b2bHubAvgRate = 60; // Avg of 45, 60, 75
  
  // --- Static Unit Economics (for display) ---
  const cacB2C = 150; // Estimated R$
  const cacB2BInc = 500; // Estimated R$
  const ltvB2C = (b2cTicket / b2cChurnRate) - cacB2C; // (252 / 0.05) - 150 = 5040 - 150 = 4890
  const ltvB2BInc = b2bIncPrice - cacB2BInc; // 5000 - 500 = 4500

  // --- Interactive State ---
  const [b2cStudents, setB2cStudents] = useState(42);
  const [b2bIncSales, setB2bIncSales] = useState(1);
  const [b2bHubHours, setB2bHubHours] = useState(80);
  const [marketingSpend, setMarketingSpend] = useState(1500);
  const [commissionRate, setCommissionRate] = useState(10);

  // --- Real-time Calculations ---
  const b2cRevenue = b2cStudents * b2cTicket;
  const b2bIncRevenue = b2bIncSales * b2bIncPrice;
  const b2bHubRevenue = b2bHubHours * b2bHubAvgRate;
  const totalRevenue = b2cRevenue + b2bIncRevenue + b2bHubRevenue;

  const commissionCost = b2bIncRevenue * (commissionRate / 100);
  const totalVariableCost = commissionCost + marketingSpend;
  const totalCost = fixedCost + totalVariableCost;
  const netProfit = totalRevenue - totalCost;

  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <Stack gap="xl" pt="lg">
      <Title order={3} ta="center">Calculadora de Cenários</Title>
      
      {/* --- INPUTS --- */}
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Title order={4} mb="lg">Arraste os sliders para simular</Title>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack>
              <Text fw={500}>B2C: AI Academy</Text>
              <Box>
                <Text size="sm">Total de Alunos ({b2cStudents})</Text>
                <Slider value={b2cStudents} onChange={setB2cStudents} min={0} max={100} step={1} color="blue" />
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack>
              <Text fw={500}>B2B: Teacher Incubator</Text>
              <Box>
                <Text size="sm">Vendas / Mês ({b2bIncSales})</Text>
                <Slider value={b2bIncSales} onChange={setB2bIncSales} min={0} max={5} step={1} color="green" />
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack>
              <Text fw={500}>B2B: Educator Hub</Text>
              <Box>
                <Text size="sm">Horas Alugadas / Mês ({b2bHubHours})</Text>
                <Slider value={b2bHubHours} onChange={setB2bHubHours} min={0} max={300} step={10} color="orange" />
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <NumberInput
              label="Investimento em Marketing / Mês"
              value={marketingSpend}
              onChange={setMarketingSpend}
              prefix="R$ "
              step={100}
              min={0}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <NumberInput
              label="Comissão B2B Incubator (%)"
              value={commissionRate}
              onChange={setCommissionRate}
              suffix=" %"
              step={1}
              min={0}
              max={100}
            />
          </Grid.Col>
        </Grid>
      </Paper>
      
      {/* --- OUTPUTS (Balancing Sheet) --- */}
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Title order={4} mb="lg">Balanço Mensal (Estimativa)</Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          {/* Revenue */}
          <Stack gap="xs" p="md" bg="green.0" radius="md">
            <Group justify="space-between">
              <Text fw={500} c="green.9" size="lg">Receita Total</Text>
              <Text fw={700} c="green.9" size="lg">{formatCurrency(totalRevenue)}</Text>
            </Group>
            <List spacing="xs" size="sm" c="gray.7">
              <List.Item>B2C Academy: {formatCurrency(b2cRevenue)}</List.Item>
              <List.Item>B2B Incubator: {formatCurrency(b2bIncRevenue)}</List.Item>
              <List.Item>B2B Hub: {formatCurrency(b2bHubRevenue)}</List.Item>
            </List>
          </Stack>
          {/* Costs */}
          <Stack gap="xs" p="md" bg="red.0" radius="md">
            <Group justify="space-between">
              <Text fw={500} c="red.9" size="lg">Custo Total</Text>
              <Text fw={700} c="red.9" size="lg">{formatCurrency(totalCost)}</Text>
            </Group>
            <List spacing="xs" size="sm" c="gray.7">
              <List.Item>Custo Fixo: {formatCurrency(fixedCost)}</List.Item>
              <List.Item>Marketing: {formatCurrency(marketingSpend)}</List.Item>
              <List.Item>Comissões ({commissionRate}%): {formatCurrency(commissionCost)}</List.Item>
            </List>
          </Stack>
        </SimpleGrid>
        
        {/* Net Result */}
        <Alert
          mt="lg"
          color={netProfit >= 0 ? 'green' : 'red'}
          variant="filled"
          icon={netProfit >= 0 ? <IconArrowUpRight /> : <IconArrowDownRight />}
        >
          <Group justify="space-between">
            <Text fw={700} size="lg">Resultado Líquido (LUCRO)</Text>
            <Text fw={700} size="xl">{formatCurrency(netProfit)}</Text>
          </Group>
        </Alert>
      </Paper>

      {/* --- LTV/CAC --- */}
      <Paper shadow="xs" p="lg" radius="md" withBorder>
         <Title order={4} mb="lg">Unit Economics (LTV/CAC)</Title>
         <Text size="sm" c="dimmed" mb="md">
            Isso mede o "Valor Vitalício" (LTV) de um cliente vs. o "Custo de Aquisição" (CAC). Um LTV alto e CAC baixo é o ideal. (Valores estáticos para demonstração).
         </Text>
         <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Card withBorder radius="md" p="md">
              <Text fw={500}>B2C: AI Academy Student</Text>
              <Text size="sm" c="dimmed">Baseado em churn de {b2cChurnRate * 100}% e CAC de {formatCurrency(cacB2C)}</Text>
              <Text fz="xl" fw={700} c="green" mt="xs">{formatCurrency(ltvB2C)}</Text>
            </Card>
            <Card withBorder radius="md" p="md">
              <Text fw={500}>B2B: Incubator Client</Text>
              <Text size="sm" c="dimmed">Baseado em venda única e CAC de {formatCurrency(cacB2BInc)}</Text>
              <Text fz="xl" fw={700} c="green" mt="xs">{formatCurrency(ltvB2BInc)}</Text>
            </Card>
         </SimpleGrid>
      </Paper>
    </Stack>
  );
}

// --- Main Component (now with Tabs) ---
export default function BusinessModelCanvas() {
  return (
    <Container size="fluid" py="lg" ml="md" mr="md">
      <Stack gap="lg">
        <Title order={1} ta="center" c="navy.5">
          Business Model Canvas
        </Title>
        <Text size="lg" c="dimmed" ta="center" mb="xl">
          A 3-Pillar Strategy for the MenteAiberta Educator Hub
        </Text>

        <Tabs defaultValue="canvas" color="blue" variant="outline" radius="md">
          <Tabs.List grow>
            <Tabs.Tab value="canvas" leftSection={<IconLayoutGrid size={16} />}>
              Business Model Canvas
            </Tabs.Tab>
            <Tabs.Tab value="simulator" leftSection={<IconCalculator size={16} />}>
              Financial Simulator
            </Tabs.Tab>
            <Tabs.Tab value="balance_sheet" leftSection={<IconScale size={16} />}>
              Balancing Sheet (WIP)
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="canvas" pt="xl">
            {/* We use a scroll area to make sure the grid doesn't break layout */}
            
              {/* Increased minWidth to 1400px as requested */}
              <Grid gutter="md" style={{ minWidth: 1400 }}>
                {/* --- Top Row (5 columns) --- */}

                {/* Col 1: Key Partners */}
                <Grid.Col span={{ lg: 2.4 }}>
                  <BmcCard {...bmcData.keyPartners} />
                </Grid.Col>

                {/* Col 2: Key Activities & Resources */}
                <Grid.Col span={{ lg: 2.4 }}>
                  <Stack h="100%" gap="lg">
                    <BmcCard {...bmcData.keyActivities} />
                    <BmcCard {...bmcData.keyResources} />
                  </Stack>
                </Grid.Col>

                {/* Col 3: Value Propositions */}
                <Grid.Col span={{ lg: 2.4 }}>
                  <BmcCard {...bmcData.valuePropositions} />
                </Grid.Col>

                {/* Col 4: Customer Relationships & Channels */}
                <Grid.Col span={{ lg: 2.4 }}>
                  <Stack h="100%" gap="lg">
                    <BmcCard {...bmcData.customerRelationships} />
                    <BmcCard {...bmcData.channels} />
                  </Stack>
                </Grid.Col>

                {/* Col 5: Customer Segments */}
                <Grid.Col span={{ lg: 2.4 }}>
                  <BmcCard {...bmcData.customerSegments} />
                </Grid.Col>

                {/* --- Bottom Row (2 columns) --- */}
                <Grid.Col span={{ lg: 6 }}>
                  <BmcCard {...bmcData.costStructure} />
                </Grid.Col>
                <Grid.Col span={{ lg: 6 }}>
                  <BmcCard {...bmcData.revenueStreams} />
                </Grid.Col>
              </Grid>
            
          </Tabs.Panel>
          
          <Tabs.Panel value="simulator" pt="xl">
            <FinancialSimulator />
          </Tabs.Panel>
          
          <Tabs.Panel value="balance_sheet" pt="xl">
            <Alert title="Em Breve" color="gray" variant="light">
              Esta aba conterá um balanço patrimonial mais detalhado (Ativos, Passivos, Patrimônio Líquido). Por enquanto, use o "Financial Simulator" para o balanço mensal de lucros e perdas.
            </Alert>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

