package kpr

import (
	"errors"
	"testing"
)

func TestCalculateVectors(t *testing.T) {
	// Vectors are shared with docs/ARCHITECTURE.md §13 and public/js/modules/kpr.js.
	tests := []struct {
		name  string
		in    Input
		month int64
		dp    int64
	}{
		{"850jt dp20 7.5% 15th", Input{850_000_000, 20, 7.5, 180}, 6_303_685, 170_000_000},
		{"500jt dp10 9% 20th", Input{500_000_000, 10, 9, 240}, 4_048_767, 50_000_000},
		{"1.25M dp30 6.25% 10th", Input{1_250_000_000, 30, 6.25, 120}, 9_824_509, 375_000_000},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got, err := Calculate(tc.in)
			if err != nil {
				t.Fatal(err)
			}
			if got.Monthly != tc.month {
				t.Errorf("Monthly = %d, want %d", got.Monthly, tc.month)
			}
			if got.DownPayment != tc.dp {
				t.Errorf("DownPayment = %d, want %d", got.DownPayment, tc.dp)
			}
			if got.Principal != tc.in.Price-tc.dp {
				t.Errorf("Principal = %d", got.Principal)
			}
			if got.Total != got.Monthly*int64(tc.in.TenorMonths) {
				t.Errorf("Total = %d", got.Total)
			}
		})
	}
}

func TestCalculateErrors(t *testing.T) {
	base := Input{850_000_000, 20, 7.5, 180}
	tests := []struct {
		name string
		mut  func(*Input)
		want error
	}{
		{"zero rate", func(i *Input) { i.AnnualRatePercent = 0 }, ErrInvalidRate},
		{"negative rate", func(i *Input) { i.AnnualRatePercent = -1 }, ErrInvalidRate},
		{"rate too high", func(i *Input) { i.AnnualRatePercent = 30.01 }, ErrRateTooHigh},
		{"dp 100", func(i *Input) { i.DPPercent = 100 }, ErrInvalidDP},
		{"dp negative", func(i *Input) { i.DPPercent = -5 }, ErrInvalidDP},
		{"price zero", func(i *Input) { i.Price = 0 }, ErrInvalidPrice},
		{"tenor short", func(i *Input) { i.TenorMonths = 11 }, ErrInvalidTenor},
		{"tenor long", func(i *Input) { i.TenorMonths = 361 }, ErrInvalidTenor},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			in := base
			tc.mut(&in)
			if _, err := Calculate(in); !errors.Is(err, tc.want) {
				t.Fatalf("err = %v, want %v", err, tc.want)
			}
		})
	}
}

func TestZeroDownPaymentAllowed(t *testing.T) {
	got, err := Calculate(Input{300_000_000, 0, 8, 120})
	if err != nil || got.DownPayment != 0 || got.Principal != 300_000_000 {
		t.Fatalf("got %+v, err %v", got, err)
	}
}
