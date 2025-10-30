import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Title, Text, Card, Stack, Tabs, Badge } from '@mantine/core'
import { IconSparkles, IconScale, IconBook } from '@tabler/icons-react'
import QuizInterativo from '../components/QuizInterativo'
import ComparadorRespostas from '../components/ComparadorRespostas'
import BibliotecaPrompts from '../components/BibliotecaPrompts'

function Semana1() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('quiz')

  // Detect hash on mount and when URL changes
  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash && ['quiz', 'comparador', 'prompts'].includes(hash)) {
      setActiveTab(hash)
    }
  }, [location])

  return (
    <Container size="xl" py="3rem">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Badge color="turquoise" size="lg" mb="md">Semana 1</Badge>
          <Title order={1} mb="md">Personalidades da IA</Title>
          <Text size="lg" c="dimmed" mb="lg">
            Descubra que diferentes IAs têm "personalidades" distintas e aprenda quando usar cada uma. 
            Explore os recursos interativos abaixo - eles complementam o conteúdo do seu livro físico.
          </Text>
        </div>

        {/* Task-Based Outcomes */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="sm">
            <Title order={3} size="h4">O que você conseguirá fazer após essa aula:</Title>
            <Text component="ul" style={{ paddingLeft: '1.5rem' }}>
              <li>Identificar pelo menos 3 diferenças claras no estilo e na qualidade das respostas entre três sistemas de IA diferentes</li>
              <li>Criar uma tabela comparativa para organizar suas observações de forma estruturada</li>
              <li>Formular uma preferência inicial sobre qual IA parece mais útil para o seu estilo pessoal</li>
            </Text>
          </Stack>
        </Card>

        {/* Interactive Resources */}
        <Tabs value={activeTab} onChange={setActiveTab} color="turquoise">
          <Tabs.List>
            <Tabs.Tab 
              value="quiz" 
              leftSection={<IconSparkles size={16} />}
            >
              Quiz Interativo
            </Tabs.Tab>
            <Tabs.Tab 
              value="comparador" 
              leftSection={<IconScale size={16} />}
            >
              Comparador de Respostas
            </Tabs.Tab>
            <Tabs.Tab 
              value="prompts" 
              leftSection={<IconBook size={16} />}
            >
              Biblioteca de Prompts
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="quiz" pt="xl">
            <QuizInterativo />
          </Tabs.Panel>

          <Tabs.Panel value="comparador" pt="xl">
            <ComparadorRespostas />
          </Tabs.Panel>

          <Tabs.Panel value="prompts" pt="xl">
            <BibliotecaPrompts />
          </Tabs.Panel>
        </Tabs>

        {/* Additional Info */}
        <Card padding="lg" radius="md" style={{ background: '#f8f9fa' }}>
          <Stack gap="sm">
            <Title order={4}>💡 Dica de Uso</Title>
            <Text size="sm">
              Estes recursos foram projetados para funcionar no seu celular! Escaneie os QR codes 
              do seu livro para acessar rapidamente, ou use os botões acima para explorar no computador.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}

export default Semana1