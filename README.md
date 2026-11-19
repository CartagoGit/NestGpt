# NestGpt

**A NestJS API foundation for AI-enabled applications.** The API wraps the OpenAI platform
behind typed, validated endpoints: spelling correction, translation, text-to-speech (buffered,
streamed and downloadable), audio transcription, and a structured pro/con discussion endpoint
that can stream its answer.

[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=flat-square&logo=openai&logoColor=white)](https://platform.openai.com)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

---

## What it does

- **Typed request contracts.** Every endpoint takes a DTO validated with `class-validator` and
  mapped with `class-transformer`, so a malformed request is rejected at the boundary instead of
  reaching the model call.
- **Streaming when it matters.** The pro/con endpoint streams chunks as they arrive, and
  text-to-speech has a streamed variant next to the buffered one.
- **Audio both ways.** Text to speech produces a file that can be downloaded through the API, and
  audio to text transcribes an uploaded file, both through a Multer interceptor.
- **Secrets encrypted at rest.** The API key is stored encrypted with
  [`Keyer`](https://github.com/CartagoGit/Keyer) and decrypted at boot, so the key never sits in
  plain text in the repository or in the image.
- **Containers as the normal way to run.** A `Dockerfile` and a `docker-compose.yml` ship with it,
  and the API can start its React front-end alongside itself.

---

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/ping` | Liveness probe |
| `POST` | `/gpt/orthography/check` | Spelling and grammar check |
| `POST` | `/gpt/translate` | Translation |
| `POST` | `/gpt/pro-con/dicusser` | Structured pro/con discussion |
| `POST` | `/gpt/pro-con/stream` | The same, streamed chunk by chunk |
| `POST` | `/gpt/text-to-voice` | Text to speech, whole file |
| `POST` | `/gpt/text-to-voice/stream` | Text to speech, streamed |
| `POST` | `/gpt/text-to-voice/data` | Text to speech, base64 payload |
| `GET` | `/gpt/text-to-voice/:file` | Download a generated audio file |
| `POST` | `/gpt/audio-to-text` | Transcribe an uploaded audio file |

---

## Getting started

```console
bun install      # or: npm install
cp .env.template .env
```

Then fill in `OPENAI_API_KEY` in `.env` and start the API:

```console
bun run dev      # or: npm run dev
```

The API listens on `API_PORT` (4000 by default).

### Encrypting the API key

The repository expects the key encrypted with `Keyer`:

```console
bunx @cartago-git/keyer encrypt-route .env
```

The encrypted payload is written to `keyer/encrypted.txt` and decrypted at boot.

### Running in containers

```console
bun run docker:up        # docker compose up
bun run docker:reactgpt  # start the API together with the React front-end
```

---

## Commands

| Command | What it does |
| --- | --- |
| `bun run build` | Compile the project |
| `bun run dev` | Start the API in watch mode |
| `bun run start` | Start the API |
| `bun run start:debug` | Start the API with the debugger attached |
| `bun run start:prod` | Run the compiled build (`node dist/main`) |
| `bun run lint` | ESLint over the workspace |
| `bun run format` | Prettier over the workspace |
| `bun run test` / `test:watch` / `test:cov` / `test:debug` | Jest test runner |
| `bun run test:e2e` | End-to-end suite |
| `bun run launch` | Start the API in watch mode |
| `bun run launch:reactgpt` | Start the React front-end from the sibling checkout |

---

## Project layout

```text
src/
├── gpt/                  # the AI endpoints
│   ├── gpt.controller.ts # routes, streaming and file handling
│   ├── gpt.service.ts    # the calls to the model
│   └── dtos/             # validated request contracts
├── _ping/                # liveness probe
├── shared/               # shared module and interceptors
├── app.module.ts
└── main.ts
```

---

## Related

- [`ReactGpt`](https://github.com/CartagoGit/ReactGpt) — the React front-end for this API.
- [`Keyer`](https://github.com/CartagoGit/Keyer) — the npm CLI used to encrypt the API key.

---

## Status

Working foundation. The endpoints, the DTOs and the container setup are in place; the test
coverage around the model calls is still thin, and that is the next thing to build.

---

## License

[MIT](./LICENSE)
