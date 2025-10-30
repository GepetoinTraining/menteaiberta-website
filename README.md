# Menteaberta - Website

Website oficial do curso Menteaberta: Alfabetização em IA para estudantes do ensino médio.

## 🚀 Stack Tecnológica

- **React 18** - Framework UI
- **Vite** - Build tool
- **Mantine v7** - Biblioteca de componentes UI
- **React Router v6** - Navegação
- **Tabler Icons** - Ícones

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🎨 Estrutura do Projeto

```
menteaberta-website/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navegação principal
│   │   ├── Footer.jsx              # Rodapé
│   │   ├── QuizInterativo.jsx      # Quiz de personalidade IA
│   │   ├── ComparadorRespostas.jsx # Ferramenta de comparação
│   │   └── BibliotecaPrompts.jsx   # Biblioteca de prompts
│   ├── pages/
│   │   ├── Home.jsx                # Landing page
│   │   ├── Conhecimento.jsx        # Hub de conteúdo
│   │   ├── Semana1.jsx             # Recursos Semana 1
│   │   ├── Sobre.jsx               # Sobre o projeto
│   │   └── Contato.jsx             # Formulário de contato
│   ├── theme.js                    # Tema Mantine customizado
│   ├── App.jsx                     # App principal
│   └── main.jsx                    # Entry point
├── public/
│   └── assets/                     # Imagens e assets
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Cores Principais

- **Turquoise (Primary):** `#00D1D1`
- **Navy:** `#1B2B34`
- **Solar Yellow:** `#FFD447`
- **White:** `#FFFFFF`

### Tipografia

- Font Family: Sistema padrão (Apple/Windows)
- Base size: 16px
- Line height: 1.5

## 📱 Páginas

### 1. Home (`/`)
- Hero section
- Character cards (Alex, Carmen, ARIA, VECTOR)
- Como funciona section
- CTA section

### 2. Conhecimento (`/conhecimento`)
- Hub de conteúdo com 4 módulos
- 24 semanas organizadas por módulo
- Apenas Semana 1 liberada inicialmente

### 3. Semana 1 (`/conhecimento/semana-1`)
- Task-based outcomes
- 3 ferramentas interativas em tabs:
  - **Quiz Interativo:** Descubra qual IA combina com seu estilo
  - **Comparador de Respostas:** Compare respostas lado a lado
  - **Biblioteca de Prompts:** 8 prompts prontos para usar

### 4. Sobre (`/sobre`)
- História do projeto
- Bio do fundador (Pedro)
- Co-criadores (Claude, ChatGPT, Gemini)
- Filosofia pedagógica

### 5. Contato (`/contato`)
- Formulário de contato
- Informações adicionais

## 🔧 Deploy para cPanel

### Passo 1: Build

```bash
npm run build
```

Isso gera a pasta `dist/` com todos os arquivos estáticos.

### Passo 2: Upload

1. Acesse seu cPanel
2. Abra o File Manager
3. Navegue até `public_html` (ou pasta do domínio)
4. Delete conteúdo existente (se houver)
5. Upload todos os arquivos da pasta `dist/`
6. Certifique-se que o `index.html` está na raiz

### Passo 3: Configuração

Se estiver usando um subdomínio ou subpasta, ajuste o `base` no `vite.config.js`:

```js
export default defineConfig({
  base: '/sua-pasta/',  // ou './' para raiz
  // ...
})
```

Rebuild e reupload.

## 🖼️ Assets Necessários

Para completar o site, você precisará adicionar em `public/assets/`:

### Logos e Branding
- `logo.svg` - Logo principal (não-white version)
- `favicon.ico` - Favicon (512x512 PNG convertido)

### Hero
- `hero-image.jpg` - Imagem principal landing page (1920x1080px)

### Characters
- `alex.png` - Alex (O Autodidata) - 400x400px
- `carmen.png` - Carmen (A Conectora) - 400x400px
- `aria.png` - ARIA (Mentora Digital) - 400x400px
- `vector.png` - VECTOR (O Criador) - 400x400px

### Bio
- `pedro.jpg` - Foto do Pedro (opcional) - 400x400px

**Nota:** Atualmente usando placeholders. Substitua quando tiver as imagens reais.

## 🎯 URLs dos QR Codes

Os QR codes do livro físico devem apontar para:

- **QR 1 (Quiz):** `https://menteaiberta.app/conhecimento/semana-1` → Tab "Quiz Interativo"
- **QR 2 (Comparador):** `https://menteaiberta.app/conhecimento/semana-1` → Tab "Comparador de Respostas"
- **QR 3 (Prompts):** `https://menteaiberta.app/conhecimento/semana-1` → Tab "Biblioteca de Prompts"

Todos levam à mesma página, usuário escolhe a tab. Para links diretos com tab pré-selecionada, adicione hash:

- `https://menteaiberta.app/conhecimento/semana-1#quiz`
- `https://menteaiberta.app/conhecimento/semana-1#comparador`
- `https://menteaiberta.app/conhecimento/semana-1#prompts`

## 📧 Formulário de Contato

O formulário atualmente é uma demo. Para produção, integre com:

### Opção 1: Formspree (Recomendado - Free tier)

1. Crie conta em [formspree.io](https://formspree.io)
2. Crie um novo form
3. Copie o form endpoint
4. Atualize `src/pages/Contato.jsx`:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })

  if (response.ok) {
    setSubmitted(true)
  }
  setLoading(false)
}
```

### Opção 2: Netlify Forms

Se hospedar no Netlify, use Netlify Forms (gratuito):

```jsx
<form name="contato" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contato" />
  {/* resto dos campos */}
</form>
```

### Opção 3: Email direto via backend

Configure um endpoint PHP simples no cPanel para enviar emails.

## 🔐 Variáveis de Ambiente

Não há variáveis de ambiente necessárias para a versão básica. Se adicionar integrações:

```env
VITE_FORMSPREE_ID=your_formspree_id
VITE_ANALYTICS_ID=your_analytics_id
```

## 🧪 Testing Checklist

Antes de deploy:

- [ ] Navegação funciona (todos os links)
- [ ] Quiz interativo completo
- [ ] Comparador analisa respostas
- [ ] Biblioteca de prompts filtra e copia
- [ ] Formulário de contato (mock) funciona
- [ ] Responsivo mobile (teste em celular)
- [ ] Imagens carregam (ou placeholders)
- [ ] Sem erros no console
- [ ] Build sem warnings

## 🚀 Performance

### Otimizações incluídas:

- Code splitting automático por rota (Vite)
- Lazy loading de componentes pesados
- Mantine tree-shaking (apenas componentes usados)
- Assets otimizados no build

### Para melhorar ainda mais:

1. Comprima imagens (WebP quando possível)
2. Use CDN para assets estáticos
3. Configure cache headers no servidor
4. Adicione Service Worker (PWA)

## 🎓 Adicionando Novas Semanas

Para adicionar Semana 2, 3, etc:

1. Crie `src/pages/Semana2.jsx` (copie estrutura da Semana1)
2. Adicione rota no `App.jsx`:
   ```jsx
   <Route path="/conhecimento/semana-2" element={<Semana2 />} />
   ```
3. Atualize status no `Conhecimento.jsx`:
   ```jsx
   { week: 2, title: 'Título da Semana 2', available: true }
   ```
4. Crie componentes específicos se necessário

## 🤝 Contribuindo

Para manter consistência:

1. Use componentes Mantine sempre que possível
2. Siga o theme (cores, espaçamentos)
3. Mantenha acessibilidade (ARIA labels, contraste)
4. Teste em mobile primeiro
5. Código em português quando relevante ao conteúdo

## 📄 Licença

© 2025 Menteaberta. Todos os direitos reservados.

---

## 🆘 Troubleshooting

### Build falha

```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Rotas não funcionam no servidor

Configure redirect rules no cPanel. Crie `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Estilos não carregam

Certifique-se que o `base` no vite.config está correto para seu deploy path.

### Imagens quebradas

Verifique caminhos relativos. Use `/assets/` não `./assets/` para assets públicos.

---

**Desenvolvido com 💙 por Claude, para o projeto Menteaberta**