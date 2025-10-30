import { useState } from 'react'
import { Container, Title, Text, Card, Stack, TextInput, Textarea, Button, Group, Alert } from '@mantine/core'
import { IconMail, IconSchool, IconUser, IconSend, IconCheck } from '@tabler/icons-react'

function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission (replace with actual Formspree or email service)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setLoading(false)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', institution: '', message: '' })
    }, 3000)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Container size="md" py="3rem">
      <Stack gap="xl">
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <Title order={1} mb="md">Entre em Contato</Title>
          <Text size="lg" c="dimmed" style={{ maxWidth: 600, margin: '0 auto' }}>
            Tem dúvidas sobre o curso? Quer implementar o Menteaberta na sua escola? 
            Envie sua mensagem e retornaremos em breve.
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          {submitted ? (
            <Alert
              icon={<IconCheck size={24} />}
              title="Mensagem Enviada!"
              color="teal"
              variant="light"
            >
              <Text>
                Obrigado pelo contato! Responderemos sua mensagem o mais breve possível.
              </Text>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  label="Nome"
                  placeholder="Seu nome completo"
                  leftSection={<IconUser size={16} />}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  size="md"
                />

                <TextInput
                  label="E-mail"
                  placeholder="seu.email@exemplo.com"
                  leftSection={<IconMail size={16} />}
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  size="md"
                />

                <TextInput
                  label="Escola / Instituição"
                  placeholder="Nome da sua escola (opcional)"
                  leftSection={<IconSchool size={16} />}
                  value={formData.institution}
                  onChange={(e) => handleChange('institution', e.target.value)}
                  size="md"
                />

                <Textarea
                  label="Mensagem"
                  placeholder="Conte-nos como podemos ajudar..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  minRows={6}
                  autosize
                  size="md"
                />

                <Button
                  type="submit"
                  color="turquoise"
                  size="lg"
                  leftSection={<IconSend size={20} />}
                  loading={loading}
                  fullWidth
                >
                  Enviar Mensagem
                </Button>
              </Stack>
            </form>
          )}
        </Card>

        {/* Additional Contact Info */}
        <Card shadow="sm" padding="lg" radius="md" style={{ background: '#f8f9fa' }}>
          <Stack gap="sm">
            <Title order={4}>Informações de Contato</Title>
            <Group gap="xs">
              <IconMail size={16} color="#00D1D1" />
              <Text size="sm">contato@menteaberta.app</Text>
            </Group>
            <Group gap="xs">
              <IconSchool size={16} color="#00D1D1" />
              <Text size="sm">Joinville, Santa Catarina, Brasil</Text>
            </Group>
          </Stack>
        </Card>

        {/* Note */}
        <Card padding="md" radius="md" style={{ background: '#fff3cd', border: '1px solid #ffc107' }}>
          <Text size="sm" c="dark">
            <strong>Nota:</strong> Este é um formulário de demonstração. Para implementação em 
            produção, integre com Formspree (free tier) ou configure envio de e-mail via backend.
          </Text>
        </Card>
      </Stack>
    </Container>
  )
}

export default Contato