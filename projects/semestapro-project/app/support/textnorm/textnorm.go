// Package textnorm normalizes text for slugs and search (docs/SCHEMA.md §7.3).
package textnorm

import (
	"strings"
	"unicode"
)

var accentMap = map[rune]string{
	'à': "a", 'á': "a", 'â': "a", 'ä': "a", 'ã': "a", 'å': "a", 'ā': "a",
	'è': "e", 'é': "e", 'ê': "e", 'ë': "e", 'ē': "e",
	'ì': "i", 'í': "i", 'î': "i", 'ï': "i", 'ī': "i",
	'ò': "o", 'ó': "o", 'ô': "o", 'ö': "o", 'õ': "o", 'ō': "o",
	'ù': "u", 'ú': "u", 'û': "u", 'ü': "u", 'ū': "u",
	'ñ': "n", 'ç': "c", 'ß': "ss", 'ý': "y", 'ÿ': "y",
}

// Unaccent lowercases s and strips common diacritics.
func Unaccent(s string) string {
	var b strings.Builder
	for _, r := range strings.ToLower(s) {
		if rep, ok := accentMap[r]; ok {
			b.WriteString(rep)
			continue
		}
		b.WriteRune(r)
	}
	return b.String()
}

// Slugify converts s into a lowercase ASCII kebab-case slug of at most maxLen
// bytes, cut on a word boundary when possible. Returns "" when nothing remains.
func Slugify(s string, maxLen int) string {
	var b strings.Builder
	lastDash := true
	for _, r := range Unaccent(s) {
		switch {
		case r < unicode.MaxASCII && (unicode.IsLetter(r) || unicode.IsDigit(r)):
			b.WriteRune(r)
			lastDash = false
		default:
			if !lastDash {
				b.WriteByte('-')
				lastDash = true
			}
		}
	}
	out := strings.Trim(b.String(), "-")
	if maxLen > 0 && len(out) > maxLen {
		out = out[:maxLen]
		if i := strings.LastIndexByte(out, '-'); i > maxLen/2 {
			out = out[:i]
		}
		out = strings.Trim(out, "-")
	}
	return out
}

// Search limits (docs/PRD.md FR-SRC-02).
const (
	MaxQueryLen = 100
	MaxTokens   = 8
	MinTokenLen = 2
)

// SearchTokens splits a user query into normalized tokens: lowercase, unaccented,
// each at least MinTokenLen runes, at most MaxTokens tokens, query cut at MaxQueryLen runes.
func SearchTokens(q string) []string {
	r := []rune(strings.TrimSpace(q))
	if len(r) > MaxQueryLen {
		r = r[:MaxQueryLen]
	}
	var out []string
	for _, f := range strings.Fields(Unaccent(string(r))) {
		if len([]rune(f)) < MinTokenLen {
			continue
		}
		out = append(out, f)
		if len(out) == MaxTokens {
			break
		}
	}
	return out
}

// EscapeLike escapes %, _ and \ for use with LIKE ... ESCAPE '\'.
func EscapeLike(s string) string {
	return strings.NewReplacer(`\`, `\\`, `%`, `\%`, `_`, `\_`).Replace(s)
}

// CollapseSpaces trims s and reduces runs of whitespace to a single space.
func CollapseSpaces(s string) string { return strings.Join(strings.Fields(s), " ") }
