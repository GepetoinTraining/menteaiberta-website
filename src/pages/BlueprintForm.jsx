import { useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  Slider,
  Container,
  Paper,
  Title,
  Text,
  Stack,
  Image,
  Box,
  Center,
  Tooltip,
  ActionIcon,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { IconHelpCircle } from '@tabler/icons-react';
import Glossary from '../components/Glossary';

// Schema de validação para o formulário
const schema = z.object({
  diagnostico_atual: z.object({
    financeiro: z.object({
      faturamento_medio_mensal: z.number().min(0, { message: 'O valor deve ser positivo' }),
      cmv_percentual_medio: z.number().min(0, { message: 'O valor deve ser entre 0 e 100' }).max(100, { message: 'O valor deve ser entre 0 e 100' }),
      custos_fixos_mensais: z.number().min(0, { message: 'O valor deve ser positivo' }),
      margem_lucro_liquida_media: z.number(),
    }),
    operacional: z.object({
      area_cozinha_m2: z.number().min(1, { message: 'A área deve ser maior que 0' }),
      capacidade_producao_atual: z.number().min(1, { message: 'A capacidade deve ser maior que 0' }),
      equipe_atual_descricao: z.string().min(10, { message: 'Descreva sua equipe com mais detalhes' }),
    }),
  }),
  estrategia_expansao: z.object({
    investimento: z.object({
      capital_fase_1: z.number().min(0, { message: 'O valor deve ser positivo' }),
      fonte_capital: z.string().nonempty({ message: 'Selecione a fonte do capital' }),
    }),
    mercado_alvo: z.object({
      empresas_alvo_iniciais: z.string().min(5, { message: 'Liste pelo menos uma empresa-alvo' }),
      preco_refeicao_alvo_b2b: z.number().min(0.01, { message: 'O preço deve ser positivo' }),
      meta_refeicoes_dia_b2b: z.number().min(1, { message: 'Defina uma meta de refeições' }),
    }),
  }),
  capacidade_humana: z.object({
    lideranca: z.object({
      lider_projeto: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
      dedicacao_lider_percentual: z.number(),
    }),
    equipe: z.object({
      habilidades_chave_equipe: z.string().min(10, { message: 'Descreva as habilidades com mais detalhes' }),
    }),
  }),
  requisitos_sistema: z.object({
    tecnologia: z.object({
      stack_preferencial: z.string().min(3, { message: 'Defina as tecnologias' }),
    }),
    bi_dashboards: z.object({
      relatorios_kpis_essenciais: z.string().min(10, { message: 'Descreva os KPIs com mais detalhes' }),
    }),
    financeiro_ti: z.object({
      orcamento_mensal_sistema: z.number().min(0, { message: 'O valor deve ser positivo' }),
    }),
  }),
});

export default function BlueprintForm() {
  const [active, setActive] = useState(0);

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      nome_projeto: "Expansão Restaurante Espaço XV",
      data_preenchimento: new Date().toISOString(),
      diagnostico_atual: {
        financeiro: {
          faturamento_medio_mensal: 100000,
          cmv_percentual_medio: 35,
          custos_fixos_mensais: 45000,
          margem_lucro_liquida_media: 15,
        },
        operacional: {
          area_cozinha_m2: 80,
          capacidade_producao_atual: 500,
          equipe_atual_descricao: '2 cozinheiros, 3 auxiliares, 2 atendentes, 1 gerente.',
        },
      },
      estrategia_expansao: {
        investimento: {
          capital_fase_1: 50000,
          fonte_capital: 'Capital Próprio',
        },
        mercado_alvo: {
          empresas_alvo_iniciais: 'Empresa A, Empresa B, Indústria C',
          preco_refeicao_alvo_b2b: 25.50,
          meta_refeicoes_dia_b2b: 300,
        },
      },
      capacidade_humana: {
        lideranca: {
          lider_projeto: 'Nome do Líder',
          dedicacao_lider_percentual: 75,
        },
        equipe: {
          habilidades_chave_equipe: 'Agilidade no preparo, expertise em carnes, boa organização.',
        },
      },
      requisitos_sistema: {
        tecnologia: {
          stack_preferencial: 'Node.js, React, PostgreSQL',
        },
        bi_dashboards: {
          'relatorios_kpis_essenciais': '1. Custo Real vs Teórico por prato.\n2. Ranking de perdas por motivo e por insumo.\n3. Projeção de necessidade de compra de insumos.',
        },
        financeiro_ti: {
          orcamento_mensal_sistema: 500,
        },
      },
    },
  });
  
  const nextStep = () => {
    // Validar apenas os campos do passo atual antes de prosseguir
    let fieldsToValidate = [];
    if (active === 0) fieldsToValidate = ['diagnostico_atual'];
    if (active === 1) fieldsToValidate = ['estrategia_expansao'];
    if (active === 2) fieldsToValidate = ['capacidade_humana'];
    if (active === 3) fieldsToValidate = ['requisitos_sistema'];
    
    let hasErrors = false;
    for(const field of fieldsToValidate) {
        form.validateField(field);
        if (form.errors[field]) {
            hasErrors = true;
        }
    }
    
    const result = form.validate();
    const currentStepFields = {
      0: 'diagnostico_atual',
      1: 'estrategia_expansao',
      2: 'capacidade_humana',
      3: 'requisitos_sistema'
    }[active];

    const hasErrorsInStep = Object.keys(result.errors).some(key => key.startsWith(currentStepFields));
    
    if (!hasErrorsInStep) {
      setActive((current) => (current < 4 ? current + 1 : current));
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const downloadJson = () => {
    const result = form.validate();
    if (!result.hasErrors) {
        form.setFieldValue('data_preenchimento', new Date().toISOString());
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(form.values, null, 2)
        )}`;
        const link = document.createElement('a');
        link.href = jsonString;
        link.download = 'Blueprint.json';
        link.click();
    }
  };

  const currencyFormatter = (value) =>
    !Number.isNaN(parseFloat(value))
      ? `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      : 'R$ ';

  const LabelWithTooltip = ({ label, tooltipText }) => (
    <Group gap="xs" align="center">
      <Text>{label}</Text>
      <Tooltip label={tooltipText} withArrow>
        <ActionIcon variant="transparent" color="gray" size="sm" style={{ cursor: 'help' }}>
          <IconHelpCircle size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  return (
    <Container size="md" my="xl">
        <Glossary />
        <Paper withBorder shadow="md" p="xl" radius="md">
            <Stack>
                <Center>
                    <Image src="/images/menteaberta_logo_square.png" alt="Mente Aberta Logo" width={80} height={80} />
                </Center>
                <Box>
                    <Title order={2} align="center">Blueprint de Expansão</Title>
                    <Text color="dimmed" size="sm" align="center" mt="sm">
                        Projeto Restaurante Espaço XV. Preencha os campos para estruturar a estratégia de crescimento.
                    </Text>
                </Box>
            </Stack>

            <Stepper active={active} onStepClick={setActive} breakpoint="sm" my="xl">
            <Stepper.Step label="Passo 1" description="Diagnóstico Atual">
                <Stack spacing="lg" mt="lg">
                    <Title order={4} color="gray.7">Snapshot Financeiro</Title>
                    <NumberInput label="Faturamento Médio Mensal (Últimos 6 meses)" {...form.getInputProps('diagnostico_atual.financeiro.faturamento_medio_mensal')} parser={(value) => value.replace(/R\$\s?|(\.*)/g, '')} formatter={currencyFormatter} step={1000} min={0} />
                    <NumberInput label={<LabelWithTooltip label="CMV Médio (%)" tooltipText="Consulte o glossário flutuante para mais detalhes." />} {...form.getInputProps('diagnostico_atual.financeiro.cmv_percentual_medio')} rightSection="%" min={0} max={100} step={0.5} precision={2} />
                    <NumberInput label={<LabelWithTooltip label="Custos Fixos Mensais (Média)" tooltipText="Consulte o glossário flutuante para mais detalhes." />} {...form.getInputProps('diagnostico_atual.financeiro.custos_fixos_mensais')} parser={(value) => value.replace(/R\$\s?|(\.*)/g, '')} formatter={currencyFormatter} step={500} min={0} />
                    <NumberInput label={<LabelWithTooltip label="Margem de Lucro Líquida Média (%)" tooltipText="Consulte o glossário flutuante para mais detalhes." />} {...form.getInputProps('diagnostico_atual.financeiro.margem_lucro_liquida_media')} rightSection="%" step={0.5} precision={2} />

                    <Title order={4} color="gray.7" mt="xl">Baseline Operacional</Title>
                    <NumberInput label="Área da Cozinha Atual (m²)" {...form.getInputProps('diagnostico_atual.operacional.area_cozinha_m2')} min={1} />
                    <NumberInput label="Capacidade de Produção Atual (Refeições/Dia)" {...form.getInputProps('diagnostico_atual.operacional.capacidade_producao_atual')} min={1} step={50} />
                    <Textarea label="Equipe Atual (Descrição e Quantidade)" placeholder="Ex: 2 cozinheiros, 3 auxiliares..." minRows={3} {...form.getInputProps('diagnostico_atual.operacional.equipe_atual_descricao')} />
                </Stack>
            </Stepper.Step>
            <Stepper.Step label="Passo 2" description="Estratégia">
                <Stack spacing="lg" mt="lg">
                    <Title order={4} color="gray.7">Capacidade de Investimento</Title>
                    <NumberInput label="Capital Disponível para Investimento na Fase 1" {...form.getInputProps('estrategia_expansao.investimento.capital_fase_1')} parser={(value) => value.replace(/R\$\s?|(\.*)/g, '')} formatter={currencyFormatter} min={0} step={1000} />
                    <Select label="Fonte do Capital" data={['Capital Próprio', 'Empréstimo Bancário', 'Investidor']} {...form.getInputProps('estrategia_expansao.investimento.fonte_capital')} />
                    
                    <Title order={4} color="gray.7" mt="xl">Mercado Alvo (B2B)</Title>
                    <Textarea label="Empresas-Alvo (Primeiros Contratos)" placeholder="Liste de 3 a 5 nomes de empresas..." minRows={3} {...form.getInputProps('estrategia_expansao.mercado_alvo.empresas_alvo_iniciais')} />
                    <NumberInput label="Preço de Venda Alvo por Refeição (B2B)" {...form.getInputProps('estrategia_expansao.mercado_alvo.preco_refeicao_alvo_b2b')} parser={(value) => value.replace(/R\$\s?|(\.*)/g, '')} formatter={currencyFormatter} min={0.01} step={0.5} precision={2} />
                    <NumberInput label="Número de Refeições/Dia (Meta Inicial B2B)" {...form.getInputProps('estrategia_expansao.mercado_alvo.meta_refeicoes_dia_b2b')} min={1} step={50} />
                </Stack>
            </Stepper.Step>
            <Stepper.Step label="Passo 3" description="Equipe">
                <Stack spacing="lg" mt="lg">
                    <Title order={4} color="gray.7">Liderança do Projeto</Title>
                    <TextInput label="Líder do Projeto de Expansão" placeholder="Quem será o responsável direto?" {...form.getInputProps('capacidade_humana.lideranca.lider_projeto')} />
                    <Box>
                        <Text size="sm" weight={500}>Tempo de Dedicação do Líder ao Projeto (%)</Text>
                        <Slider mt="sm" marks={[{ value: 25, label: '25%' }, { value: 50, label: '50%' }, { value: 75, label: '75%' }]} {...form.getInputProps('capacidade_humana.lideranca.dedicacao_lider_percentual')} />
                    </Box>
                    
                    <Title order={4} color="gray.7" mt="xl">Capacidades da Equipe</Title>
                    <Textarea label="Habilidades Principais da Equipe Atual" placeholder="Quais são os pontos fortes do seu time hoje?" minRows={4} {...form.getInputProps('capacidade_humana.equipe.habilidades_chave_equipe')} />
                </Stack>
            </Stepper.Step>
            <Stepper.Step label="Passo 4" description="Sistema">
                <Stack spacing="lg" mt="lg">
                    <Title order={4} color="gray.7">Tecnologia e Desenvolvimento</Title>
                    <TextInput label="Stack de Desenvolvimento Preferencial" placeholder="Ex: Node.js + PostgreSQL, PHP + MySQL..." {...form.getInputProps('requisitos_sistema.tecnologia.stack_preferencial')} />
                    
                    <Title order={4} color="gray.7" mt="xl">Inteligência de Negócio (BI)</Title>
                    <Textarea label={<LabelWithTooltip label="Relatórios e KPIs Essenciais" tooltipText="Consulte o glossário flutuante para mais detalhes sobre KPIs." />} placeholder="Quais 3 perguntas o seu dashboard de BI precisa responder diariamente?" minRows={4} {...form.getInputProps('requisitos_sistema.bi_dashboards.relatorios_kpis_essenciais')} />

                    <Title order={4} color="gray.7" mt="xl">Orçamento</Title>
                    <NumberInput label="Orçamento para Desenvolvimento e Manutenção" description="Custo mensal estimado para servidor, domínios, etc." {...form.getInputProps('requisitos_sistema.financeiro_ti.orcamento_mensal_sistema')} parser={(value) => value.replace(/R\$\s?|(\.*)/g, '')} formatter={currencyFormatter} min={0} step={50} />
                </Stack>
            </Stepper.Step>
            <Stepper.Completed>
                <Center mt="xl">
                    <Stack align="center">
                        <Title order={3}>Blueprint Concluído!</Title>
                        <Text>Todos os dados foram preenchidos. Clique no botão abaixo para fazer o download do arquivo JSON com o seu plano de negócio.</Text>
                        <Button onClick={downloadJson} size="lg" mt="md" color="turquoise">
                            Fazer Download do Blueprint.json
                        </Button>
                    </Stack>
                </Center>
            </Stepper.Completed>
            </Stepper>

            <Group position="center" mt="xl">
            {active > 0 && active < 4 && (
                <Button variant="default" onClick={prevStep}>
                    Voltar
                </Button>
            )}
            {active < 3 && (
                <Button onClick={nextStep} color="turquoise">
                    Próximo Passo
                </Button>
            )}
             {active === 3 && (
                <Button onClick={nextStep} color="turquoise">
                    Finalizar e Baixar JSON
                </Button>
            )}
            </Group>
        </Paper>
    </Container>
  );
}