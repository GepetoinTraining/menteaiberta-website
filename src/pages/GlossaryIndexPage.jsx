import { Container, Title, Text, Stack, Card, Group, Button, Loader, Alert, SimpleGrid, Badge, Checkbox, Box } from '@mantine/core'; // Added Checkbox, Box, SimpleGrid, Badge
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react'; // Added IconAlertCircle

// Assume getGlossaryData fetches from /content/data/glossary_internal.json
// which now includes a "subjects": ["Subject1", "Subject2"] array for each term.
async function getGlossaryData() {
  const response = await fetch('/content/data/glossary_internal.json');
  if (!response.ok) {
    throw new Error('Failed to load internal glossary database');
  }
  return await response.json();
}

export default function GlossaryIndexPage() {
  const [allTerms, setAllTerms] = useState(null); // Holds all fetched terms
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]); // State for active filters
  const [availableSubjects, setAvailableSubjects] = useState([]); // State for checkbox options

  useEffect(() => {
     const fetchTerms = async () => {
      try {
        setLoading(true);
        const data = await getGlossaryData();
        // Convert object to array and sort alphabetically by term
        const sortedTerms = Object.entries(data)
          .map(([slug, termData]) => ({ slug, ...termData }))
          .sort((a, b) => a.term.localeCompare(b.term));

        setAllTerms(sortedTerms); // Store all terms

        // Extract unique subjects from all terms for the filter options
        const subjects = new Set();
        sortedTerms.forEach(term => {
          // Check if subjects exist and is an array before iterating
          if (Array.isArray(term.subjects)) {
             term.subjects.forEach(subject => subjects.add(subject));
          }
        });
        setAvailableSubjects(Array.from(subjects).sort()); // Set available subjects for checkboxes

        setError(null);
      } catch (err) {
        console.error("Error fetching glossary index:", err);
        setError(err.message);
        setAllTerms(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []); // Run only once on component mount

  // Filter the terms based on selected subjects
  const filteredTerms = allTerms
    ? allTerms.filter(term =>
        selectedSubjects.length === 0 || // If no filters are selected, show all terms
        (Array.isArray(term.subjects) && term.subjects.some(subject => selectedSubjects.includes(subject))) // Otherwise, check if term includes any selected subject
      )
    : [];


  return (
    <Container size="xl" py="3rem">
      <Stack gap="xl">
        <Title order={1} mb="md" ta="center">Glossário Interno</Title>
        <Text c="dimmed" mb="lg" ta="center">
          Definições de termos chave do curso. Filtre por matéria escolar.
        </Text>

        {loading && <Loader color="turquoise" style={{ margin: 'auto' }} />}
        {error && <Alert color="red" title="Erro" icon={<IconAlertCircle size={16}/>} radius="md">{error}</Alert>}

        {/* --- Filter Checkboxes Section --- */}
        {!loading && availableSubjects.length > 0 && (
          <Card padding="lg" radius="md" withBorder mb="lg" shadow="xs">
             <Text size="sm" fw={500} mb="sm">Filtrar por Matéria:</Text>
            <Checkbox.Group value={selectedSubjects} onChange={setSelectedSubjects}>
              {/* Wrap checkboxes for better layout on smaller screens */}
              <Group wrap="wrap" gap="sm">
                {availableSubjects.map((subject) => (
                  <Checkbox key={subject} value={subject} label={subject} size="sm" radius="sm"/>
                ))}
              </Group>
            </Checkbox.Group>
             {/* Show clear button only if filters are active */}
             {selectedSubjects.length > 0 && (
                 <Button variant="subtle" color="gray" size="xs" onClick={() => setSelectedSubjects([])} mt="sm">
                     Limpar Filtros
                 </Button>
             )}
          </Card>
        )}
        {/* --- End Filter Checkboxes Section --- */}

        {/* --- Grid Display Section --- */}
        {!loading && filteredTerms.length > 0 ? (
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }} // Responsive columns
            spacing="lg"
          >
            {filteredTerms.map((term) => (
              <Card key={term.slug} shadow="sm" padding="lg" radius="md" withBorder h="100%">
                {/* Use Stack to push button to bottom */}
                <Stack justify="space-between" h="100%">
                  {/* Top part of the card */}
                  <div>
                    <Group justify="space-between" align="flex-start" mb="xs">
                       <Title order={4} size="h5">{term.term}</Title>
                       {/* Week Badge */}
                       <Badge variant="light" color="cyan" size="sm" radius="sm">
                         Semana {term.week}
                       </Badge>
                    </Group>

                    {/* Subject Pills (Badges) */}
                    {Array.isArray(term.subjects) && term.subjects.length > 0 && (
                      <Group gap={6} mb="md" wrap="wrap"> {/* Reduced gap, allow wrapping */}
                         {term.subjects.map(subject => (
                           <Badge key={subject} size="xs" variant="outline" radius="sm">
                             {subject}
                           </Badge>
                         ))}
                      </Group>
                    )}
                  </div>

                  {/* Button at the bottom */}
                  <Button
                    component={Link}
                    to={`/conhecimento/glossario/${term.slug}`}
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md" // Ensure margin from content above
                    radius="md"
                  >
                    Ver Definição
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
             // Show message if no terms match filters (and not loading)
             !loading && !error && <Text ta="center" c="dimmed" mt="xl">Nenhum termo encontrado para os filtros selecionados.</Text>
        )}
        {/* --- End Grid Display Section --- */}

      </Stack>
    </Container>
  );
}