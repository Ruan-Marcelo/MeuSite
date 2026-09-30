# Portfólio Ruan Marcelo

Site estático publicado em `zruanzito.com.br` para reunir projetos, certificações e formas de contato.

## Páginas

- `index.html`: página principal do portfólio.
- `consumoDeAPI.html`: dashboard que consulta a API pública do GitHub.
- `MinhasCertificações/`: lista de cursos e certificações.

## Tecnologias

- HTML
- CSS
- JavaScript
- Bootstrap Icons
- EmailJS
- Chart.js
- Spotify Web API

## Spotify

O site lê `data/spotify.json`, que é atualizado pelo GitHub Actions em `.github/workflows/update-spotify.yml`.

Secrets necessários no GitHub:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

Para gerar o refresh token, crie um app no Spotify Developer Dashboard com a Redirect URI `http://127.0.0.1:8888/callback` e rode:

```powershell
$env:SPOTIFY_CLIENT_ID="seu_client_id"
$env:SPOTIFY_CLIENT_SECRET="seu_client_secret"
python scripts/get_spotify_refresh_token.py
```

O token precisa liberar os escopos `user-top-read` e `user-read-currently-playing`.

## Autor

Ruan Marcelo  
LinkedIn: https://www.linkedin.com/in/ruan-marcelo  
Instagram: https://www.instagram.com/ruan.luzzz
