import { useState } from 'react'
import { Card, Stack, Title, Text, Textarea, Grid, Button, Group, Badge, Alert } from '@mantine/core'
import { IconScale, IconDownload, IconRefresh } from '@tabler/icons-react'

function ComparadorRespostas() {
  const [pergunta, setPergunta] = useState('')
  const [chatgpt, setChatgpt] = useState('')
  const [gemini, setGemini] = useState('')
  const [claude, setClaude] = useState('')
  const [analysis, setAnalysis] = useState(null)

  const analyzeResponses = () => {
    if (!chatgpt && !gemini && !claude) return

    const responses = {
      ChatGPT: chatgpt,
      Gemini: gemini,
      Claude: claude
    }

    const results = {}

    Object.keys(responses).forEach(ai => {
      if (responses[ai]) {
        const text = responses[ai]
        const wordCount = text.split(/\s+/).filter(w => w.length > 0).length
        const charCount = text.length
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
        const hasBullets = /[•\-\*]|\d+\./.test(text)
        const hasExamples = /exemplo|por exemplo|como|imagine/i.test(text)
        
        // Heuristic tone detection
        let tone = 'Neutro'
        if (/você|seu|sua/i.test(text)) tone = 'Informal'
        if (/devemos|deve-se|é necessário/i.test(text)) tone = 'Formal'
        if (/legal|bacana|incrível/i.test(text)) tone = 'Casual'

        results[ai] = {
          wordCount,
          charCount,
          sentences,
          avgWordsPerSentence: Math.round(wordCount / sentences),
          hasBullets,
          hasExamples,
          tone
        }
      }
    })

    setAnalysis(results)
  }

  const reset = () => {
    setPergunta('')
    setChatgpt('')
    setGemini('')
    setClaude('')
    setAnalysis(null)
  }

  const exportComparison = () => {
    const content = `
COMPARAÇÃO DE RESPOSTAS DE IA
=============================

PERGUNTA:
${pergunta}

---

ChatGPT:
${chatgpt}

---

Gemini:
${gemini}

---

Claude:
${claude}

---

ANÁLISE GERADA:
${analysis ? JSON.stringify(analysis, null, 2) : 'Nenhuma análise disponível'}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'comparacao-ia.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Stack gap="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3} size="h4">Sua Pergunta</Title>
          <Textarea
            placeholder="Digite a pergunta que você fez para as três IAs..."
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            minRows={2}
            autosize
          />
        </Stack>
      </Card>

      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            <Stack gap="md">
              <Group gap="xs">
                <Title order={4} size="h5">ChatGPT</Title>
                <Badge color="green" variant="light" size="sm">OpenAI</Badge>
              </Group>
              <Textarea
                placeholder="Cole a resposta do ChatGPT aqui..."
                value={chatgpt}
                onChange={(e) => setChatgpt(e.target.value)}
                minRows={8}
                autosize
              />
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            <Stack gap="md">
              <Group gap="xs">
                <Title order={4} size="h5">Gemini</Title>
                <Badge color="blue" variant="light" size="sm">Google</Badge>
              </Group>
              <Textarea
                placeholder="Cole a resposta do Gemini aqui..."
                value={gemini}
                onChange={(e) => setGemini(e.target.value)}
                minRows={8}
                autosize
              />
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            <Stack gap="md">
              <Group gap="xs">
                <Title order={4} size="h5">Claude</Title>
                <Badge color="turquoise" variant="light" size="sm">Anthropic</Badge>
              </Group>
              <Textarea
                placeholder="Cole a resposta do Claude aqui..."
                value={claude}
                onChange={(e) => setClaude(e.target.value)}
                minRows={8}
                autosize
              />
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      <Group justify="center" gap="md">
        <Button
          leftSection={<IconScale size={20} />}
          onClick={analyzeResponses}
          color="turquoise"
          size="md"
          disabled={!chatgpt && !gemini && !claude}
        >
          Analisar Diferenças
        </Button>
        <Button
          leftSection={<IconRefresh size={20} />}
          onClick={reset}
          variant="outline"
          color="gray"
          size="md"
        >
          Limpar Tudo
        </Button>
      </Group>

      {analysis && (
        <Card shadow="sm" padding="lg" radius="md" style={{ background: '#f8f9fa' }}>
          <Stack gap="lg">
            <Group justify="space-between">
              <Title order={3} size="h4">Análise Comparativa</Title>
              <Button
                leftSection={<IconDownload size={16} />}
                onClick={exportComparison}
                variant="light"
                color="turquoise"
                size="sm"
              >
                Exportar
              </Button>
            </Group>

            <Grid>
              {Object.keys(analysis).map(ai => (
                <Grid.Col key={ai} span={{ base: 12, md: 4 }}>
                  <Card shadow="xs" padding="md" radius="md" withBorder>
                    <Stack gap="xs">
                      <Title order={5} size="h6" c="turquoise">{ai}</Title>
                      <Text size="sm">
                        <strong>Palavras:</strong> {analysis[ai].wordCount}
                      </Text>
                      <Text size="sm">
                        <strong>Caracteres:</strong> {analysis[ai].charCount}
                      </Text>
                      <Text size="sm">
                        <strong>Frases:</strong> {analysis[ai].sentences}
                      </Text>
                      <Text size="sm">
                        <strong>Palavras/Frase:</strong> {analysis[ai].avgWordsPerSentence}
                      </Text>
                      <Text size="sm">
                        <strong>Tom:</strong> {analysis[ai].tone}
                      </Text>
                      <Group gap="xs" mt="xs">
                        {analysis[ai].hasBullets && (
                          <Badge size="xs" color="blue" variant="light">Listas</Badge>
                        )}
                        {analysis[ai].hasExamples && (
                          <Badge size="xs" color="green" variant="light">Exemplos</Badge>
                        )}
                      </Group>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>

            <Alert color="turquoise" variant="light" icon={<IconScale size={20} />}>
              <Stack gap="xs">
                <Text fw={600} size="sm">Observações</Text>
                <Text size="sm">
                  • Respostas mais longas não são necessariamente melhores
                </Text>
                <Text size="sm">
                  • Diferentes tons funcionam para diferentes contextos
                </Text>
                <Text size="sm">
                  • Use listas quando precisar de informação organizada
                </Text>
                <Text size="sm">
                  • Exemplos ajudam a entender conceitos abstratos
                </Text>
              </Stack>
            </Alert>

            <Card padding="md" radius="md" style={{ background: 'white' }}>
              <Stack gap="xs">
                <Text fw={600} size="sm">💡 Qual resposta você preferiu?</Text>
                <Text size="sm" c="dimmed">
                  Pense no contexto: para estudar rápido, uma resposta concisa pode ser melhor. 
                  Para entender profundamente, uma explicação detalhada ajuda mais. Não existe 
                  "melhor IA" - existe a melhor IA para cada situação!
                </Text>
              </Stack>
            </Card>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}

export default ComparadorRespostas