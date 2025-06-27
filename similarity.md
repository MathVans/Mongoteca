# Similaridade entre Leitores - Mongoteca

## Visão Geral

Neste sistema de biblioteca, os leitores podem visualizar outros leitores com gostos semelhantes aos seus. A similaridade é calculada automaticamente com base nos livros, autores e gêneros favoritos de cada leitor, utilizando o índice de Jaccard.

---

## Como funciona a Similaridade

- **Favoritos**: Cada leitor pode marcar livros, autores e gêneros como favoritos.
- **Cálculo**: Para cada par de leitores, é calculada a similaridade entre seus conjuntos de favoritos.
- **Índice de Jaccard**: Mede a proporção de itens em comum entre dois leitores em relação ao total de itens distintos.

### Fórmula

```
similaridade = (número de favoritos em comum) / (número total de favoritos distintos)
```

### Exemplo

- Leitor A: favoritos = [Livro 1, Livro 2, Livro 3]
- Leitor B: favoritos = [Livro 2, Livro 3, Livro 4]
- Interseção: [Livro 2, Livro 3] (2 itens)
- União: [Livro 1, Livro 2, Livro 3, Livro 4] (4 itens)
- Similaridade = 2 / 4 = 0.5

---

## Como será implementado

1. **Modelos**: Os leitores terão arrays de favoritos (livros, autores, gêneros).
2. **Endpoint**: Um endpoint `/readers/:id/similar` retorna os leitores mais parecidos com o usuário.
3. **Processo**:
   - Buscar os favoritos do leitor.
   - Comparar com os favoritos dos outros leitores.
   - Calcular o índice de Jaccard para cada par.
   - Retornar uma lista ordenada dos leitores mais semelhantes.

---

## Benefícios

- Ajuda leitores a encontrar pessoas com gostos parecidos.
- Facilita recomendações e interações na plataforma.

---