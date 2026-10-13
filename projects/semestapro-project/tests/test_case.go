package tests

import (
	"github.com/goravel/framework/testing"

	"semestapro/bootstrap"
)

func init() {
	bootstrap.Boot()
}

type TestCase struct {
	testing.TestCase
}
