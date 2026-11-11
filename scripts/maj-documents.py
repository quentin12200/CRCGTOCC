#!/usr/bin/env python3
"""Met à jour les documents téléchargeables du site.

1. Pour chaque document Word (.docx) lié depuis une page, crée ou rafraîchit
   la version PDF à côté (LibreOffice requis : commande « soffice »).
2. Écrit assets/documents-meta.js : format et poids de chaque document lié,
   utilisés par assets/documents.js pour afficher « Word · 98 Ko » et le
   lien PDF à côté de chaque lien.

Usage, depuis la racine du dépôt :  python3 scripts/maj-documents.py
"""
import glob
import json
import os
import re
import shutil
import subprocess
import sys
from urllib.parse import unquote

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXTS = ('.docx', '.pdf', '.pptx', '.xlsx', '.odt')


def pages():
    for f in glob.glob(os.path.join(RACINE, '**', '*.html'), recursive=True):
        if '/node_modules/' in f or '/documents/archive' in f:
            continue
        yield f


def liens_documents():
    """Chemins (relatifs à la racine) des documents liés depuis les pages."""
    trouves = set()
    for page in pages():
        txt = open(page, encoding='utf-8', errors='ignore').read()
        for href in re.findall(r'href="([^"#?]+)"', txt):
            if not href.lower().endswith(EXTS) or href.startswith(('http:', 'https:')):
                continue
            href = unquote(href)
            if href.startswith('/'):
                chemin = os.path.normpath(href.lstrip('/'))
            else:
                chemin = os.path.normpath(os.path.relpath(os.path.join(os.path.dirname(page), href), RACINE))
            if os.path.exists(os.path.join(RACINE, chemin)):
                trouves.add(chemin)
    return sorted(trouves)


def convertir_pdf(docx):
    src = os.path.join(RACINE, docx)
    pdf = src[:-5] + '.pdf'
    if os.path.exists(pdf) and os.path.getmtime(pdf) >= os.path.getmtime(src):
        return
    if not shutil.which('soffice'):
        print('  (soffice absent : PDF non généré pour', docx, ')')
        return
    subprocess.run(['soffice', '--headless', '--convert-to', 'pdf', '--outdir', os.path.dirname(src), src],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=180)
    print('  PDF créé :', os.path.relpath(pdf, RACINE))


def main():
    docs = liens_documents()
    for d in docs:
        if d.lower().endswith('.docx'):
            convertir_pdf(d)
    meta = {}
    for d in docs + [d[:-5] + '.pdf' for d in docs if d.lower().endswith('.docx')]:
        p = os.path.join(RACINE, d)
        if os.path.exists(p):
            meta['/' + d.replace(os.sep, '/')] = os.path.getsize(p)
    sortie = os.path.join(RACINE, 'assets', 'documents-meta.js')
    with open(sortie, 'w', encoding='utf-8') as f:
        f.write('/* Généré par scripts/maj-documents.py — ne pas modifier à la main */\n')
        f.write('window.CGT_DOCS = ' + json.dumps(meta, ensure_ascii=False, indent=1, sort_keys=True) + ';\n')
    print(len(meta), 'documents décrits dans assets/documents-meta.js')


if __name__ == '__main__':
    sys.exit(main())
