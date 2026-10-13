//go:build ignore

// Downloads the Tailwind CSS standalone CLI for the current OS/arch into tools/.
// Usage: go run scripts/fetch_tailwind.go <version>   (works on Windows, macOS, Linux)
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"runtime"
)

func main() {
	version := "v4.1.13"
	if len(os.Args) > 1 {
		version = os.Args[1]
	}
	osName := map[string]string{"windows": "windows", "darwin": "macos", "linux": "linux"}[runtime.GOOS]
	arch := map[string]string{"amd64": "x64", "arm64": "arm64"}[runtime.GOARCH]
	if osName == "" || arch == "" {
		fmt.Fprintf(os.Stderr, "unsupported platform %s/%s\n", runtime.GOOS, runtime.GOARCH)
		os.Exit(1)
	}
	name, out := "tailwindcss-"+osName+"-"+arch, "tools/tailwindcss"
	if runtime.GOOS == "windows" {
		name += ".exe"
		out += ".exe"
	}
	url := "https://github.com/tailwindlabs/tailwindcss/releases/download/" + version + "/" + name

	if err := os.MkdirAll("tools", 0o755); err != nil {
		fail(err)
	}
	resp, err := http.Get(url)
	if err != nil {
		fail(err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		fail(fmt.Errorf("GET %s: %s", url, resp.Status))
	}
	f, err := os.OpenFile(out, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0o755)
	if err != nil {
		fail(err)
	}
	if _, err := io.Copy(f, resp.Body); err != nil {
		fail(err)
	}
	if err := f.Close(); err != nil {
		fail(err)
	}
	fmt.Println("downloaded", out)
}

func fail(err error) {
	fmt.Fprintln(os.Stderr, err)
	os.Exit(1)
}
