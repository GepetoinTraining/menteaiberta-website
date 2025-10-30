import { Container, Group, Text, Stack } from '@mantine/core'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div style={{ 
      background: '#1B2B34', 
      color: 'white',
      padding: '3rem 0 2rem'
    }}>
      <Container size="xl">
        <Stack gap="xl">
          <Group justify="space-between" align="flex-start" wrap="wrap">
            {/* Logo & Tagline */}
            <Stack gap="xs" style={{ maxWidth: 300 }}>
              <Group gap="xs">
                <img 
                  src="/images/menteaberta_logo.png" 
                  alt="Menteaberta Logo" 
                  style={{ height: 40 }}
                />
                <span style={{ fontWeight: 700, fontSize: 20 }}>
                  Menteaberta
                </span>
              </Group>
              <Text size="sm" c="dimmed">
                Alfabetização em IA para estudantes brasileiros do ensino médio
              </Text>
            </Stack>

            {/* Quick Links */}
            <Stack gap="xs">
              <Text fw={700} size="sm">Navegação</Text>
              <Link to="/" style={{ color: '#00D1D1', textDecoration: 'none', fontSize: 14 }}>
                Home
              </Link>
              <Link to="/conhecimento" style={{ color: '#00D1D1', textDecoration: 'none', fontSize: 14 }}>
                Conhecimento
              </Link>
              <Link to="/sobre" style={{ color: '#00D1D1', textDecoration: 'none', fontSize: 14 }}>
                Sobre
              </Link>
              <Link to="/contato" style={{ color: '#00D1D1', textDecoration: 'none', fontSize: 14 }}>
                Contato
              </Link>
            </Stack>

            {/* Contact Info */}
            <Stack gap="xs">
              <Text fw={700} size="sm">Contato</Text>
              <Text size="sm" c="dimmed">Joinville, Santa Catarina</Text>
              <Text size="sm" c="dimmed">Brasil</Text>
            </Stack>
          </Group>

          {/* Bottom Bar */}
          <div style={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '1.5rem'
          }}>
            <Group justify="space-between" wrap="wrap">
              <Text size="sm" c="dimmed">
                © 2025 Menteaberta. Co-criado com IA para educar sobre IA.
              </Text>
              <Group gap="md">
                <Text size="sm" c="dimmed">Claude</Text>
                <Text size="sm" c="dimmed">ChatGPT</Text>
                <Text size="sm" c="dimmed">Gemini</Text>
              </Group>
            </Group>
          </div>
        </Stack>
      </Container>
    </div>
  )
}

export default Footer