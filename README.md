# Industrial Asset Health Monitor

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=D04A37)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Reanimated](https://img.shields.io/badge/reanimated-%23000000.svg?style=for-the-badge&logo=react&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=white)

Aplicativo para monitoramento preditivo e telemetria de ativos industriais em tempo real, criado em React Native e Expo.

## Arquitetura (Feature-Sliced Design)

O projeto estrutura-se visando escalabilidade e separação cristalina entre Lógica e Interface de Usuário (UI):

- **app**: Roteamento por sistema de arquivos (Expo Router).
- **src/features**: Lógicas de negócio (Monitoramento de Telemetria, Diagnóstico via IA, Scanner de QR Code).
- **src/entities**: Definição de modelos centrais (Ativos Industriais).
- **src/widgets**: Componentes estruturais e complexos da tela (Tabelas de dados, Dashboards).
- **src/shared**: Funcionalidades universais (Configuração de tema, formatação, utilitários).
  A totalidade das lógicas das frentes operacionais atua em hooks dedicados (dentro das pastas `lib/`), limitando as views (`.tsx`) unicamente a marcação e exibição.

## Design e Experiência de Uso (UX)

- **Bento Grid**: Elementos formatados em blocos fluidos estilo Bento, consolidando dados volumosos em painéis visualmente digeríveis.
- **Tipografia e Contraste**: Uso de hierarquias de fonte para diferenciação instantânea (IDs, Status, Métricas) e aplicação de um modelo de cores de alto contraste funcional para uso em chão de fábrica.
- **Tematização Dinâmica**: Controle fluido via `useThemeColors` e `useThemeMode` que suporta customização para modos claros e escuros dependendo da preferência ou visibilidade do ambiente.

## Alta Performance Funcional e Animações

Desenvolvimento pautado na eliminação do gargalo da Thread de JavaScript em dados em tempo real:

- **Animações na UI Thread**: Gráficos de telemetria em SVG (`TelemetryChart`) e medidores radiais dinâmicos (`MetricGauge`) dispensam atualizações do React em prol de estados isolados da UI Thread (`useDerivedValue`, `useAnimatedProps`), além de textos com interpolação contínua processados pelo `AnimatedTextInput`.
- **Listas Estáveis Perante Altos Volumes Acumulados**: Utilização do `FlatList` com numColumns, garantindo reciclagem de células nativa (Virtualization) o que previne perdas de quadros.
- **Polling de Telemetria**: Taxas recorrentes de comunicação assíncrona são injetadas diretamente em Single Source of Truth do Reanimated, preservando a navegação nativa até na presença de flutuações rápidas.

Isto assegura um aplicativo com fluidez constante e que responde rapidamente a eventos mesmo ao lidar com múltiplos sensores reportando dados paralelamente.

## Camada de Dados e Integração de APIs

Os dados e listagens que alimentam a UI atualmente utilizam _mocks_ rígidos definidos localmente. A arquitetura, no entanto, foi concebida como "API-Ready":

- Desenvolvedores podem implementar seus próprios endpoints de back-end, serviços IoT via MQTT, ou WebSockets;
- Basta injetar os dados reais consumidos na respectiva área (`api/` ou Zustand store) e realizar o **mapper** das respostas para as interfaces TypeScript base já estabelecidas (como os tipos do Domínio).
- Esse mapeamento garante que a transição de um ambiente local simulado para dados hiper-frequentes de produção não afete nenhum aspecto estrutural ou da interface visual.
