from __future__ import annotations

import os
from pathlib import Path
import re

ROOT = Path('.')
TARGET = Path('assets/images/favicons/favicon.png')

REL_RE = re.compile(r'rel\s*=\s*(["\'])(.*?)\1', re.IGNORECASE)


def rel_href_for(file_path: Path) -> str:
    rel_path = os.path.relpath(TARGET, file_path.parent)
    return Path(rel_path).as_posix()


def should_remove(line: str) -> bool:
    if '<link' not in line.lower():
        return False
    match = REL_RE.search(line)
    if not match:
        return False
    rel_value = match.group(2).lower()
    if 'icon' not in rel_value:
        return False
    if 'apple-touch' in rel_value:
        return False
    return True


def update_file(path: Path) -> bool:
    text = path.read_text()
    lines = text.splitlines()
    new_lines: list[str] = []
    insertion_index: int | None = None
    indent: str | None = None
    removed_any = False

    for line in lines:
        if should_remove(line):
            removed_any = True
            if insertion_index is None:
                insertion_index = len(new_lines)
                indent = line[: len(line) - len(line.lstrip())]
            continue
        new_lines.append(line)

    rel_href = rel_href_for(path)

    if indent is None:
        indent = '    '
    if insertion_index is None:
        for idx, line in enumerate(new_lines):
            if '</head>' in line.lower():
                insertion_index = idx
                break
        if insertion_index is None:
            insertion_index = len(new_lines)

    block = [
        f"{indent}<link rel=\"icon\" type=\"image/png\" href=\"{rel_href}\">",
        f"{indent}<link rel=\"shortcut icon\" type=\"image/png\" href=\"{rel_href}\">",
    ]

    new_lines[insertion_index:insertion_index] = block

    if new_lines == lines:
        return False

    path.write_text('\n'.join(new_lines) + '\n')
    return True


def main() -> None:
    changed = 0
    for html_file in ROOT.rglob('*.html'):
        if update_file(html_file):
            changed += 1
    print(f"Updated favicons in {changed} files")


if __name__ == '__main__':
    main()
