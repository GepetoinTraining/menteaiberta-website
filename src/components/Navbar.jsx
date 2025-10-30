import { Container, Group, Button, Burger, Drawer, Stack, ActionIcon, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation } from 'react-router-dom';
import QrScannerModal from './QrScannerModal';
import { IconQrcode, IconChevronDown } from '@tabler/icons-react';

function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scannerOpened, { open: openScanner, close: closeScanner }] = useDisclosure(false);
  const location = useLocation();

  // --- Links Atualizados ---
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Recursos', path: '/recursos' },
    { label: 'Glossário', path: '/conhecimento' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Contato', path: '/contato' },
    // O link 'Expansão' agora é um Dropdown
  ];
  // --- Fim Links Atualizados ---

  const isActive = (path) => location.pathname === path || 
                             (path === '/recursos' && location.pathname.startsWith('/recursos/')) || 
                             (path === '/conhecimento' && location.pathname.startsWith('/conhecimento/')) ||
                             (path === '/expansao' && location.pathname.startsWith('/expansao/'));


  // --- Itens do Menu Expansão ---
  const expansaoLinks = [
    { label: 'Expansão: Restaurante', path: '/expansao/restaurante' },
    { label: 'Expansão: Marcenaria', path: '/expansao/marcenaria' }
  ];
  // --- Fim Itens Menu ---

  return (
    <Container size="xl" h="100%">
      <Group h="100%" justify="space-between">
        {/* Logo */}
        <Group gap="xs" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            src="/images/menteaberta_logo.png"
            alt="Menteaberta Logo"
            style={{ height: 40 }}
            onError={(e) => e.currentTarget.src = 'https://placehold.co/100x40/1B2B34/FFFFFF?text=Logo'}
          />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#1B2B34' }}>
            Menteaberta
          </span>
        </Group>

        {/* Desktop Navigation */}
        <Group gap="md" visibleFrom="sm">
          {links.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              variant={isActive(link.path) ? 'filled' : 'subtle'}
              color={isActive(link.path) ? 'turquoise' : 'gray'}
              styles={(theme) => ({
                 root: {
                   color: isActive(link.path) ? undefined : theme.colors.dark[6]
                 }
              })}
            >
              {link.label}
            </Button>
          ))}
          
          {/* --- NOVO: Menu Dropdown Expansão --- */}
          <Menu shadow="md" width={220} trigger="hover">
            <Menu.Target>
              <Button
                variant={isActive('/expansao') ? 'filled' : 'subtle'}
                color={isActive('/expansao') ? 'orange' : 'gray'}
                rightSection={<IconChevronDown size={16} />}
                styles={(theme) => ({
                  root: {
                    color: isActive('/expansao') ? undefined : theme.colors.dark[6]
                  }
                })}
              >
                Expansão
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {expansaoLinks.map((link) => (
                <Menu.Item
                  key={link.path}
                  component={Link}
                  to={link.path}
                  color={location.pathname === link.path ? 'orange' : undefined}
                >
                  {link.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
          {/* --- FIM: Menu Dropdown Expansão --- */}

          <ActionIcon
            variant="outline"
            color="turquoise"
            size="lg"
            onClick={openScanner}
            title="Escanear QR Code"
          >
            <IconQrcode size={20} />
          </ActionIcon>
          <Button
            component={Link}
            to="/recursos"
            variant="filled"
            color="turquoise"
            size="md"
          >
            Explorar Recursos
          </Button>
        </Group>

        {/* Mobile Burger */}
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
      </Group>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Menu"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Stack gap="md">
          {links.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              onClick={close}
              variant={isActive(link.path) ? 'filled' : 'subtle'}
              color={isActive(link.path) ? 'turquoise' : 'gray'}
              styles={(theme) => ({
                 root: {
                   color: isActive(link.path) ? undefined : theme.colors.dark[6]
                 }
              })}
              fullWidth
              size="lg"
            >
              {link.label}
            </Button>
          ))}
          
          {/* --- NOVO: Links Expansão Mobile --- */}
          {expansaoLinks.map((link) => (
             <Button
              key={link.path}
              component={Link}
              to={link.path}
              onClick={close}
              variant={isActive(link.path) ? 'filled' : 'subtle'}
              color={isActive(link.path) ? 'orange' : 'gray'}
              styles={(theme) => ({
                 root: {
                   color: isActive(link.path) ? undefined : theme.colors.dark[6]
                 }
              })}
              fullWidth
              size="lg"
            >
              {link.label}
            </Button>
          ))}
          {/* --- FIM: Links Expansão Mobile --- */}

          <Button
            onClick={() => {
              close();
              openScanner();
            }}
            variant="outline"
            color="turquoise"
            size="lg"
            fullWidth
            leftSection={<IconQrcode size={20} />}
          >
            Escanear QR Code
          </Button>
          <Button
            component={Link}
            to="/recursos"
            onClick={close}
            variant="filled"
            color="turquoise"
            size="lg"
            fullWidth
          >
            Explorar Recursos
          </Button>
        </Stack>
      </Drawer>
      {/* Scanner Modal */}
    <QrScannerModal opened={scannerOpened} onClose={closeScanner} />
    </Container>
  );
}

export default Navbar;

