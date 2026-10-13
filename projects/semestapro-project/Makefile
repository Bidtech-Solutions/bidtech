# Semesta Pro — see AGENTS.md §4. Portable: works with GNU make on Windows
# (PowerShell/cmd, no sh needed), macOS and Linux. Only go/gofmt/curl-free tools are used.
TAILWIND_VERSION ?= v4.1.13
GOLANGCI_LINT ?= golangci-lint

ifeq ($(OS),Windows_NT)
  TAILWIND := tools/tailwindcss.exe
else
  TAILWIND := tools/tailwindcss
endif

# -race needs cgo (a C compiler). Enable it only when cgo is available.
RACE := $(if $(filter 1,$(shell go env CGO_ENABLED)),-race,)

.PHONY: dev css css-watch tools test lint fmt build

dev: css ## build CSS once, then run air (hot reload). In a 2nd terminal: make css-watch
	air -c .air.toml

css: tools ## build CSS once (minified)
	$(TAILWIND) -i resources/css/app.css -o public/css/app.css --minify

css-watch: tools
	$(TAILWIND) -i resources/css/app.css -o public/css/app.css --watch

tools: $(TAILWIND)

$(TAILWIND):
	go run scripts/fetch_tailwind.go $(TAILWIND_VERSION)

test:
	go test ./... $(RACE) -count=1

lint:
	$(if $(strip $(shell gofmt -l .)),$(error gofmt needed on: $(shell gofmt -l .)),)
	go vet ./...
	$(GOLANGCI_LINT) run

fmt:
	gofmt -w .

build: css
	go build -trimpath -ldflags="-s -w" -o bin/semestapro .
