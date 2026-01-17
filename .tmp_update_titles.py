from pathlib import Path

root = Path('.').resolve()
html_files = list(root.glob('*.html')) + list((root / 'pages').rglob('*.html'))

overrides = {
    'index': 'Home',
    'about': 'About',
    'programs': 'Programs',
    'projects': 'Projects',
    'contact': 'Contact',
}


def format_name(stem: str) -> str:
    if stem in overrides:
        return overrides[stem]
    base = stem.replace('_', ' ').replace('-', ' ')
    spaced_digits = []
    for idx, char in enumerate(base):
        if char.isdigit() and idx > 0 and not base[idx - 1].isspace():
            spaced_digits.append(' ')
        spaced_digits.append(char)
    cleaned = ''.join(spaced_digits)
    cleaned = ' '.join(cleaned.split())
    return cleaned.title() if cleaned else 'Osagyefo Ampem Foundation'


def update_title(path: Path) -> bool:
    text = path.read_text()
    lower = text.lower()
    start = lower.find('<title>')
    if start == -1:
        return False
    end = lower.find('</title>', start)
    if end == -1:
        return False
    end += len('</title>')
    new_fragment = f"<title>{format_name(path.stem)} | Osagyefo Ampem Foundation</title>"
    new_text = text[:start] + new_fragment + text[end:]
    if new_text == text:
        return False
    path.write_text(new_text)
    return True


updated = sum(update_title(path) for path in html_files)
print(f"Updated titles in {updated} files")
