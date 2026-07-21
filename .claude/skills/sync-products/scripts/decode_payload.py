#!/usr/bin/env python3
"""
Decode hex/base64 binary payloads that a browser javascript_tool fetch()
returned, WITHOUT the calling agent ever retyping the payload by hand.

Why this exists: when an agent copies a long hex/base64 string from a tool
result into a new Write call, long-string transcription silently drops or
alters characters (observed: a 38,516-char base64 string lost exactly one
character on retype, corrupting the decoded image with no error until
someone tried to open it). The fix is to never let the payload pass through
the agent's own generated output — read it out of the file the harness
already saved to disk, and decode it in a script.

Two modes:

1. Single payload, already auto-saved to a tool-results/*.txt file:
     python decode_payload.py <tool_result.json> --out photo.jpg

2. Multiple payloads fetched in one JS call, using marker tokens (see
   SKILL.md for why marker tokens matter and how to phrase the JS):
     python decode_payload.py <tool_result.json> \
       --marker FRONT:photo-front.jpg \
       --marker BACK:photo-back.jpg

Add --encoding base64 if the JS used btoa()/base64 instead of hex (hex is
recommended -- see SKILL.md for why).
"""
import argparse
import base64
import json
import re
import sys


def load_text(path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data[0]["text"]


def decode(payload, encoding):
    if encoding == "hex":
        return bytes.fromhex(payload)
    return base64.b64decode(payload)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("result_file", help="Path to the tool-results/*.txt JSON file")
    parser.add_argument("--out", help="Output path (single-payload mode)")
    parser.add_argument("--encoding", default="hex", choices=["hex", "base64"])
    parser.add_argument(
        "--marker",
        action="append",
        default=[],
        help="NAME:outfile -- expects NAME|<payload>|NAMEEND somewhere in the text. Repeatable.",
    )
    args = parser.parse_args()

    text = load_text(args.result_file)

    if args.marker:
        for m in args.marker:
            if ":" not in m:
                parser.error(f"--marker must be NAME:outfile, got {m!r}")
            name, outfile = m.split(":", 1)
            pattern = re.compile(re.escape(name) + r"\|([0-9a-fA-F]+)\|" + re.escape(name) + r"END")
            match = pattern.search(text)
            if not match:
                print(f"WARNING: marker {name!r} not found in {args.result_file}", file=sys.stderr)
                continue
            raw = decode(match.group(1), args.encoding)
            with open(outfile, "wb") as f:
                f.write(raw)
            print(f"{name}: {len(raw)} bytes -> {outfile}")
        return

    if not args.out:
        parser.error("--out is required when not using --marker")

    # The saved "text" field is often the JS return value re-escaped as a
    # JSON string (so it starts/ends with a literal quote) with trailing
    # junk appended after it (e.g. "\n\n(captured at origin ...)" or a
    # Tab Context block) -- anchor the match to the actual payload charset
    # rather than trusting the whole field.
    match = re.match(r'^"?([0-9a-fA-F]+)"?', text.strip())
    if not match:
        print(f"Could not find a hex payload at the start of {args.result_file}", file=sys.stderr)
        print(f"First 120 chars were: {text[:120]!r}", file=sys.stderr)
        sys.exit(1)

    raw = decode(match.group(1), args.encoding)
    with open(args.out, "wb") as f:
        f.write(raw)
    print(f"{len(raw)} bytes -> {args.out}")


if __name__ == "__main__":
    main()
