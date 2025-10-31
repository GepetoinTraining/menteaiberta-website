import React, { useState, useMemo } from 'react';
import {
  Button,
  Group,
  TextInput,
  Textarea,
  Container,
  Paper,
  Title,
  Text,
  Stack,
  Box,
  Code,
  CopyButton,
  ActionIcon,
  Tooltip,
  ScrollArea,
  Alert,
  Grid,
  Select,
  Divider,
  Pill,
  NumberInput, // NOVO: Importado
  Badge,       // NOVO: Importado
  CloseButton, // NOVO: Importado
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconCopy,
  IconCheck,
  IconAlertCircle,
  IconArrowRight,
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconNumber4,
  IconNumber5,
  IconPlus,
  IconX,
  IconTrash, // NOVO
  IconHome,  // NOVO
  IconArmchair, // NOVO
} from '@tabler/icons-react';

// ... (Componente GeneratedPrompt não mudou) ...
function GeneratedPrompt({ promptText }) {
  if (!promptText) return null;
  
  return (
    <Paper withBorder p="md" mt="xl" radius="md" style={{ background: '#f8f9fa' }}>
      <Group justify="space-between" mb="xs">
        <Text fw={700} size="sm">Prompt Gerado (Pronto para Copiar)</Text>
        <CopyButton value={promptText}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copiado!' : 'Copiar'} withArrow>
              <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy} variant="subtle">
                {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
      <ScrollArea style={{ height: 250 }}>
        <Code block style={{ whiteSpace: 'pre-wrap' }}>
          {promptText}
        </Code>
      </ScrollArea>
    </Paper>
  );
}


// --- CONSTS ATUALIZADOS ---
// Seus consts, agora em um "Master DB" hardcoded
const masterDatabase = {
  mdf: [
    { value: 'guararapes_carvalho_capri', label: 'MDF Guararapes Carvalho Capri (Madeiras Geométricas)' },
    { value: 'guararapes_fresno_acores', label: 'MDF Guararapes Fresno Açores (Madeiras do Mundo)' },
    { value: 'guararapes_fresno_aveiro', label: 'MDF Guararapes Fresno Aveiro (Madeiras do Mundo)' },
    { value: 'guararapes_fresno_coimbra', label: 'MDF Guararapes Fresno Coimbra (Madeiras do Mundo)' },
    { value: 'guararapes_fresno_madeira', label: 'MDF Guararapes Fresno Madeira (Madeiras do Mundo)' },
    { value: 'guararapes_metal_champagne', label: 'MDF Guararapes Metal Champagne (Metalic)' },
    { value: 'guararapes_nogueira_ambar', label: 'MDF Guararapes Nogueira Âmbar (Madeiras do Mundo)' },
    { value: 'guararapes_nogueira_rubi', label: 'MDF Guararapes Nogueira Rubi (Madeiras do Mundo)' },
    { value: 'guararapes_salerno', label: 'MDF Guararapes Salerno (Madeiras do Mundo)' },
    { value: 'guararapes_alabama', label: 'MDF Guararapes Alabama (Madeiras do Mundo)' },
    { value: 'guararapes_alecrim', label: 'MDF Guararapes Alecrim (Colors)' },
    { value: 'guararapes_antiqua', label: 'MDF Guararapes Antiqua (Madeiras do Mundo)' },
    { value: 'guararapes_antuerpia', label: 'MDF Guararapes Antuérpia (Madeiras do Mundo)' },
    { value: 'guararapes_araucaria', label: 'MDF Guararapes Araucária (Madeiras do Brasil)' },
    { value: 'guararapes_areia', label: 'MDF Guararapes Areia (Colors)' },
    { value: 'guararapes_aura', label: 'MDF Guararapes Aura (Comfort)' },
    { value: 'guararapes_azul_ardosia', label: 'MDF Guararapes Azul Ardósia (Colors)' },
    { value: 'guararapes_azul_petroleo', label: 'MDF Guararapes Azul Petróleo (Colors)' },
    { value: 'guararapes_baviera', label: 'MDF Guararapes Baviera (Madeiras do Mundo)' },
    { value: 'guararapes_bilbao', label: 'MDF Guararapes Bilbao (Flex)' },
    { value: 'guararapes_branco_iceland', label: 'MDF Guararapes Branco Iceland (Flex)' },
    { value: 'guararapes_brisa', label: 'MDF Guararapes Brisa (Colors)' },
    { value: 'guararapes_bronze', label: 'MDF Guararapes Bronze (Magma)' },
    { value: 'guararapes_capuccino', label: 'MDF Guararapes Capuccino (Flex)' },
    { value: 'guararapes_caribe', label: 'MDF Guararapes Caribe (Madeiras do Mundo)' },
    { value: 'guararapes_carvalho_natural', label: 'MDF Guararapes Carvalho Natural (Madeiras do Mundo)' },
    { value: 'guararapes_cinza_perfeito', label: 'MDF Guararapes Cinza Perfeito (Colors)' },
    { value: 'guararapes_cinza_urban', label: 'MDF Guararapes Cinza Urban (Colors)' },
    { value: 'guararapes_cipres', label: 'MDF Guararapes Cipres (Flex)' },
    { value: 'guararapes_cobre', label: 'MDF Guararapes Cobre (Metalic)' },
    { value: 'guararapes_corten', label: 'MDF Guararapes Corten (Metalic)' },
    { value: 'guararapes_cosmos', label: 'MDF Guararapes Cosmos (Magma)' },
    { value: 'guararapes_cromio', label: 'MDF Guararapes Crômio (Magma)' },
    { value: 'guararapes_curupixa', label: 'MDF Guararapes Curupixá (Madeiras do Brasil)' },
    { value: 'guararapes_curupixa_ripado', label: 'MDF Guararapes Curupixá Ripado (Madeiras Geométricas)' },
    { value: 'guararapes_erva_mate', label: 'MDF Guararapes Erva Mate (Colors)' },
    { value: 'guararapes_fendi', label: 'MDF Guararapes Fendi (Flex)' },
    { value: 'guararapes_floresta', label: 'MDF Guararapes Floresta (Híbridos)' },
    { value: 'guararapes_fontana', label: 'MDF Guararapes Fontana (Magma)' },
    { value: 'guararapes_freijo', label: 'MDF Guararapes Freijó (Madeiras do Brasil)' },
    { value: 'guararapes_gali', label: 'MDF Guararapes Gali (Comfort)' },
    { value: 'guararapes_grafite', label: 'MDF Guararapes Grafite (Colors)' },
    { value: 'guararapes_imbuia', label: 'MDF Guararapes Imbuia (Madeiras do Brasil)' },
    { value: 'guararapes_jaspe', label: 'MDF Guararapes Jaspe (Comfort)' },
    { value: 'guararapes_lisboa', label: 'MDF Guararapes Lisboa (Flex)' },
    { value: 'guararapes_lume', label: 'MDF Guararapes Lume (Colors)' },
    { value: 'guararapes_mageo_carvalho', label: 'MDF Guararapes Mageo Carvalho (Madeiras Geométricas)' },
    { value: 'guararapes_mageo_imbuia', label: 'MDF Guararapes Mageo Imbuia (Madeiras Geométricas)' },
    { value: 'guararapes_mageo_mel', label: 'MDF Guararapes Mageo Mel (Madeiras Geométricas)' },
    { value: 'guararapes_mangue', label: 'MDF Guararapes Mangue (Colors)' },
    { value: 'guararapes_marmo', label: 'MDF Guararapes Marmo (Magma)' },
    { value: 'guararapes_marsala', label: 'MDF Guararapes Marsala (Colors)' },
    { value: 'guararapes_maxi_branco', label: 'MDF Guararapes Maxi Branco (Colors)' },
    { value: 'guararapes_nero', label: 'MDF Guararapes Nero (Madeiras do Mundo)' },
    { value: 'guararapes_niquel', label: 'MDF Guararapes Níquel (Metalic)' },
    { value: 'guararapes_nogal_champagne', label: 'MDF Guararapes Nogal Champagne (Madeiras do Mundo)' },
    { value: 'guararapes_nogal_sevilha', label: 'MDF Guararapes Nogal Sevilha (Flex)' },
    { value: 'guararapes_nuvem', label: 'MDF Guararapes Nuvem (Colors)' },
    { value: 'guararapes_onix', label: 'MDF Guararapes Ônix (Metalic)' },
    { value: 'guararapes_pau_ferro', label: 'MDF Guararapes Pau-Ferro (Madeiras do Brasil)' },
    { value: 'guararapes_peroba', label: 'MDF Guararapes Peroba (Madeiras do Brasil)' },
    { value: 'guararapes_petra', label: 'MDF Guararapes Petra (Magma)' },
    { value: 'guararapes_platina', label: 'MDF Guararapes Platina (Flex)' },
    { value: 'guararapes_preto_silk', label: 'MDF Guararapes Preto Silk (Flex)' },
    { value: 'guararapes_quartzo', label: 'MDF Guararapes Quartzo (Magma)' },
    { value: 'guararapes_rosa_milkshake', label: 'MDF Guararapes Rosa Milkshake (Colors)' },
    { value: 'guararapes_santorini', label: 'MDF Guararapes Santorini (Magma)' },
    { value: 'guararapes_sao_paulo', label: 'MDF Guararapes São Paulo (Geométricos)' },
    { value: 'guararapes_savana', label: 'MDF Guararapes Savana (Madeiras do Mundo)' },
    { value: 'guararapes_sonora', label: 'MDF Guararapes Sonora (Madeiras do Mundo)' },
    { value: 'guararapes_tauari', label: 'MDF Guararapes Tauari (Madeiras do Brasil)' },
    { value: 'guararapes_tauari_ripado', label: 'MDF Guararapes Tauari Ripado (Madeiras Geométricas)' },
    { value: 'guararapes_tear', label: 'MDF Guararapes Tear (Comfort)' },
    { value: 'guararapes_tecno', label: 'MDF Guararapes Tecno (Metalic)' },
    { value: 'guararapes_teka_bianco', label: 'MDF Guararapes Teka Bianco (Flex)' },
    { value: 'guararapes_tela', label: 'MDF Guararapes Tela (Comfort)' },
    { value: 'guararapes_terrino', label: 'MDF Guararapes Terrino (Flex)' },
    { value: 'guararapes_tijolo', label: 'MDF Guararapes Tijolo (Colors)' },

    // --- Berneck ---
    { value: 'berneck_super_white', label: 'MDF Berneck Super White (Micro)' },
    { value: 'berneck_gold', label: 'MDF Berneck Gold (Coleção Horizontes, Alumi)' },
    { value: 'berneck_plomo', label: 'MDF Berneck Plomo (Coleção Horizontes, Alumi)' },
    { value: 'berneck_dust', label: 'MDF Berneck Dust (Coleção Horizontes, Alumi)' },
    { value: 'berneck_tangara', label: 'MDF Berneck Tangara (Coleção Horizontes, Micro)' },
    { value: 'berneck_tabasco', label: 'MDF Berneck Tabasco (Coleção Horizontes, Micro)' },
    { value: 'berneck_taupe', label: 'MDF Berneck Taupe (Micro)' },
    { value: 'berneck_latte', label: 'MDF Berneck Latte (Coleção Horizontes, Micro)' },
    { value: 'berneck_falesia', label: 'MDF Berneck Falésia (Coleção Horizontes, Vel)' },
    { value: 'berneck_mostrato', label: 'MDF Berneck Mostrato (Micro)' },
    { value: 'berneck_veneer', label: 'MDF Berneck Veneer (Coleção Horizontes, Grann)' },
    { value: 'berneck_parquet', label: 'MDF Berneck Parquet (Coleção Horizontes, Grann)' },
    { value: 'berneck_millennial', label: 'MDF Berneck Millennial (Micro)' },
    { value: 'berneck_cromio', label: 'MDF Berneck Crômio (Linha Smart, Vel)' },
    { value: 'berneck_pecan', label: 'MDF Berneck Pecan (Linha Smart, Vel)' },
    { value: 'berneck_sky', label: 'MDF Berneck Sky (Vel)' },
    { value: 'berneck_desert', label: 'MDF Berneck Desert (Linha Smart, Vel)' },
    { value: 'berneck_gelo', label: 'MDF Berneck Gelo (Linha Smart, Vel)' },
    { value: 'berneck_azul_tx', label: 'MDF Berneck Azul (Tx)' },
    { value: 'berneck_verti', label: 'MDF Berneck Verti (Micro)' },
    { value: 'berneck_azul_vel', label: 'MDF Berneck Azul (Vel)' },
    { value: 'berneck_metallic_suede', label: 'MDF Berneck Metallic Suede (Tx)' },
    { value: 'berneck_ceramik', label: 'MDF Berneck Ceramik (Micro)' },
    { value: 'berneck_bege', label: 'MDF Berneck Bege (Tx)' },
    { value: 'berneck_opera', label: 'MDF Berneck Opera (Micro)' },
    { value: 'berneck_nude', label: 'MDF Berneck Nude (Vel)' },
    { value: 'berneck_baru', label: 'MDF Berneck Baru (Micro)' },
    { value: 'berneck_cinza_argila', label: 'MDF Berneck Cinza Argila (Tx)' },
    { value: 'berneck_cinza_cobalto_tx', label: 'MDF Berneck Cinza Cobalto (Tx)' },
    { value: 'berneck_preto_tx', label: 'MDF Berneck Preto (Tx)' },
    { value: 'berneck_cinza_cobalto_vel', label: 'MDF Berneck Cinza Cobalto (Vel)' },
    { value: 'berneck_nero', label: 'MDF Berneck Nero (Rust)' },
    { value: 'berneck_cinza_cristal', label: 'MDF Berneck Cinza Cristal (Tx)' },
    { value: 'berneck_terrazza', label: 'MDF Berneck Terrazza (Micro)' },
    { value: 'berneck_chumbo', label: 'MDF Berneck Chumbo (Micro)' },
    { value: 'berneck_lana', label: 'MDF Berneck Lana (Vel)' },
    { value: 'berneck_linen_grigio', label: 'MDF Berneck Linen Grigio (Vel)' },
    { value: 'berneck_basalto', label: 'MDF Berneck Basalto (Rust)' },
    { value: 'berneck_preto_design', label: 'MDF Berneck Preto (Design)' },
    { value: 'berneck_ruggine', label: 'MDF Berneck Ruggine (Tx)' },
    { value: 'berneck_volakas', label: 'MDF Berneck Volakas (Micro)' },
    { value: 'berneck_argento', label: 'MDF Berneck Argento (Rust)' },
    { value: 'berneck_nogal_malaga', label: 'MDF Berneck Nogal Málaga (Design)' },
    { value: 'berneck_cacau', label: 'MDF Berneck Cacau (Grann)' },
    { value: 'berneck_italian_noce', label: 'MDF Berneck Italian Noce (Poro)' },
    { value: 'berneck_louro_preto', label: 'MDF Berneck Louro Preto (Grann)' },
    { value: 'berneck_castaine', label: 'MDF Berneck Castaine (Tatto)' },
    { value: 'berneck_solanum', label: 'MDF Berneck Solanum (Grann)' },
    { value: 'berneck_roble_catedral', label: 'MDF Berneck Roble Catedral (Grann)' },
    { value: 'berneck_nogal_artezzano', label: 'MDF Berneck Nogal Artezzano (Grann)' },
    { value: 'berneck_cinammomo', label: 'MDF Berneck Cinammomo (Grann)' },
    { value: 'berneck_frassino_almendra', label: 'MDF Berneck Frassino Almendra (Poro)' },
    { value: 'berneck_peroba', label: 'MDF Berneck Peroba (Tatto)' },
    { value: 'berneck_nogal_sevilha', label: 'MDF Berneck Nogal Sevilha (Poro)' },
    { value: 'berneck_louro_freijo', label: 'MDF Berneck Louro Freijó (Grann)' },
    { value: 'berneck_barrique', label: 'MDF Berneck Barrique (Tatto)' },
    { value: 'berneck_gengibre', label: 'MDF Berneck Gengibre (Tatto)' },
    { value: 'berneck_faia', label: 'MDF Berneck Faia (Grann)' },
    { value: 'berneck_griseo', label: 'MDF Berneck Griseo (Grann)' },
    { value: 'berneck_carvalho_treviso', label: 'MDF Berneck Carvalho Treviso (Design)' },
    { value: 'berneck_amantea', label: 'MDF Berneck Amantea (Tatto)' },
    { value: 'berneck_carvalho_japandi', label: 'MDF Berneck Carvalho Japandi (Micro)' },
    { value: 'berneck_galiano', label: 'MDF Berneck Galiano (Grann)' },
    { value: 'berneck_provence', label: 'MDF Berneck Provence (Tatto)' },
    { value: 'berneck_chiaro', label: 'MDF Berneck Chiaro (Vel)' },
    { value: 'berneck_branco_design', label: 'MDF Berneck Branco (Design)' },
    { value: 'berneck_branco_vel', label: 'MDF Berneck Branco (Vel)' },
    { value: 'berneck_branco_micro', label: 'MDF Berneck Branco (Micro)' },
    { value: 'berneck_branco_tx', label: 'MDF Berneck Branco (Tx)' },

    // --- Arauco ---
    { value: 'arauco_blues_matt', label: 'MDF Arauco Blues (Textura Matt)' },
    { value: 'arauco_blues_dueto', label: 'MDF Arauco Blues (Textura Dueto)' },
    { value: 'arauco_bossa_nova', label: 'MDF Arauco Bossa Nova (Textura Poro)' },
    { value: 'arauco_frevo_matt', label: 'MDF Arauco Frevo (Textura Matt)' },
    { value: 'arauco_frevo_dueto', label: 'MDF Arauco Frevo (Textura Dueto)' },
    { value: 'arauco_jazz', label: 'MDF Arauco Jazz (Textura Matt)' },
    { value: 'arauco_samba', label: 'MDF Arauco Samba (Textura Trend)' },
    { value: 'arauco_sertanejo', label: 'MDF Arauco Sertanejo (Textura Trend)' },
    { value: 'arauco_tauari_classico', label: 'MDF Arauco Tauari Clássico (Textura Trend)' },
    { value: 'arauco_acacia_carmel', label: 'MDF Arauco Acácia Carmel (Textura Trend)' },
    { value: 'arauco_ameixa_negra', label: 'MDF Arauco Ameixa Negra (Textura Nature)' },
    { value: 'arauco_amendoeira', label: 'MDF Arauco Amendoeira (Textura Bold)' },
    { value: 'arauco_areal', label: 'MDF Arauco Areal (Textura Bold)' },
    { value: 'arauco_atlantica', label: 'MDF Arauco Atlântica (Textura Trend)' },
    { value: 'arauco_autentic', label: 'MDF Arauco Autentic (Textura Trend)' },
    { value: 'arauco_bambu', label: 'MDF Arauco Bambu (Textura Nature)' },
    { value: 'arauco_canelato_chess', label: 'MDF Arauco Canelato (Textura Chess)' },
    { value: 'arauco_carvalho', label: 'MDF Arauco Carvalho (Textura Poro)' },
    { value: 'arauco_carvalho_americano', label: 'MDF Arauco Carvalho Americano (Textura Trend)' },
    { value: 'arauco_carvalho_mel', label: 'MDF Arauco Carvalho Mel (Textura Bold)' },
    { value: 'arauco_castanheira_natural', label: 'MDF Arauco Castanheira Natural (Textura Matt)' },
    { value: 'arauco_castanho', label: 'MDF Arauco Castanho (Textura Poro)' },
    { value: 'arauco_cerrado', label: 'MDF Arauco Cerrado (Textura Bold)' },
    { value: 'arauco_ciliegio', label: 'MDF Arauco Ciliegio (Textura Poro)' },
    { value: 'arauco_elmo_suico', label: 'MDF Arauco Elmo Suíço (Textura Matt)' },
    { value: 'arauco_escarlate', label: 'MDF Arauco Escarlate (Textura Trend)' },
    { value: 'arauco_madeiral', label: 'MDF Arauco Madeiral (Textura Vert)' },
    { value: 'arauco_marau', label: 'MDF Arauco Maraú (Textura Bold)' },
    { value: 'arauco_noce_naturale', label: 'MDF Arauco Noce Naturale (Textura Nature)' },
    { value: 'arauco_nogal_terracota', label: 'MDF Arauco Nogal Terracota (Textura Nature)' },
    { value: 'arauco_nogueira_pecan', label: 'MDF Arauco Nogueira Pecan (Textura Trend)' },
    { value: 'arauco_nogueira_persa', label: 'MDF Arauco Nogueira Persa (Textura Trend)' },
    { value: 'arauco_nordic', label: 'MDF Arauco Nordic (Textura Trend)' },
    { value: 'arauco_petar', label: 'MDF Arauco Petar (Textura Bold)' },
    { value: 'arauco_ricori_nativo', label: 'MDF Arauco Rícori Nativo (Textura Trend)' },
    { value: 'arauco_tabaco', label: 'MDF Arauco Tabaco (Textura Poro)' },
    { value: 'arauco_teka_artico_nature', label: 'MDF Arauco Teka Ártico (Textura Nature)' },
    { value: 'arauco_tokai', label: 'MDF Arauco Tokai (Textura Nature)' },
    { value: 'arauco_cumaru', label: 'MDF Arauco Cumaru (Madeiras Brasileiras, Trend)' },
    { value: 'arauco_ipe_real', label: 'MDF Arauco Ipê Real (Madeiras Brasileiras, Trend)' },
    { value: 'arauco_jatoba_brasileiro', label: 'MDF Arauco Jatobá Brasileiro (Madeiras Brasileiras, Trend)' },
    { value: 'arauco_jequitiba_trend', label: 'MDF Arauco Jequitibá (Madeiras Brasileiras, Trend)' },
    { value: 'arauco_louro_freijo_trend', label: 'MDF Arauco Louro Freijó (Madeiras Brasileiras, Trend)' },
    { value: 'arauco_louro_freijo_poro', label: 'MDF Arauco Louro Freijó (Madeiras Brasileiras, Poro)' },
    { value: 'arauco_nova_imbuia', label: 'MDF Arauco Nova Imbuia (Madeiras Brasileiras, Poro)' },
    { value: 'arauco_pau_ferro', label: 'MDF Arauco Pau-Ferro (Madeiras Brasileiras, Trend)' },
    { value: 'arauco_sucupira_trend', label: 'MDF Arauco Sucupira (Madeiras Brasileiras, Trend)' },
    { value: 'arauco_azul_sereno', label: 'MDF Arauco Azul Sereno (Cores, Matt)' },
    { value: 'arauco_beige', label: 'MDF Arauco Beige (Cores, Matt)' },
    { value: 'arauco_beton', label: 'MDF Arauco Beton (Cores, Matt)' },
    { value: 'arauco_branco_supremo_chess', label: 'MDF Arauco Branco Supremo (Cores, Chess)' },
    { value: 'arauco_branco_supremo_tx', label: 'MDF Arauco Branco Supremo (Cores, TX)' },
    { value: 'arauco_cacao_chess', label: 'MDF Arauco Cacao (Cores, Chess)' },
    { value: 'arauco_cacao_matt', label: 'MDF Arauco Cacao (Cores, Matt)' },
    { value: 'arauco_cafelatte', label: 'MDF Arauco Cafelatte (Cores, Matt)' },
    { value: 'arauco_canela', label: 'MDF Arauco Canela (Cores, Chess)' },
    { value: 'arauco_cinza_cristal_tx', label: 'MDF Arauco Cinza Cristal (Cores, TX)' },
    { value: 'arauco_cinza_cristal_chess', label: 'MDF Arauco Cinza Cristal (Cores, Chess)' },
    { value: 'arauco_cinza_puro', label: 'MDF Arauco Cinza Puro (Cores, Matt)' },
    { value: 'arauco_connect', label: 'MDF Arauco Connect (Cores, Matt)' },
    { value: 'arauco_cristalina', label: 'MDF Arauco Cristalina (Cores, Matt)' },
    { value: 'arauco_damasco', label: 'MDF Arauco Damasco (Cores, Matt)' },
    { value: 'arauco_ebano_chess', label: 'MDF Arauco Ébano (Cores, Chess)' },
    { value: 'arauco_ebano_tx', label: 'MDF Arauco Ébano (Cores, TX)' },
    { value: 'arauco_frape', label: 'MDF Arauco Frapê (Cores, Matt)' },
    { value: 'arauco_grafito_chess', label: 'MDF Arauco Grafito (Cores, Chess)' },
    { value: 'arauco_gris_chess', label: 'MDF Arauco Gris (Cores, Chess)' },
    { value: 'arauco_jalapao', label: 'MDF Arauco Jalapão (Cores, Matt)' },
    { value: 'arauco_kashmir', label: 'MDF Arauco Kashmir (Cores, Chess)' },
    { value: 'arauco_lavanda', label: 'MDF Arauco Lavanda (Cores, Matt)' },
    { value: 'arauco_lord', label: 'MDF Arauco Lord (Cores, Matt)' },
    { value: 'arauco_maragogi', label: 'MDF Arauco Maragogi (Cores, Matt)' },
    { value: 'arauco_oceano', label: 'MDF Arauco Oceano (Cores, Matt)' },
    { value: 'arauco_sal_rosa', label: 'MDF Arauco Sal Rosa (Cores, Matt)' },
    { value: 'arauco_salvia', label: 'MDF Arauco Sálvia (Cores, Matt)' },
    { value: 'arauco_verde_jade', label: 'MDF Arauco Verde Jade (Cores, Matt)' },
    { value: 'arauco_orla', label: 'MDF Arauco Orla (Metais, Vert)' },
    { value: 'arauco_orvalho', label: 'MDF Arauco Orvalho (Metais, Vert)' },
    { value: 'arauco_silicio', label: 'MDF Arauco Silício (Metais, Vert)' },
    { value: 'arauco_bufalo', label: 'MDF Arauco Búfalo (Tecidos, Couro)' },
    { value: 'arauco_camelo', label: 'MDF Arauco Camelo (Tecidos, Couro)' },
    { value: 'arauco_linho', label: 'MDF Arauco Linho (Tecidos, Couro)' },
    { value: 'arauco_lino', label: 'MDF Arauco Lino (Tecidos, Chess)' },
    { value: 'arauco_lino_piombo', label: 'MDF Arauco Lino Piombo (Tecidos, Chess)' },
    { value: 'arauco_atenna', label: 'MDF Arauco Atenna (Pedras, Liso)' },
    { value: 'arauco_concreto_decor', label: 'MDF Arauco Concreto Decor (Pedras, Matt)' },
    { value: 'arauco_reali', label: 'MDF Arauco Reali (Pedras, Liso)' },
    { value: 'arauco_branco_bp', label: 'MDF Arauco Branco BP (Arauco Color)' },
    { value: 'arauco_branco_gelo', label: 'MDF Arauco Branco Gelo (Arauco Color)' },
    { value: 'arauco_branco_ice', label: 'MDF Arauco Branco Ice (Arauco Color)' },
    { value: 'arauco_branco_lousa', label: 'MDF Arauco Branco Lousa (Arauco Color)' },
    { value: 'arauco_branco_mais', label: 'MDF Arauco Branco Mais (Arauco Color)' },
    { value: 'arauco_canelato_color', label: 'MDF Arauco Canelato (Arauco Color)' },
    { value: 'arauco_carvalho_leggero', label: 'MDF Arauco Carvalho Leggero (Arauco Color)' },
    { value: 'arauco_cerezo_natural', label: 'MDF Arauco Cerezo Natural (Arauco Color)' },
    { value: 'arauco_cinza_new', label: 'MDF Arauco Cinza New (Arauco Color)' },
    { value: 'arauco_coigue_chocolate', label: 'MDF Arauco Coigue Chocolate (Arauco Color)' },
    { value: 'arauco_grafito_color', label: 'MDF Arauco Grafito (Arauco Color)' },
    { value: 'arauco_gris_color', label: 'MDF Arauco Gris (Arauco Color)' },
    { value: 'arauco_haya', label: 'MDF Arauco Haya (Arauco Color)' },
    { value: 'arauco_imbuia', label: 'MDF Arauco Imbuia (Arauco Color)' },
    { value: 'arauco_jequitiba_color', label: 'MDF Arauco Jequitibá (Arauco Color)' },
    { value: 'arauco_mezzo_bianco', label: 'MDF Arauco Mezzo Bianco (Arauco Color)' },
    { value: 'arauco_mogno', label: 'MDF Arauco Mogno (Arauco Color)' },
    { value: 'arauco_nogal', label: 'MDF Arauco Nogal (Arauco Color)' },
    { value: 'arauco_palha', label: 'MDF Arauco Palha (Arauco Color)' },
    { value: 'arauco_peral', label: 'MDF Arauco Peral (Arauco Color)' },
    { value: 'arauco_preto', label: 'MDF Arauco Preto (Arauco Color)' },
    { value: 'arauco_primer_branco_ice', label: 'MDF Arauco Primer Branco Ice (Arauco Color)' },
    { value: 'arauco_sapelli', label: 'MDF Arauco Sapelli (Arauco Color)' },
    { value: 'arauco_sucupira_color', label: 'MDF Arauco Sucupira (Arauco Color)' },
    { value: 'arauco_tabaco_stillo', label: 'MDF Arauco Tabaco Stillo (Arauco Color)' },
    { value: 'arauco_teka_artico_color', label: 'MDF Arauco Teka Ártico (Arauco Color)' },
    { value: 'arauco_vermont_dark', label: 'MDF Arauco Vermont Dark (Arauco Color)' },
    { value: 'arauco_vermont_oak', label: 'MDF Arauco Vermont Oak (Arauco Color)' },
    { value: 'duratex_noce_amendoa', label: 'MDF Duratex Noce Amêndoa (Essencial)' },
    { value: 'duratex_larnaca', label: 'MDF Duratex Larnaca (Prisma)' },
    { value: 'duratex_oasis', label: 'MDF Duratex Oásis (Essencial Wood)' },
    { value: 'duratex_noce_mare', label: 'MDF Duratex Noce Mare (Essencial)' },
    { value: 'duratex_riviera', label: 'MDF Duratex Riviera (Prisma)' },
    { value: 'duratex_amendola_rustica', label: 'MDF Duratex Amêndola Rústica (Prisma)' },
    { value: 'duratex_nogueira_cadiz', label: 'MDF Duratex Nogueira Cadiz (Prisma)' },
    { value: 'duratex_carvalho_batur', label: 'MDF Duratex Carvalho Batur (Essencial Wood)' },
    { value: 'duratex_itapua', label: 'MDF Duratex Itapuã (Essencial Wood)' },
    { value: 'duratex_jequitiba_rosa', label: 'MDF Duratex Jequitibá Rosa (Essencial Wood)' },
    { value: 'duratex_cumaru_raiz', label: 'MDF Duratex Cumaru Raiz (Essencial Wood)' },
    { value: 'duratex_freijo_puro', label: 'MDF Duratex Freijó Puro (Essencial Wood)' },
    { value: 'duratex_nogueira_asti', label: 'MDF Duratex Nogueira Asti (Essencial Wood)' },
    { value: 'duratex_pau_ferro_natural_wood', label: 'MDF Duratex Pau Ferro Natural (Essencial Wood)' },
    { value: 'duratex_betula', label: 'MDF Duratex Bétula (Thera)' },
    { value: 'duratex_rovere_braga', label: 'MDF Duratex Rovere Braga (Thera)' },
    { value: 'duratex_carvalho_berlim', label: 'MDF Duratex Carvalho Berlim (Design)' },
    { value: 'duratex_freijo_imperial', label: 'MDF Duratex Freijó Imperial (Thera)' },
    { value: 'duratex_nogueira_thar', label: 'MDF Duratex Nogueira Thar (Design)' },
    { value: 'duratex_carvalho_malva', label: 'MDF Duratex Carvalho Malva (Design)' },
    { value: 'duratex_teka_soho', label: 'MDF Duratex Teka Soho (Thera)' },
    { value: 'duratex_carvalho_avela', label: 'MDF Duratex Carvalho Avelã (Design)' },
    { value: 'duratex_carvalho_hanover', label: 'MDF Duratex Carvalho Hanover (Design)' },
    { value: 'duratex_brise', label: 'MDF Duratex Brise (Design)' },
    { value: 'duratex_nogueira_bourbon', label: 'MDF Duratex Nogueira Bourbon (Thera)' },
    { value: 'duratex_nogueira_florida', label: 'MDF Duratex Nogueira Flórida (Design)' },
    { value: 'duratex_nogueira_caiena', label: 'MDF Duratex Nogueira Caiena (Design)' },
    { value: 'duratex_carvalho_munique', label: 'MDF Duratex Carvalho Munique (Design)' },
    { value: 'duratex_perola_absoluto', label: 'MDF Duratex Pérola Absoluto (Design)' },
    { value: 'duratex_moss_absoluto', label: 'MDF Duratex Moss Absoluto (Design)' },
    { value: 'duratex_preto_absoluto', label: 'MDF Duratex Preto Absoluto (Design)' },
    { value: 'duratex_lana', label: 'MDF Duratex Lana (Conceito)' },
    { value: 'duratex_arenito', label: 'MDF Duratex Arenito (Conceito)' },
    { value: 'duratex_downtown', label: 'MDF Duratex Downtown (Sense)' },
    { value: 'duratex_zinco', label: 'MDF Duratex Zinco (Sense)' },
    { value: 'duratex_nazca', label: 'MDF Duratex Nazca (Velluto)' },
    { value: 'duratex_fusion', label: 'MDF Duratex Fusion (Sense)' },
    { value: 'duratex_prata', label: 'MDF Duratex Prata (Essencial)' },
    { value: 'duratex_branco_artico_original', label: 'MDF Duratex Branco Ártico (Original)' },
    { value: 'duratex_branco_diamante_essencial', label: 'MDF Duratex Branco Diamante (Essencial)' },
    { value: 'duratex_titanio_trama', label: 'MDF Duratex Titânio (Trama)' },
    { value: 'duratex_gianduia_trama', label: 'MDF Duratex Gianduia (Trama)' },
    { value: 'duratex_cinza_sagrado_essencial', label: 'MDF Duratex Cinza Sagrado (Essencial)' },
    { value: 'duratex_preto_original', label: 'MDF Duratex Preto (Original)' },
    { value: 'duratex_thassos', label: 'MDF Duratex Thassos (Essencial)' },
    { value: 'duratex_quartzo_bienna', label: 'MDF Duratex Quartzo Bienna (Velluto)' },
    { value: 'duratex_portoro', label: 'MDF Duratex Portoro (Essencial)' },
    { value: 'duratex_branco_diamante_acetinatta', label: 'MDF Duratex Branco Diamante (Acetinatta)' },
    { value: 'duratex_tartufo_acetinatta', label: 'MDF Duratex Tartufo (Acetinatta)' },
    { value: 'duratex_grafite_acetinatta', label: 'MDF Duratex Grafite (Acetinatta)' },
    { value: 'duratex_preto_acetinatta', label: 'MDF Duratex Preto (Acetinatta)' },
    { value: 'duratex_branco_diamante_cristallo', label: 'MDF Duratex Branco Diamante (Cristallo)' },
    { value: 'duratex_opala_cristallo', label: 'MDF Duratex Opala (Cristallo)' },
    { value: 'duratex_titanio_cristallo', label: 'MDF Duratex Titânio (Cristallo)' },
    { value: 'duratex_cinza_fossil_cristallo', label: 'MDF Duratex Cinza Fóssil (Cristallo)' },
    { value: 'duratex_gianduia_cristallo', label: 'MDF Duratex Gianduia (Cristallo)' },
    { value: 'duratex_cinza_sagrado_cristallo', label: 'MDF Duratex Cinza Sagrado (Cristallo)' },
    { value: 'duratex_preto_cristallo', label: 'MDF Duratex Preto (Cristallo)' },
    { value: 'duratex_pau_ferro_natural_cristallo', label: 'MDF Duratex Pau Ferro Natural (Cristallo)' },
    { value: 'duratex_cristal_original', label: 'MDF Duratex Cristal (Original)' },
    { value: 'duratex_ovo_original', label: 'MDF Duratex Ovo (Original)' },
    { value: 'duratex_aurora_trama', label: 'MDF Duratex Aurora (Trama)' },
    { value: 'duratex_off_white_suave_sense', label: 'MDF Duratex Off White Suave (Sense)' },
    { value: 'duratex_palha_trama', label: 'MDF Duratex Palha (Trama)' },
    { value: 'duratex_gianduia_puro_sense', label: 'MDF Duratex Gianduia Puro (Sense)' },
    { value: 'duratex_linho_belga_sense', label: 'MDF Duratex Linho Belga (Sense)' },
    { value: 'duratex_carvalho_lir_prisma', label: 'MDF Duratex Carvalho Lir (Prisma)' },
    { value: 'duratex_carvalho_dian_prisma', label: 'MDF Duratex Carvalho Dian (Prisma)' },
    { value: 'duratex_branco_artico_trama', label: 'MDF Duratex Branco Ártico (Trama)' },
    { value: 'duratex_branco_diamante_trama', label: 'MDF Duratex Branco Diamante (Trama)' },
    { value: 'duratex_cinza_fossil_velluto', label: 'MDF Duratex Cinza Fóssil (Velluto)' },
    { value: 'duratex_gianduia_natural_velluto', label: 'MDF Duratex Gianduia Natural (Velluto)' },
    { value: 'duratex_grafite_trama', label: 'MDF Duratex Grafite (Trama)' },
    { value: 'duratex_preto_trama', label: 'MDF Duratex Preto (Trama)' },
    { value: 'duratex_rosa_infinito_essencial', label: 'MDF Duratex Rosa Infinito (Essencial)' },
    { value: 'duratex_perola_urbana_essencial', label: 'MDF Duratex Pérola Urbana (Essencial)' },
    { value: 'duratex_pinole_essencial', label: 'MDF Duratex Pinole (Essencial)' },
    { value: 'duratex_blush_essencial', label: 'MDF Duratex Blush (Essencial)' },
    { value: 'duratex_azul_astral_velluto', label: 'MDF Duratex Azul Astral (Velluto)' },
    { value: 'duratex_azul_secreto_essencial', label: 'MDF Duratex Azul Secreto (Essencial)' },
    { value: 'duratex_azul_profundo_essencial', label: 'MDF Duratex Azul Profundo (Essencial)' },
    { value: 'duratex_mint_essencial', label: 'MDF Duratex Mint (Essencial)' },
    { value: 'duratex_moss_velluto', label: 'MDF Duratex Moss (Velluto)' },
    { value: 'duratex_verde_floresta_velluto', label: 'MDF Duratex Verde Floresta (Velluto)' },
    { value: 'duratex_ocre_solar_velluto', label: 'MDF Duratex Ocre Solar (Velluto)' },
    { value: 'duratex_calacata_gold', label: 'MDF Duratex Calacata Gold' },
    { value: 'duratex_delicate_acetinatta', label: 'MDF Duratex Delicate (Acetinatta)' },
    { value: 'duratex_nex_geo_acetinatta', label: 'MDF Duratex Nex Geo (Duratex You | Acetinatta)' },
  ],
  ferragens_dobradicas: [
    { value: 'fgvtn_dobradica_omnia_l', label: 'Dobradiça Omnia L (Reta/Curva/Alta)' },
    { value: 'fgvtn_dobradica_omnia_l_angulo', label: 'Dobradiça Omnia L (Ângulos 30/45/90)' },
    { value: 'fgvtn_dobradica_omnia_l_155', label: 'Dobradiça Omnia L 155°' },
    { value: 'fgvtn_dobradica_omnia_l_canto', label: 'Dobradiça Omnia L para Canto' },
    { value: 'fgvtn_dobradica_omnia_l_aluminio', label: 'Dobradiça Omnia L p/ Portas de Alumínio (Ni/Black)' },
    { value: 'fgvtn_dobradica_serie_m_slide_on', label: 'Dobradiça Série M Slide-On 110°' },
    { value: 'fgvtn_dobradica_ms_abertura_automatica', label: 'Dobradiça MS Abertura Automática (Push)' },
    { value: 'fgvtn_dobradica_ms_sem_mola', label: 'Dobradiça MS sem Mola' },
    { value: 'fgvtn_dobradica_click_3d_slow', label: 'Dobradiça FGVTN Click 3D Slow (Reta/Curva/Alta)' },
    { value: 'fgvtn_dobradica_click_3d_slow_angulo', label: 'Dobradiça FGVTN Click 3D Slow (Ângulos 30/45/90/165)' },
    { value: 'fgvtn_dobradica_click_slow', label: 'Dobradiça FGVTN Click Slow (Caneco 35/40)' },
    { value: 'fgvtn_dobradica_ms_slow_next', label: 'Dobradiça MS Slow Next FGVTN' },
    { value: 'fgvtn_dobradica_tn_click_slow', label: 'Dobradiça TN Click Slow (Nova / Easy / Preta / Inox)' },
    { value: 'fgvtn_dobradica_tn_slide_on', label: 'Dobradiça TN Slide-On (Calço Duplo / Inox)' },
    { value: 'fgvtn_dobradica_tn_angulos_especiais', label: 'Dobradiça TN Ângulos Especiais (165°, -45°, 270°)' },
    { value: 'fgvtn_dobradica_tn_mini', label: 'Dobradiça TN Mini (45° / HB)' },
    { value: 'fgvtn_acessorio_dobradica_limitador', label: 'Acessório: Limitador de Abertura' },
    { value: 'fgvtn_acessorio_dobradica_placa_reparo', label: 'Acessório: Placa de Reparo' },
  ],
  ferragens_corredicas: [
    { value: 'fgvtn_corredica_oculta_unihide_slow', label: 'Corrediça Oculta UniHide Slowmotion' },
    { value: 'fgvtn_corredica_oculta_unihide_onetouch', label: 'Corrediça Oculta UniHide One-Touch' },
    { value: 'fgvtn_corredica_oculta_unihide_slow_3d', label: 'Corrediça Oculta UniHide ET Slow 3D' },
    { value: 'fgvtn_corredica_oculta_fgvtn_slow_et', label: 'Corrediça Oculta FGVTN Slowmotion ET' },
    { value: 'fgvtn_corredica_oculta_fgvtn_onetouch_et', label: 'Corrediça Oculta FGVTN One-Touch ET' },
    { value: 'fgvtn_corredica_oculta_fgvtn_slow_ep', label: 'Corrediça Oculta FGVTN Slowmotion EP (Parcial)' },
    { value: 'fgvtn_corredica_oculta_fgvtn_onetouch_ep', label: 'Corrediça Oculta FGVTN One-Touch EP (Parcial)' },
    { value: 'fgvtn_corredica_oculta_com_pino', label: 'Corrediça Oculta com Pino (ET/EP)' },
    { value: 'fgvtn_corredica_oculta_slim_slow', label: 'Corrediça Oculta Slim Slow' },
    { value: 'fgvtn_corredica_oculta_tn_slow_et', label: 'Corrediça Oculta TN Slow ET' },
    { value: 'fgvtn_corredica_telescopica_tt45', label: 'Corrediça Telescópica TT 45 (Slow / One-Touch / Self-Closing / Standard)' },
    { value: 'fgvtn_corredica_telescopica_tt44', label: 'Corrediça Telescópica TT 44 (Slow / One-Touch)' },
    { value: 'fgvtn_corredica_telescopica_tt35', label: 'Corrediça Telescópica TT 35 (Slow / One-Touch)' },
    { value: 'fgvtn_corredica_telescopica_heavy_duty', label: 'Corrediça Telescópica Heavy Duty (TT58, TT50, TT90)' },
    { value: 'fgvtn_corredica_telescopica_h45', label: 'Corrediça Telescópica H45 (Standard / Inox / Inox Slow)' },
    { value: 'fgvtn_corredica_telescopica_tn_h_series', label: 'Corrediça Telescópica TN (H45, H35, H30, Mini)' },
    { value: 'fgvtn_corredica_simples_roldana_tts082', label: 'Corrediça Simples Roldana TTS 082' },
    { value: 'fgvtn_acessorio_corredica_gatilho_3d', label: 'Acessório: Gatilho 3D para Corrediça Oculta' },
  ],
  ferragens_sistemas_abertura: [
    { value: 'fgvtn_pistao_gas_slim', label: 'Pistão a Gás Slim (Normal / FI)' },
    { value: 'fgvtn_pistao_gas_amortecedor', label: 'Pistão a Gás com Amortecedor (Cinza/Branco)' },
    { value: 'fgvtn_pistao_gas_tn', label: 'Pistão a Gás TN (Normal / FI)' },
    { value: 'fgvtn_pistao_gas_tn_mini', label: 'Pistão a Gás TN Mini (Normal / FI)' },
    { value: 'fgvtn_articulador_flap_902', label: 'Articulador Flap FGVTN 902' },
    { value: 'fgvtn_braco_bvo', label: 'Braço de Abertura Variável BVO' },
    { value: 'fgvtn_articulador_slow_multi', label: 'Articulador Slow Multi' },
    { value: 'fgvtn_aero_flex', label: 'Sistema Bi-partido AeroFlex' },
    { value: 'fgvtn_aero_vert_plus', label: 'Sistema Paralelo AeroVert Plus' },
    { value: 'fgvtn_aero_max_slow', label: 'Sistema de Projeção AeroMax Slow' },
    { value: 'fgvtn_aero_max_touch', label: 'Sistema de Projeção AeroMax Touch' },
    { value: 'fgvtn_aero_smart', label: 'Sistema Basculante AeroSmart' },
    { value: 'fgvtn_aero_vita_slow', label: 'Sistema Basculante AeroVita Slow' },
    { value: 'fgvtn_aero_plus', label: 'Articulador Aero Plus' },
    { value: 'fgvtn_pulsador_magnetico', label: 'Pulsador Magnético (Sobrepor/Embutir/Mini/Industrial)' },
    { value: 'fgvtn_fecho_toque_articulado', label: 'Fecho Toque Articulado TN' },
    { value: 'fgvtn_amortecedor_tn', label: 'Amortecedor TN (Suporte Cruz / Linear)' },
  ],
  ferragens_sistemas_deslizantes: [
    { value: 'fgvtn_sistema_coplanar_fgvtn', label: 'Sistema Deslizante Coplanar (FGVTN / E / M)' },
    { value: 'fgvtn_sistema_sds_800_slow', label: 'Sistema Deslizante SDS 800 Slow (1/2/3 portas)' },
    { value: 'fgvtn_sistema_sds_500_slow', label: 'Sistema Deslizante SDS 500 Slow (2/3 portas)' },
    { value: 'fgvtn_rodizio_sd_apoiado_rolamento', label: 'Rodízio Apoiado Rolamento (SD 802, 640, 605, 524, 401, 307, 302, etc)' },
    { value: 'fgvtn_rodizio_sd_apoiado_roldana', label: 'Rodízio Apoiado Roldana (SD 309, 308, 303, 301, 102, 101)' },
    { value: 'fgvtn_desempenador_porta', label: 'Desempenador de Porta (Sobreposto / Embutido)' },
    { value: 'fgvtn_sistema_softdoor', label: 'Amortecedor para Sistema Deslizante (SoftDoor)' },
    { value: 'fgvtn_sistema_sotello', label: 'Sistema para Porta Escamoteável (Sotello)' },
  ],
  ferragens_gavetas_metalicas: [
    { value: 'fgvtn_gaveta_avantbox_slow', label: 'Gaveta AvantBox Slowmotion H86' },
    { value: 'fgvtn_gaveta_avantbox_onetouch', label: 'Gaveta AvantBox One-Touch H86' },
    { value: 'fgvtn_gaveta_avantbox_slim_baixa', label: 'Gaveta AvantBox Slim Baixa H89' },
    { value: 'fgvtn_gaveta_avantbox_slim_media', label: 'Gaveta AvantBox Slim Média H121' },
    { value: 'fgvtn_gaveta_avantbox_slim_alta', label: 'Gaveta AvantBox Slim Alta H185' },
    { value: 'fgvtn_kit_avantbox_tempero', label: 'Kit AvantBox Porta Tempero' },
    { value: 'fgvtn_kit_avantbox_elevacao_metal', label: 'Kit AvantBox Elevação Metálica' },
    { value: 'fgvtn_kit_avantbox_elevacao_acrilico', label: 'Kit AvantBox Elevação Acrílico' },
    { value: 'fgvtn_divisor_avantbox', label: 'Divisores Internos AvantBox (Horizontal/Vertical)' },
    { value: 'fgvtn_divisor_slim', label: 'Divisores Internos AvantBox Slim' },
  ],
  ferragens_acessorios: [
    { value: 'fgvtn_acessorio_linha_sense', label: 'Linha Sense (Calceiro, Cesto, Sapateira, Porta-Jóias)' },
    { value: 'fgvtn_cabideiro_basculante', label: 'Cabideiro Basculante (Sense / Dual Slow / TN)' },
    { value: 'fgvtn_calceiro_deslizante', label: 'Calceiro Deslizante (CD 135 / CD / Spin)' },
    { value: 'fgvtn_prateleira_basculante_easy_shelf', label: 'Prateleira Basculante Easy Shelf' },
    { value: 'fgvtn_canto_articulado', label: 'Canto Articulado Slow' },
    { value: 'fgvtn_lixeira_automatica', label: 'Lixeira Automática Inox 12L' },
    { value: 'fgvtn_escorredor_loucas', label: 'Kit Escorredor de Louças Inox' },
    { value: 'fgvtn_porta_panos', label: 'Porta-Panos Deslizante' },
    { value: 'fgvtn_mesa_embutir', label: 'Ferragem Deslizante para Mesa de Embutir' },
    { value: 'fgvtn_porta_pratos', label: 'Porta-Pratos Organizador' },
    { value: 'fgvtn_porta_facas', label: 'Porta-Facas Inox' },
    { value: 'fgvtn_porta_talher', label: 'Porta-Talheres (Plástico / Inox)' },
    { value: 'fgvtn_tapete_emborrachado', label: 'Tapete Emborrachado para Gaveta' },
    { value: 'fgvtn_rodizio_gel', label: 'Rodízio Gel (Rolamento / Base Fixa)' },
    { value: 'fgvtn_pe_mesa', label: 'Pé de Mesa' },
    { value: 'fgvtn_suporte_dobravel', label: 'Suporte Dobrável para Tampo' },
    { value: 'fgvtn_prato_giratorio', label: 'Prato Giratório PG 1012' },
    { value: 'fgvtn_tabua_passar', label: 'Tábua de Passar (TP 450 / 480 / 800)' },
    { value: 'fgvtn_qps', label: 'Quadro para Pasta Suspensa (QPS)' },
    { value: 'fgvtn_ferragem_teclado', label: 'Ferragem Deslizante para Teclado' },
  ],
  ferragens_fechaduras: [
    { value: 'fgvtn_fechadura_gaveta', label: 'Fechadura para Gaveta (22mm / 32mm) (Ni/Preta)' },
    { value: 'fgvtn_fechadura_sobrepor', label: 'Fechadura de Sobrepor para Gaveta' },
    { value: 'fgvtn_fechadura_gaveteiro_frontal', label: 'Fechadura Gaveteiro Frontal (1 Aba / 2 Abas / com Barra)' },
    { value: 'fgvtn_fechadura_gaveteiro_lateral', label: 'Fechadura Gaveteiro Lateral com Barra' },
    { value: 'fgvtn_fechadura_cremona', label: 'Fechadura Cremona com Lingueta e Acessórios' },
    { value: 'fgvtn_fechadura_porta_vidro', label: 'Fechadura para Porta de Vidro (Simples / Dupla)' },
    { value: 'fgvtn_fechadura_porta_correr', label: 'Fechadura para Porta de Correr' },
    { value: 'fgvtn_fechadura_vitrine', label: 'Fechadura Vitrine 140mm' },
    { value: 'fgvtn_fechadura_armario_vertical', label: 'Fechadura para Armário Vertical (22mm / 32mm)' },
    { value: 'fgvtn_acessorio_fechadura', label: 'Acessórios de Fechadura (Batentes, Calços, Pinos)' },
  ],
  ferragens_fixacao: [
    { value: 'fgvtn_dispositivo_minifix_vb', label: 'Dispositivo Montagem (Minifix/VB - FA, FB, FAA45, FBA45)' },
    { value: 'fgvtn_parafuso_minifix', label: 'Parafuso Aço (Minifix / Haste Dupla)' },
    { value: 'fgvtn_parafuso_vb', label: 'Parafuso Zamak (FA/FB)' },
    { value: 'fgvtn_parafuso_uniao', label: 'Parafuso União (Plástico / Niquelado)' },
    { value: 'fgvtn_parafuso_euro', label: 'Parafuso Euro Aço Niquelado' },
    { value: 'fgvtn_bucha_americana', label: 'Bucha Americana Zamak M6' },
    { value: 'fgvtn_bucha_plastica', label: 'Bucha Plástica (M6 / 1/4" / 10x10)' },
    { value: 'fgvtn_porca_cilindrica', label: 'Porca Cilíndrica Zamak' },
    { value: 'fgvtn_porca_garra', label: 'Porca Garra M6' },
    { value: 'fgvtn_suporte_prateleira', label: 'Suporte de Prateleira (Pino, Duplo, 90°, Vidro, Fixo)' },
    { value: 'fgvtn_trava_prateleira', label: 'Trava Prateleira Plástico (16mm / 18mm)' },
    { value: 'fgvtn_tapa_furo', label: 'Tapa-furo Plástico (ø5, ø8, ø10, ø12)' },
    { value: 'fgvtn_tampa_plastica', label: 'Tampa Plástica (ø14, ø18)' },
    { value: 'fgvtn_dobradica_invisivel', label: 'Dobradiça Invisível (Branca/Marrom/Preta)' },
    { value: 'fgvtn_suspensor_armario', label: 'Suspensor de Armário HB65' },
    { value: 'fgvtn_pe_nivelador', label: 'Pé Nivelador' },
    { value: 'fgvtn_sapata_niveladora', label: 'Sapata Niveladora (D27.5 / D38 Inox / ø32 / ø21)' },
  ],
  portas_de_vidro: [
    { value: 'porta_vidro_reflecta_bronze_m2', label: 'Porta Vidro Reflecta Bronze (m²)' },
    { value: 'porta_vidro_laca_preto_m2', label: 'Porta Vidro Laca Preto (m²)' },
  ]
};

// Opções para o primeiro dropdown
const categoryOptions = [
  { value: 'mdf', label: 'MDF / Chapas' },
  { value: 'ferragens_dobradicas', label: 'Ferragens: Dobradiças' },
  { value: 'ferragens_corredicas', label: 'Ferragens: Corrediças' },
  { value: 'ferragens_sistemas_abertura', label: 'Ferragens: Sistemas de Abertura (Pistões/Articuladores)' },
  { value: 'ferragens_sistemas_deslizantes', label: 'Ferragens: Sistemas Deslizantes (Portas de Correr)' },
  { value: 'ferragens_gavetas_metalicas', label: 'Ferragens: Gavetas Metálicas' },
  { value: 'ferragens_acessorios', label: 'Ferragens: Acessórios (Cozinha/Closet)' },
  { value: 'ferragens_fechaduras', label: 'Ferragens: Fechaduras e Travas' },
  { value: 'ferragens_fixacao', label: 'Ferragens: Fixação (VB, Minifix, Suportes)' },
  { value: 'portas_de_vidro', label: 'Portas de Vidro / Espelhos' },
];

// Nossos consts originais ainda são usados nos prompts seguintes
const consts = {
  padroes_de_construcao: `# PADRÕES DE CONSTRUÇÃO (CONST)
Material Padrão: MDF 18mm
Método: Parafusos e cola
Estrutura: Laterais sempre inteiriças (do chão ao topo)
Folga Gaveta: 3mm na largura
Fundo: 6mm, sempre embutido 20mm da borda traseira`,
  
  // CUSTOS GENÉRICOS (PARA REFERÊNCIA DA IA, NÃO USADOS DIRETAMENTE NA LISTA)
  custos_materiais: {
    "mdf_branco_tx_18mm": 229.00,
    "mdf_carvalho_18mm": 800.00,
    "mdf_fundo_6mm": 80.00
  },
  
  biblioteca_ferragens: {
    "dobradica_slow_35mm": 15.00,
    "corredica_400mm": 25.00,
    "puxador_colonial": 30.00,
    "porta_vidro_reflecta_bronze_m2": 450.00,
    "porta_vidro_laca_preto_m2": 380.00
  },

  custos_mao_de_obra: `# CUSTOS DE MÃO DE OBRA (CONST)
Hora Marcenaria (Corte/Fita): R$ 50/h
Hora Montagem: R$ 45/h
Hora Instalação: R$ 60/h
Markup padrão: 40% sobre o custo total`,
  
  regras_plano_de_corte: `# CONSTRANGIMENTOS DE CORTE (CONST)
Tamanho Chapa: 2750mm x 1830mm
Espessura Serra (Kerf): 4mm
Direção do "Fio" (Veio): O "fio" do TX corre ao longo dos 2750mm.
Método: Agrupar cortes em "ripas" (tiras).`
};
// --- FIM DAS ATUALIZAÇÕES DOS CONSTS ---

export default function MarcenariaPromptGenerator() {
  const [active, setActive] = useState(0);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  // --- NOVOS ESTADOS LOCAIS PARA O PASSO 1 (Material) ---
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentItem, setCurrentItem] = useState(null); // Alterado de currentItems (plural)
  const [currentPrice, setCurrentPrice] = useState(0);    // NOVO
  const [currentUsage, setCurrentUsage] = useState("");

  // Usamos um formulário para todos os passos
  const form = useForm({
    initialValues: {
      // --- PASSO 1 ATUALIZADO (GRANULAR) ---
      cliente_nome: 'Rute Pereira da Silva',
      projeto_nome: 'Quarto dos Meninos',
      rooms: [
        {
          id: Date.now(),
          name: 'Quarto Principal',
          furniture: [
            { id: Date.now() + 1, name: 'Cômoda', dimensions_mockup: 'Rodapé: 60mm + 4x Gavetas 200mm + 150mm (espaços) + Chapa topo 25mm' },
            { id: Date.now() + 2, name: 'Armário Aéreo', dimensions_mockup: '1800mm L x 600mm A x 400mm P, 3 portas' }
          ]
        }
      ],
      material_list: [],
      // --- FIM DA ATUALIZAÇÃO ---
      
      // Passo 2
      medidas_finais: '2480mm L x 2590mm A x 550mm P',
      mockup_designer: 'Um armário de 4 portas. 3 vãos internos iguais (2 divisórias). Vão da esquerda com maleiro e 2 cabideiros. Vão duplo da direita com 1 maleiro e 1 cabideiro longo.',
      
      // "Memória" de JSON
      json_lista_de_pecas: '{\n  "parts": [\n    {"name": "Lateral_Esquerda", "width": 550, "height": 2490, "quantity": 1, "material": "18mm"},\n    {"name": "Lateral_Direita", "width": 550, "height": 2490, "quantity": 1, "material": "18mm"}\n  ]\n}',
    },
  });

  // Opções para o segundo dropdown (dependente)
  const itemOptions = useMemo(() => {
    if (!currentCategory) return [];
    return masterDatabase[currentCategory] || [];
  }, [currentCategory]);

  // --- FUNÇÕES ATUALIZADAS PARA ADICIONAR/REMOVER ITENS (Material) ---
  const handleAddItem = () => {
    if (!currentCategory || !currentItem || !currentUsage || currentPrice <= 0) {
      // (Opcional: adicionar notificação de erro)
      return; 
    }
    
    const selectedOption = itemOptions.find(opt => opt.value === currentItem);

    form.setFieldValue('material_list', [
      ...form.values.material_list,
      { 
        id: Date.now(), // ID simples para a key do React
        categoria: categoryOptions.find(c => c.value === currentCategory)?.label, // Label amigável
        item_label: selectedOption ? selectedOption.label : currentItem, // Label amigável
        item_value: currentItem, // O ID do DB (ex: 'arauco_blues_matt')
        price: currentPrice,
        uso: currentUsage 
      }
    ]);

    // Resetar campos de "WIP"
    setCurrentCategory(null);
    setCurrentItem(null);
    setCurrentPrice(0);
    setCurrentUsage("");
  };

  const handleRemoveItem = (id) => {
    form.setFieldValue('material_list', form.values.material_list.filter(item => item.id !== id));
  };
  // --- FIM DAS FUNÇÕES (Material) ---

  // --- NOVAS FUNÇÕES PARA CÔMODOS E MÓVEIS ---
  const handleAddNewRoom = () => {
    form.insertListItem('rooms', {
      id: Date.now(),
      name: 'Novo Cômodo',
      furniture: []
    });
  };

  const handleRemoveRoom = (roomIndex) => {
    form.removeListItem('rooms', roomIndex);
  };

  const handleAddNewFurniture = (roomIndex) => {
    form.insertListItem(`rooms.${roomIndex}.furniture`, {
      id: Date.now(),
      name: 'Novo Móvel',
      dimensions_mockup: 'Descreva as dimensões e o mock-up aqui...'
    });
  };

  const handleRemoveFurniture = (roomIndex, furnitureIndex) => {
    form.removeListItem(`rooms.${roomIndex}.furniture`, furnitureIndex);
  };
  // --- FIM DAS NOVAS FUNÇÕES ---


  // Função para gerar o prompt baseado no passo atual
  const generatePrompt = () => {
    const values = form.values;
    let prompt = "";

    switch (active) {
      case 0: // Pré-Orçamento
        // --- PROMPT DO PASSO 1 ATUALIZADO (GRANULAR) ---
        
        // 1. Formatar os Cômodos e Móveis
        const projectStructureText = values.rooms.map(room => {
          const furnitureText = room.furniture.map(item => 
            `    * MÓVEL: ${item.name}\n      - Mock-up/Dimensões: ${item.dimensions_mockup}`
          ).join('\n');
          
          return `  - CÔMODO: ${room.name}\n${furnitureText}`;
        }).join('\n\n');

        // 2. Formatar a Lista de Materiais com Preço
        const materialListText = values.material_list.map(entry =>
          `- Categoria: ${entry.categoria}\n  Item: ${entry.item_label} (ID: ${entry.item_value})\n  Preço Unitário (Chapa/Peça): R$ ${entry.price.toFixed(2)}\n  Uso: ${entry.uso}`
        ).join('\n\n');

        prompt = `## TAREFA: GERAR UM PRÉ-ORÇAMENTO

## 1. CONTEXTO DO PROJETO (VARS):
* **Cliente:** ${values.cliente_nome}
* **Projeto:** ${values.projeto_nome}

* **Estrutura do Projeto (Cômodos e Móveis):**
${projectStructureText.length > 0 ? projectStructureText : "Nenhum cômodo definido."}

* **Materiais e Preços de Custo (Definidos por mim):**
${materialListText.length > 0 ? materialListText : "Nenhum material especificado."}

## 2. DADOS DO MEU BANCO RELACIONAL (CONSTS - PARA SUA REFERÊNCIA):
# CUSTOS DE MATERIAIS (Referência Genérica)
${JSON.stringify(consts.custos_materiais, null, 2)}

# BIBLIOTECA DE FERRAGENS (Referência Genérica)
${JSON.stringify(consts.biblioteca_ferragens, null, 2)}

${consts.custos_mao_de_obra}

## 3. INSTRUÇÕES:
1. **Ignorar** os preços genéricos dos "CONSTS" se um item equivalente estiver listado em "Materiais e Preços de Custo (Definidos por mim)". **Use os preços que eu defini como prioridade.**
2. Analise a "Estrutura do Projeto" e os "Materiais" para estimar a quantidade de chapas e ferragens necessárias.
3. Use os "Materiais e Preços de Custo" que eu forneci para precificar cada item. Se uma ferragem (ex: dobradiça) não estiver na minha lista, use o preço da "BIBLIOTECA DE FERRAGENS (CONST)".
4. Calcule uma *estimativa* de horas de trabalho (marcenaria, montagem, instalação) com base nos móveis listados.
5. Some todos os custos (Materiais + Mão de Obra) e aplique o markup padrão de 40%.
6. Apresente o "Preço Final Estimado" para o cliente.
`;
        // --- FIM DA ATUALIZAÇÃO DO PROMPT ---
        break;

      case 1: // Lista de Peças (BOM)
        prompt = `## TAREFA: GERAR LISTA DE PEÇAS (JSON) A PARTIR DO MOCK-UP

## 1. REGRAS OBRIGATÓRIAS (CONSTS):
${consts.padroes_de_construcao}

## 2. MOCK-UP DO DESIGNER (VARS):
* **Medidas Finais:** ${values.medidas_finais}
* **Descrição do Projeto:** ${values.mockup_designer}

## 3. INSTRUÇÕES DE SAÍDA:
1. Calcule as dimensões exatas de CADA peça individual necessária (laterais, divisórias, prateleiras, etc.) seguindo os \`padroes_de_construcao\`.
2. Gere a saída **APENAS** em formato JSON como no exemplo:
   \`{"parts": [{"name": "Lateral_Esquerda", "width": 550, "height": 2490, "quantity": 1, "material": "18mm"}, ...]}\`
`;
        break;

      case 2: // Lista de Compras
        prompt = `## TAREFA: GERAR LISTA DE COMPRAS DETALHADA

## 1. LISTA DE PEÇAS (VARS - JSON Gerado no Passo 2):
${values.json_lista_de_pecas}

## 2. DADOS DO MEU BANCO RELACIONAL (CONSTS):
# BIBLIOTECA DE FERRAGENS (CONST)
${JSON.stringify(consts.biblioteca_ferragens, null, 2)}
${consts.padroes_de_construcao}

## 3. INSTRUÇÕES DE SAÍDA:
1. **Chapas:** Execute uma lógica de "otimização de corte" (nesting) no JSON de peças para determinar o número *exato* de chapas de 18mm e 6mm necessárias.
2. **Ferragens:** Conte quantas dobradiças, pares de corrediças, etc., são necessários com base na lista de peças e nos padrões.
3. **Suprimentos:** Inclua itens padrão (Fita de borda, parafusos 4x45, etc.).
4. Formate a saída como uma lista de compras clara.
`;
        break;

      case 3: // Plano de Corte
        prompt = `## TAREFA: GERAR PLANO DE CORTE OTIMIZADO

## 1. LISTA DE PEÇAS (VARS - JSON Gerado no Passo 2):
${values.json_lista_de_pecas}

## 2. CONSTRANGIMENTOS (CONSTS):
${consts.regras_plano_de_corte}

## 3. INSTRUÇÕES DE SAÍDA:
* Organize o plano chapa por chapa.
* Para cada chapa, liste as "ripas" a serem cortadas primeiro (ex: "CHAPA 1 (18mm): Ripar 3x tiras de 550mm").
* Depois, liste as peças a serem cortadas de cada ripa (ex: "Tira A (2750 x 550): 1x Lateral (2490x550)").
`;
        break;

      case 4: // Instruções "Lego"
        prompt = `## TAREFA: GERAR GUIA DE MONTAGEM (ESTILO LEGO)

## 1. DADOS DO PROJETO (VARS E CONSTS):
* **Lista de Peças (JSON):**
${values.json_lista_de_pecas}
* **Padrões de Construção:**
${consts.padroes_de_construcao}

## 3. INSTRUÇÕES DE SAÍDA:
1. Comece com a montagem da base/rodapé.
2. Continue com a montagem da "caixa" (laterais, base, topo), usando os nomes das peças do JSON.
3. Descreva como instalar as divisórias e prateleiras fixas (ex: "Fixe a 'Divisoria_1' a 800mm da 'Lateral_Esquerda'").
4. Descreva a instalação dos fundos (seguindo o padrão de "embutido 20mm").
5. Termine com a instalação das portas, gavetas e puxadores.
6. Use linguagem simples e direta (ex: "Pegue (A) 'Lateral_Esquerda' e (B) 'Base'").
`;
        break;

      default:
        break;
    }
    setGeneratedPrompt(prompt.trim());
  };

  const nextStep = () => {
    setActive((current) => (current < 5 ? current + 1 : current));
    setGeneratedPrompt(""); // Limpa o prompt anterior
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    setGeneratedPrompt(""); // Limpa o prompt anterior
  };
  
  // O conteúdo de cada passo do Stepper
  const stepsContent = [
    // --- PASSO 1 ATUALIZADO (GRANULAR) ---
    <Stack>
      <Title order={3}>Passo 1: Pré-Orçamento</Title>
      
      {/* 1. DADOS DO CLIENTE E PROJETO */}
      <Paper withBorder p="md" radius="md">
        <Stack>
          <TextInput label="Nome do Cliente" {...form.getInputProps('cliente_nome')} />
          <TextInput label="Nome do Projeto" {...form.getInputProps('projeto_nome')} />
        </Stack>
      </Paper>

      {/* 2. DADOS DOS CÔMODOS E MÓVEIS */}
      <Title order={4} mt="md">Cômodos e Móveis</Title>
      <Stack gap="md">
        {form.values.rooms.map((room, roomIndex) => (
          <Paper key={room.id} withBorder p="md" radius="md" style={{ background: '#fdfdfd' }}>
            <Stack>
              <Group justify="space-between">
                <TextInput
                  label="Nome do Cômodo"
                  leftSection={<IconHome size={16} />}
                  style={{ flex: 1 }}
                  {...form.getInputProps(`rooms.${roomIndex}.name`)}
                />
                <ActionIcon color="red" variant="subtle" onClick={() => handleRemoveRoom(roomIndex)} mt="xl">
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
              
              <Divider />
              
              {/* Móveis dentro do cômodo */}
              <Stack gap="sm" pl="md">
                {room.furniture.map((item, f_index) => (
                  <Paper key={item.id} withBorder p="sm" radius="sm" shadow="xs">
                    <Stack>
                      <Group justify="space-between">
                         <TextInput
                          label="Móvel"
                          leftSection={<IconArmchair size={16} />}
                          style={{ flex: 1 }}
                          {...form.getInputProps(`rooms.${roomIndex}.furniture.${f_index}.name`)}
                        />
                         <ActionIcon color="red" variant="subtle" onClick={() => handleRemoveFurniture(roomIndex, f_index)} mt="xl">
                          <IconX size={16} />
                        </ActionIcon>
                      </Group>
                      <Textarea
                        label="Dimensões Aproximadas e Mock-up"
                        placeholder="Descreva o móvel, ex: 1800mm L x 800mm A, 3 portas, 2 gavetas..."
                        minRows={2}
                        autosize // <- TEXTBOX FLEXÍVEL
                        {...form.getInputProps(`rooms.${roomIndex}.furniture.${f_index}.dimensions_mockup`)}
                      />
                    </Stack>
                  </Paper>
                ))}
                 <Button
                  onClick={() => handleAddNewFurniture(roomIndex)}
                  leftSection={<IconPlus size={16} />}
                  variant="light"
                  color="green"
                  size="xs"
                  mt="xs"
                >
                  Adicionar Móvel
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
        <Button
          onClick={handleAddNewRoom}
          leftSection={<IconPlus size={16} />}
          variant="outline"
          color="blue"
          mt="sm"
        >
          Adicionar Cômodo
        </Button>
      </Stack>
      
      <Divider my="xl" />

      {/* 3. DADOS DOS MATERIAIS E PREÇOS */}
      <Title order={4}>Materiais e Preços de Custo</Title>
      
      {/* Exibir os itens já adicionados */}
      <Stack gap="xs" mt="xs">
        {form.values.material_list.length === 0 && (
          <Text c="dimmed" size="sm">Nenhum material adicionado ainda.</Text>
        )}
        {form.values.material_list.map((item) => (
          <Alert 
            key={item.id} 
            withCloseButton 
            onClose={() => handleRemoveItem(item.id)} 
            title={item.categoria}
            color="gray"
            variant="outline"
          >
            <Text size="sm">**Uso:** {item.uso}</Text>
            <Group justify="space-between" mt="xs">
              <Pill>{item.item_label}</Pill>
              <Badge color="blue" variant="filled">
                R$ {item.price.toFixed(2)}
              </Badge>
            </Group>
             <Text size="xs" c="dimmed" mt="4px">ID: {item.item_value}</Text>
          </Alert>
        ))}
      </Stack>

      {/* Inputs para adicionar novo item */}
      <Paper withBorder p="md" mt="sm" radius="md">
        <Stack>
          <Select
            label="1. Categoria"
            placeholder="Selecione uma categoria"
            data={categoryOptions}
            value={currentCategory}
            onChange={(value) => {
              setCurrentCategory(value);
              setCurrentItem(null); // Reseta o item
              setCurrentPrice(0);
            }}
          />
          <Select
            label="2. Item"
            placeholder="Selecione um item"
            data={itemOptions}
            value={currentItem}
            onChange={setCurrentItem}
            disabled={!currentCategory}
            searchable
            clearable
          />
          <NumberInput
            label="3. Preço de Custo (R$)"
            placeholder="Ex: 229.00"
            value={currentPrice}
            onChange={setCurrentPrice}
            min={0}
            precision={2}
            step={10}
            disabled={!currentItem}
          />
          <TextInput
            label="4. Onde/Como será usado?"
            placeholder="Ex: Caixaria interna, Portas, Gavetas..."
            value={currentUsage}
            onChange={(e) => setCurrentUsage(e.currentTarget.value)}
            disabled={!currentItem}
          />
          <Button 
            onClick={handleAddItem}
            leftSection={<IconPlus size={16} />}
            disabled={!currentItem || !currentUsage || currentPrice <= 0}
          >
            Adicionar Material à Lista
          </Button>
        </Stack>
      </Paper>

      <Text size="xs" c="dimmed" mt="lg">Consts (não editáveis) a serem usados: `custos_materiais`, `biblioteca_ferragens`, `custos_mao_de_obra`</Text>
    </Stack>,
    // --- FIM DA ATUALIZAÇÃO DO PASSO 1 ---
    
    // Passo 2: Lista de Peças (BOM)
    <Stack>
      <Title order={3}>Passo 2: Lista de Peças (BOM)</Title>
      <TextInput label="Medidas Finais (Exatas)" {...form.getInputProps('medidas_finais')} />
      <Textarea label="Descrição Detalhada do Projeto (Mock-up)" minRows={4} {...form.getInputProps('mockup_designer')} />
      <Text size="xs" c="dimmed">Consts (não editáveis) a serem usados: `padroes_de_construcao`</Text>
    </Stack>,

    // Passo 3: Lista de Compras
    <Stack>
      <Title order={3}>Passo 3: Lista de Compras</Title>
      <Text size="sm">Este passo usará a **"Área de Transferência de JSON"** da barra lateral.</Text>
      <Text size="xs" c="dimmed">Consts (não editáveis) a serem usados: `biblioteca_ferragens`, `padroes_de_construcao`</Text>
    </Stack>,

    // Passo 4: Plano de Corte
    <Stack>
      <Title order={3}>Passo 4: Plano de Corte</Title>
      <Text size="sm">Este passo usará a **"Área de Transferência de JSON"** da barra lateral.</Text>
      <Text size="xs" c="dimmed">Consts (não editáveis) a serem usados: `regras_plano_de_corte`</Text>
    </Stack>,

    // Passo 5: Instruções "Lego"
    <Stack>
      <Title order={3}>Passo 5: Instruções de Montagem</Title>
      <Text size="sm">Este passo usará a **"Área de Transferência de JSON"** da barra lateral.</Text>
      <Text size="xs" c="dimmed">Consts (não editáveis) a serem usados: `padroes_de_construcao`</Text>
    </Stack>,

    // Passo 6: Concluído
    <Stack align="center" mt="xl">
        <Title order={3}>Fluxo Concluído!</Title>
        <Text>Você testou todas as 5 etapas do fluxo de trabalho.</Text>
        <Button onClick={() => setActive(0)} color="orange" variant="light">
          Começar Novamente
        </Button>
    </Stack>
  ];

  // Definição dos botões de navegação lateral
  const navItems = [
    { label: 'Pré-Orçamento', icon: <IconNumber1 size={18} /> },
    { label: 'Lista de Peças', icon: <IconNumber2 size={18} /> },
    { label: 'Lista de Compras', icon: <IconNumber3 size={18} /> },
    { label: 'Plano de Corte', icon: <IconNumber4 size={18} /> },
    { label: 'Montagem', icon: <IconNumber5 size={18} /> },
  ];

  return (
    <Container size="lg" my="xl">
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Stack mb="xl">
          <Box>
            <Title order={2} align="center">Gerador de Prompts (MVP Marcenaria)</Title>
            <Text color="dimmed" size="sm" align="center" mt="sm">
              Teste o fluxo de trabalho de ponta a ponta. Preencha os campos para gerar o prompt perfeito.
            </Text>
          </Box>
        </Stack>

        <Grid>
          {/* --- PAINEL DE NAVEGAÇÃO LATERAL --- */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack>
              {navItems.map((item, index) => (
                <Button
                  key={item.label}
                  variant={active === index ? 'filled' : 'outline'}
                  color={active === index ? 'orange' : 'gray'}
                  onClick={() => setActive(index)}
                  leftSection={item.icon}
                  justify="flex-start"
                >
                  {item.label}
                </Button>
              ))}

              {/* --- ÁREA DE TRANSFERÊNCIA DE JSON PERSISTENTE --- */}
              {active > 0 && ( // Só aparece depois do Passo 1
                <Box mt="xl">
                  <Alert icon={<IconAlertCircle size="1rem" />} title="Memória de JSON" color="orange" variant="light">
                    Cole o JSON da Lista de Peças (gerado no Passo 2) aqui. Ele será usado pelos Passos 3, 4 e 5.
                  </Alert>
                  <Textarea
                    label="Área de Transferência de JSON"
                    minRows={10}
                    autosize
                    mt="sm"
                    {...form.getInputProps('json_lista_de_pecas')}
                  />
                </Box>
              )}
            </Stack>
          </Grid.Col>

          {/* --- PAINEL DE CONTEÚDO PRINCIPAL --- */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper withBorder p="xl" radius="md" style={{ minHeight: 400 }}>
              {/* Renderiza o formulário do passo atual */}
              {active < stepsContent.length && (
                <Box>
                  <form onSubmit={(e) => e.preventDefault()}>
                    {stepsContent[active]}
                    
                    {/* Botão de Gerar só aparece se não for o passo final */}
                    {active < stepsContent.length - 1 && (
                      <Button onClick={generatePrompt} mt="lg" fullWidth color="orange" rightSection={<IconArrowRight size={18}/>}>
                        Gerar Prompt para o Passo {active + 1}
                      </Button>
                    )}
                  </form>
                  
                  <GeneratedPrompt promptText={generatedPrompt} />
                </Box>
              )}

              <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep} disabled={active === 0}>
                  Voltar
                </Button>
                <Button onClick={nextStep} color="orange" disabled={active === stepsContent.length - 1}>
                  Próximo Passo
                </Button>
              </Group>

            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}