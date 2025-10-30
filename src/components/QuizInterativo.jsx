import { useState, useEffect } from 'react'; // Added useEffect
import { Card, Stack, Title, Text, Radio, Group, Button, Progress, Alert, Loader, Center } from '@mantine/core'; // Added Loader, Center
import { IconSparkles, IconCheck, IconAlertCircle } from '@tabler/icons-react'; // Added IconAlertCircle

// Mock function to load quiz data (replace with actual fetch from quizzes.json)
async function loadQuizData(quizId) {
  const quizDatabase = {
    // --- Lesson 1 Quiz ---
    'semana1-quiz': {
      title: 'Qual IA combina com seu estilo de aprendizagem?',
      questions: [
         {
            id: 1,
            question: "Quando você precisa estudar para uma prova, você prefere:",
            options: [
              { value: 'a', label: 'Resumos bem estruturados e organizados', ai: 'ChatGPT' },
              { value: 'b', label: 'Vídeos explicativos e exemplos visuais', ai: 'Gemini' },
              { value: 'c', label: 'Discutir o tema com alguém para clarear ideias', ai: 'Claude' }
            ]
          },
          {
            id: 2,
            question: "Ao começar um projeto escolar, você costuma:",
            options: [
              { value: 'a', label: 'Fazer um cronograma detalhado antes de começar', ai: 'ChatGPT' },
              { value: 'b', label: 'Buscar inspiração em várias fontes diferentes', ai: 'Gemini' },
              { value: 'c', label: 'Experimentar algumas ideias e ver o que funciona', ai: 'Claude' }
            ]
          },
          {
            id: 3,
            question: "Quando lê um texto difícil, você prefere:",
            options: [
              { value: 'a', label: 'Destrinchar parágrafo por parágrafo com atenção', ai: 'ChatGPT' },
              { value: 'b', label: 'Conectar com coisas que já conhece', ai: 'Gemini' },
              { value: 'c', label: 'Reformular com suas próprias palavras', ai: 'Claude' }
            ]
          },
          {
            id: 4,
            question: "Para memorizar conteúdo, você funciona melhor com:",
            options: [
              { value: 'a', label: 'Listas organizadas e mapas mentais estruturados', ai: 'ChatGPT' },
              { value: 'b', label: 'Analogias e comparações criativas', ai: 'Gemini' },
              { value: 'c', label: 'Ensinar o conteúdo para alguém', ai: 'Claude' }
            ]
          },
          {
            id: 5,
            question: "Diante de um problema complexo, você:",
            options: [
              { value: 'a', label: 'Divide em partes menores e resolve uma por vez', ai: 'ChatGPT' },
              { value: 'b', label: 'Procura padrões ou soluções similares', ai: 'Gemini' },
              { value: 'c', label: 'Faz perguntas até entender o contexto todo', ai: 'Claude' }
            ]
          }
      ],
      // Results logic specific to this quiz type
      resultType: 'personality',
      aiProfiles: {
        ChatGPT: { name: 'ChatGPT', description: 'Estruturado e professoral', tips: ['Ótimo para explicações passo a passo', 'Excelente para criar cronogramas e planos de estudo', 'Ideal quando você precisa de estrutura e organização'], color: '#10a37f' },
        Gemini: { name: 'Gemini', description: 'Analítico e conectivo', tips: ['Excelente para pesquisa e análise de informações', 'Conecta conceitos de múltiplas fontes', 'Ideal para entender contextos amplos e relações entre ideias'], color: '#4285f4' },
        Claude: { name: 'Claude', description: 'Conversacional e iterativo', tips: ['Ótimo para brainstorming e refinamento de ideias', 'Conversação natural e colaborativa', 'Ideal para explorar tópicos de forma criativa'], color: '#00D1D1' }
      }
    },
    // --- Lesson 2 Puzzle Example ---
    'semana2-puzzle': {
        title: 'Quebra-Cabeças Lógicos (Semana 2)',
        questions: [
            { id: 1, question: "Se estou em uma corrida e ultrapasso o segundo colocado, em que posição eu fico?", options: [{ value: 'a', label: 'Primeiro' }, { value: 'b', label: 'Segundo' }, { value: 'c', label: 'Terceiro' }], correctAnswer: 'b', explanation: "Se você ultrapassa o segundo, você assume a posição dele." },
            { id: 2, question: "O pai de Maria tem 5 filhas: Lala, Lele, Lili, Lolo e... qual o nome da quinta filha?", options: [{ value: 'a', label: 'Lulu' }, { value: 'b', label: 'Lila' }, { value: 'c', label: 'Maria' }], correctAnswer: 'c', explanation: "A pergunta começa falando sobre o pai de Maria." },
            // Add more puzzles...
        ],
        resultType: 'correctIncorrect' // Indicates a standard quiz result
    },
    // --- Lesson 13 Diagnostic Example ---
     'semana13-diagnostico': {
        title: 'Diagnóstico de Estilo de Aprendizagem (Semana 13)',
        questions: [
           { id: 1, question: "Quando você monta um móvel, você prefere...", options: [{ value: 'v', label: 'Ver os diagramas' }, { value: 'a', label: 'Ouvir um vídeo tutorial' }, { value: 'r', label: 'Ler o manual' }, { value: 'k', label: 'Ir tentando encaixar as peças' }] },
           { id: 2, question: "Para aprender uma nova receita, você prefere...", options: [{ value: 'v', label: 'Ver fotos do processo' }, { value: 'a', label: 'Ouvir alguém explicar' }, { value: 'r', label: 'Ler o passo a passo' }, { value: 'k', label: 'Cozinhar junto com alguém' }] },
           // ... Add questions 3 and 4 from L13 ...
        ],
        resultType: 'vark', // Special result type for VARK
        varkProfiles: { // Data for VARK results
          v: { name: 'Visual', description: 'Aprende melhor vendo.', techniques: ['Mapas mentais', 'Gráficos', 'Vídeos'] },
          a: { name: 'Auditivo', description: 'Aprende melhor ouvindo.', techniques: ['Discussões', 'Podcasts', 'Gravar aulas'] },
          r: { name: 'Leitor/Escritor', description: 'Aprende melhor lendo/escrevendo.', techniques: ['Anotações', 'Resumos', 'Listas'] },
          k: { name: 'Cinestésico', description: 'Aprende melhor fazendo.', techniques: ['Experimentos', 'Exemplos práticos', 'Simulações'] }
        }
    },
     // --- Lesson 15 True/False Example ---
    'semana15-verdadeiro-falso': {
        title: 'Verdadeiro ou Falso? (Semana 15)',
        questions: [
             { id: 1, question: "Afirmação gerada pela IA sobre [TEMA 1]. Verdadeiro ou Falso?", options: [{ value: 't', label: 'Verdadeiro' }, { value: 'f', label: 'Falso' }], correctAnswer: 't/f', explanation: "Explicação..." },
             { id: 2, question: "Afirmação gerada pela IA sobre [TEMA 2]. Verdadeiro ou Falso?", options: [{ value: 't', label: 'Verdadeiro' }, { value: 'f', label: 'Falso' }], correctAnswer: 't/f', explanation: "Explicação..." },
             // Add more T/F questions...
        ],
        resultType: 'correctIncorrect'
    },
    // Add other quiz definitions here...
  };
  await new Promise(resolve => setTimeout(resolve, 250)); // Simulate loading
  return quizDatabase[quizId] || null;
}

// 1. Accept the quizId prop
export default function QuizInterativo({ quizId }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizData, setQuizData] = useState(null); // State for loaded quiz data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Load quiz data dynamically
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) {
        setError('Nenhum ID de quiz fornecido.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await loadQuizData(quizId);
        if (!data) {
          throw new Error(`Quiz com ID "${quizId}" não encontrado.`);
        }
        setQuizData(data);
        // Reset state for the new quiz
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
        setError(null);
      } catch (err) {
        console.error("Failed to load quiz:", err);
        setError(err.message);
        setQuizData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]); // Reload when quizId changes

  // --- Render Loading State ---
  if (loading) {
    return (
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Center style={{ height: 200 }}>
          <Loader color="turquoise" />
        </Center>
      </Card>
    );
  }

  // --- Render Error State ---
  if (error || !quizData) {
    return (
      <Alert title="Erro" color="red" radius="md" icon={<IconAlertCircle size={16} />}>
        {error || 'Não foi possível carregar os dados do quiz.'}
      </Alert>
    );
  }

  // Destructure after loading check
  const { questions, resultType } = quizData;


  const handleAnswer = (value) => {
     // For personality/VARK quizzes, store the chosen category ('ChatGPT', 'v', 'a', etc.)
     // For correct/incorrect quizzes, store the chosen option value ('a', 'b', 'c')
     let answerValue = value;
     if (resultType === 'personality' || resultType === 'vark') {
        const selectedOption = questions[currentQuestion].options.find(opt => opt.value === value);
        answerValue = selectedOption?.ai || selectedOption?.value; // Store AI name or VARK type
     }
     setAnswers({
       ...answers,
       [currentQuestion]: answerValue
     });
   };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  // --- Result Calculation Logic ---

  const calculatePersonalityResult = () => {
    const counts = {};
    Object.values(answers).forEach(ai => {
      counts[ai] = (counts[ai] || 0) + 1;
    });
    // Find the AI with the highest count
    const maxCount = Math.max(...Object.values(counts));
    // Return the first AI name that matches the max count
    return Object.keys(counts).find(ai => counts[ai] === maxCount) || 'N/A';
  };

  const calculateVarkResult = () => {
     const counts = { v: 0, a: 0, r: 0, k: 0 };
     Object.values(answers).forEach(style => {
       if (counts.hasOwnProperty(style)) {
         counts[style]++;
       }
     });
     // Find primary and secondary styles
     const sortedStyles = Object.entries(counts).sort(([,a],[,b]) => b-a);
     const primary = sortedStyles[0][0];
     const secondary = sortedStyles[1] && sortedStyles[1][1] > 0 ? sortedStyles[1][0] : null;
     return { primary, secondary };
  };

  const calculateCorrectIncorrectResult = () => {
     let correctCount = 0;
     questions.forEach((q, index) => {
       if (answers[index] === q.correctAnswer) {
         correctCount++;
       }
     });
     return { correctCount, totalQuestions: questions.length };
  };


  // --- Render Results ---
  if (showResults) {
     let resultDisplay;

     if (resultType === 'personality') {
        const matchedAI = calculatePersonalityResult();
        const profile = quizData.aiProfiles[matchedAI];
        resultDisplay = (
           <Stack gap="xl">
             <div style={{ textAlign: 'center' }}>
               <IconSparkles size={48} color={profile.color} style={{ marginBottom: '1rem' }} />
               <Title order={2} mb="xs">Seu estilo combina com {profile.name}!</Title>
               <Text size="lg" c="dimmed">{profile.description}</Text>
             </div>
             <Alert color="turquoise" variant="light" icon={<IconCheck size={20} />}>
                <Stack gap="xs">
                  <Text fw={600}>Como usar essa IA nos seus estudos:</Text>
                  {profile.tips.map((tip, idx) => ( <Text key={idx} size="sm">• {tip}</Text> ))}
                </Stack>
              </Alert>
             <Card padding="md" radius="md" style={{ background: '#f8f9fa' }}>
                <Stack gap="xs">
                  <Text fw={600} size="sm">💡 Mas não se limite!</Text>
                  <Text size="sm">
                    Cada IA tem seus pontos fortes. Experimente todas para diferentes
                    tarefas e descubra quando usar cada uma.
                  </Text>
                </Stack>
              </Card>
           </Stack>
        );
     } else if (resultType === 'vark') {
        const { primary, secondary } = calculateVarkResult();
        const primaryProfile = quizData.varkProfiles[primary];
        const secondaryProfile = secondary ? quizData.varkProfiles[secondary] : null;
        resultDisplay = (
          <Stack gap="xl">
             <div style={{ textAlign: 'center' }}>
               <Title order={2} mb="xs">Seu Estilo de Aprendizagem Dominante</Title>
               <Badge size="xl" color="teal">{primaryProfile.name}</Badge>
               <Text mt="sm">{primaryProfile.description}</Text>
               {secondaryProfile && (
                 <>
                  <Title order={4} mt="lg" mb="xs" c="dimmed">Estilo Secundário</Title>
                   <Badge size="lg" color="blue">{secondaryProfile.name}</Badge>
                  <Text size="sm" c="dimmed">{secondaryProfile.description}</Text>
                 </>
               )}
             </div>
             <Alert color="turquoise" variant="light" icon={<IconCheck size={20} />}>
                <Stack gap="xs">
                  <Text fw={600}>Técnicas de Estudo Sugeridas:</Text>
                  {primaryProfile.techniques.map((tip, idx) => ( <Text key={`p-${idx}`} size="sm">• {tip} (Principal)</Text> ))}
                  {secondaryProfile?.techniques.map((tip, idx) => ( <Text key={`s-${idx}`} size="sm">• {tip} (Secundário)</Text> ))}
                </Stack>
              </Alert>
          </Stack>
        );
     } else if (resultType === 'correctIncorrect') {
         const { correctCount, totalQuestions } = calculateCorrectIncorrectResult();
         const score = Math.round((correctCount / totalQuestions) * 100);
         resultDisplay = (
           <Stack gap="xl" align="center">
             <Title order={2}>Resultado</Title>
             <Text size="xl">Você acertou {correctCount} de {totalQuestions} perguntas ({score}%)!</Text>
             {/* Optional: Add button to review answers */}
           </Stack>
         );
     } else {
        resultDisplay = <Text>Tipo de resultado desconhecido.</Text>
     }

    return (
      <Card shadow="sm" padding="xl" radius="md" withBorder>
         {resultDisplay}
        <Button
          onClick={handleRestart}
          variant="outline"
          color="turquoise"
          fullWidth
          mt="xl" // Added margin top
        >
          {resultType === 'personality' || resultType === 'vark' ? 'Fazer Novamente' : 'Tentar Novamente'}
        </Button>
      </Card>
    );
  }

  // --- Render Question ---
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQData = questions[currentQuestion];

  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Stack gap="lg">
        <div>
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed">
              Pergunta {currentQuestion + 1} de {questions.length}
            </Text>
            <Text size="sm" fw={600} c="turquoise">
              {Math.round(progress)}%
            </Text>
          </Group>
          <Progress value={progress} color="turquoise" size="sm" mb="xl" />
        </div>

        <Title order={3}>{currentQData.question}</Title>

        <Radio.Group
          // Determine value based on result type
          value={answers[currentQuestion] ? (resultType === 'correctIncorrect' ? answers[currentQuestion] : currentQData.options.find(opt => (opt.ai === answers[currentQuestion]) || (opt.value === answers[currentQuestion]))?.value) : null}
          onChange={handleAnswer}
        >
          <Stack gap="md">
            {currentQData.options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                label={option.label}
                size="md"
                styles={{
                  label: { paddingLeft: '0.5rem', cursor: 'pointer' }
                }}
              />
            ))}
          </Stack>
        </Radio.Group>

        <Group justify="flex-end" mt="md">
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            color="turquoise"
            size="md"
          >
            {currentQuestion < questions.length - 1 ? 'Próxima' : 'Ver Resultado'}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}