import base64
import json
import os
import secrets
import urllib.parse
import urllib.request
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer


REDIRECT_URI = "http://127.0.0.1:8888/callback"
SCOPES = "user-top-read user-read-currently-playing"


def require_env(name):
    value = os.getenv(name)
    if not value:
        raise SystemExit(f"Defina {name} antes de rodar o script.")
    return value


class CallbackHandler(BaseHTTPRequestHandler):
    code = None
    state = None

    def log_message(self, format, *args):
        return

    def do_GET(self):
        params = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        CallbackHandler.code = params.get("code", [None])[0]
        CallbackHandler.state = params.get("state", [None])[0]

        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(
            "Autorizado. Pode voltar para o terminal.".encode("utf-8")
        )


def request_token(client_id, client_secret, code):
    credentials = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    payload = urllib.parse.urlencode(
        {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": REDIRECT_URI,
        }
    ).encode()

    request = urllib.request.Request(
        "https://accounts.spotify.com/api/token",
        data=payload,
        headers={
            "Authorization": f"Basic {credentials}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    )

    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def main():
    client_id = require_env("SPOTIFY_CLIENT_ID")
    client_secret = require_env("SPOTIFY_CLIENT_SECRET")
    state = secrets.token_urlsafe(16)
    query = urllib.parse.urlencode(
        {
            "client_id": client_id,
            "response_type": "code",
            "redirect_uri": REDIRECT_URI,
            "scope": SCOPES,
            "state": state,
        }
    )
    auth_url = f"https://accounts.spotify.com/authorize?{query}"

    print("Abrindo login do Spotify...")
    print(auth_url)
    webbrowser.open(auth_url)

    server = HTTPServer(("127.0.0.1", 8888), CallbackHandler)
    server.handle_request()

    if CallbackHandler.state != state:
        raise SystemExit("State invalido. Tente novamente.")

    if not CallbackHandler.code:
        raise SystemExit("Nao foi possivel capturar o codigo de autorizacao.")

    token_data = request_token(client_id, client_secret, CallbackHandler.code)
    refresh_token = token_data.get("refresh_token")

    if not refresh_token:
        raise SystemExit("Spotify nao retornou refresh_token.")

    print("\nSPOTIFY_REFRESH_TOKEN:")
    print(refresh_token)


if __name__ == "__main__":
    main()
