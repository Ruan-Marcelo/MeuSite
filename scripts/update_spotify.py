import base64
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


API_BASE = "https://api.spotify.com/v1"
OUTPUT_PATH = Path("data/spotify.json")


def require_env(name):
    value = os.getenv(name)
    if not value:
      print(f"Missing required environment variable: {name}", file=sys.stderr)
      sys.exit(1)
    return value


def request_json(url, headers=None, data=None):
    request = urllib.request.Request(url, headers=headers or {}, data=data)

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        print(f"Spotify request failed: {error.code} {body}", file=sys.stderr)
        raise


def request_json_or_none(url, headers=None):
    request = urllib.request.Request(url, headers=headers or {})

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            if response.status == 204:
                return None

            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        if error.code in {204, 403, 404}:
            return None

        body = error.read().decode("utf-8", errors="replace")
        print(f"Spotify request failed: {error.code} {body}", file=sys.stderr)
        raise


def get_access_token():
    client_id = require_env("SPOTIFY_CLIENT_ID")
    client_secret = require_env("SPOTIFY_CLIENT_SECRET")
    refresh_token = require_env("SPOTIFY_REFRESH_TOKEN")

    credentials = f"{client_id}:{client_secret}".encode("utf-8")
    encoded_credentials = base64.b64encode(credentials).decode("ascii")
    payload = urllib.parse.urlencode(
        {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        }
    ).encode("utf-8")

    data = request_json(
        "https://accounts.spotify.com/api/token",
        headers={
            "Authorization": f"Basic {encoded_credentials}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data=payload,
    )

    return data["access_token"]


def get_top_items(access_token, item_type):
    query = urllib.parse.urlencode(
        {
            "time_range": "medium_term",
            "limit": 10,
        }
    )

    data = request_json(
        f"{API_BASE}/me/top/{item_type}?{query}",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    return data.get("items", [])


def simplify_track(track):
    album_images = track.get("album", {}).get("images", [])

    return {
        "name": track.get("name"),
        "artists": [artist.get("name") for artist in track.get("artists", [])],
        "url": track.get("external_urls", {}).get("spotify"),
        "image": album_images[0]["url"] if album_images else None,
    }


def get_currently_playing(access_token):
    data = request_json_or_none(
        f"{API_BASE}/me/player/currently-playing",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    if not data or not data.get("is_playing") or data.get("currently_playing_type") != "track":
        return None

    item = data.get("item")

    if not item:
        return None

    track = simplify_track(item)
    track["progress_ms"] = data.get("progress_ms")
    track["duration_ms"] = item.get("duration_ms")

    return track


def simplify_artist(artist):
    images = artist.get("images", [])

    return {
        "name": artist.get("name"),
        "genres": artist.get("genres", [])[:3],
        "url": artist.get("external_urls", {}).get("spotify"),
        "image": images[0]["url"] if images else None,
    }


def main():
    access_token = get_access_token()
    tracks = [simplify_track(track) for track in get_top_items(access_token, "tracks")]
    artists = [simplify_artist(artist) for artist in get_top_items(access_token, "artists")]
    currently_playing = get_currently_playing(access_token)

    payload = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "time_range": "medium_term",
        "currently_playing": currently_playing,
        "tracks": tracks,
        "artists": artists,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
