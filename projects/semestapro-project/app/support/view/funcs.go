// Package view provides the template FuncMap shared by every .tmpl view. It only
// formats values; business logic belongs in services and view models.
package view

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"semestapro/app/support/format"
	"semestapro/app/support/whatsapp"
)

// Deps are the runtime values the helpers need. Functions are used so that config
// is read lazily (config is not ready when the FuncMap is built).
type Deps struct {
	MediaURL      func() string
	PublicDir     string
	WhatsAppPhone func() string
}

// Funcs builds the template FuncMap.
func Funcs(d Deps) template.FuncMap {
	assets := &assetCache{dir: d.PublicDir, hashes: map[string]string{}}

	return template.FuncMap{
		"rupiah":      format.Rupiah,
		"rupiahShort": format.RupiahShort,
		"area":        format.Area,
		"percent":     format.Percent,
		"dateID":      func(t time.Time) string { return format.DateID(t) },
		"dateTimeID":  func(t time.Time) string { return format.DateTimeID(t) },
		"phoneID":     format.PhoneDisplay,

		// asset returns /static/<path>?v=<content hash> for cache busting.
		"asset": assets.url,
		// media returns the public URL of an object in the photo bucket.
		"media": func(key string) string {
			if d.MediaURL == nil {
				return "/" + strings.TrimLeft(key, "/")
			}
			return strings.TrimRight(d.MediaURL(), "/") + "/" + strings.TrimLeft(key, "/")
		},
		"waLink": func(message string) string {
			phone := ""
			if d.WhatsAppPhone != nil {
				phone = d.WhatsAppPhone()
			}
			return whatsapp.Link(phone, message)
		},
		// jsonLD marshals v for an application/ld+json script. "<" is escaped so the
		// payload can never close the script element.
		"jsonLD": func(v any) (template.JS, error) {
			b, err := json.Marshal(v)
			if err != nil {
				return "", fmt.Errorf("view.jsonLD: %w", err)
			}
			return template.JS(strings.ReplaceAll(string(b), "<", `<`)), nil
		},
		// nl2p turns plain text into escaped <p> paragraphs; blank lines split paragraphs
		// and single newlines become <br>.
		"nl2p": nl2p,

		"dict": dict,
		"list": func(v ...any) []any { return v },
		"add":  func(a, b int) int { return a + b },
		"sub":  func(a, b int) int { return a - b },
		"seq": func(from, to int) []int {
			if to < from {
				return nil
			}
			out := make([]int, 0, to-from+1)
			for i := from; i <= to; i++ {
				out = append(out, i)
			}
			return out
		},
	}
}

func dict(kv ...any) (map[string]any, error) {
	if len(kv)%2 != 0 {
		return nil, fmt.Errorf("view.dict: odd number of arguments")
	}
	m := make(map[string]any, len(kv)/2)
	for i := 0; i < len(kv); i += 2 {
		k, ok := kv[i].(string)
		if !ok {
			return nil, fmt.Errorf("view.dict: key %v is not a string", kv[i])
		}
		m[k] = kv[i+1]
	}
	return m, nil
}

func nl2p(s string) template.HTML {
	s = strings.ReplaceAll(strings.TrimSpace(s), "\r\n", "\n")
	if s == "" {
		return ""
	}
	var b strings.Builder
	for _, para := range strings.Split(s, "\n\n") {
		para = strings.TrimSpace(para)
		if para == "" {
			continue
		}
		b.WriteString("<p>")
		b.WriteString(strings.ReplaceAll(template.HTMLEscapeString(para), "\n", "<br>"))
		b.WriteString("</p>")
	}
	return template.HTML(b.String())
}

type assetCache struct {
	dir    string
	mu     sync.RWMutex
	hashes map[string]string
}

func (c *assetCache) url(path string) string {
	path = strings.TrimLeft(path, "/")
	c.mu.RLock()
	h, ok := c.hashes[path]
	c.mu.RUnlock()
	if !ok {
		h = fileHash(filepath.Join(c.dir, filepath.FromSlash(path)))
		c.mu.Lock()
		c.hashes[path] = h
		c.mu.Unlock()
	}
	if h == "" {
		return "/static/" + path
	}
	return "/static/" + path + "?v=" + h
}

// fileHash returns the first 10 hex chars of the file's SHA-256, or "" if unreadable.
func fileHash(p string) string {
	b, err := os.ReadFile(p)
	if err != nil {
		return ""
	}
	sum := sha256.Sum256(b)
	return hex.EncodeToString(sum[:])[:10]
}
