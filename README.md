# Registro Mental

Aplicativo web local para diário, medicação, sono, compras e análises pessoais. Os registros ficam no IndexedDB do próprio navegador.

## Ambientes publicados

- [App Oficial](https://viniciusnevesdev.github.io/Registro-mental/) — release `1.2.0`, banco `registro-mental-v1`
- [App Beta](https://viniciusnevesdev.github.io/Registro-mental/beta/) — release `1.2.0-beta.14`, banco isolado `registro-mental-beta-v1`
- [Menu geral](https://viniciusnevesdev.github.io/Registro-mental/menu.html)
- [Central de diagnóstico](https://viniciusnevesdev.github.io/Registro-mental/diagnostico/)

## Desenvolvimento

- [Repositório](https://github.com/viniciusnevesdev/Registro-mental)
- [Commits](https://github.com/viniciusnevesdev/Registro-mental/commits/main)
- [Branches](https://github.com/viniciusnevesdev/Registro-mental/branches)
- [GitHub Actions](https://github.com/viniciusnevesdev/Registro-mental/actions)
- [Issues](https://github.com/viniciusnevesdev/Registro-mental/issues)

O `main` contém os dois ambientes que o GitHub Pages publica. A validação automática confere sintaxe, módulos incorporados, versões, manifests, isolamento dos bancos e links internos. Nenhuma rotina de atualização deve apagar IndexedDB ou localStorage.
