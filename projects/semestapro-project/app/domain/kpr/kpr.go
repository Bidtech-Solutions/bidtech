// Package kpr computes KPR (mortgage) installment simulations with a fixed-rate
// annuity. The same formula is mirrored in public/js/modules/kpr.js.
// See docs/PRD.md §6.4.2.
package kpr

import (
	"errors"
	"math"
)

// Validation errors; messages are shown to users as-is (Indonesian).
var (
	ErrInvalidPrice  = errors.New("Harga properti tidak valid.")
	ErrInvalidDP     = errors.New("Uang muka harus antara 0% dan kurang dari 100%.")
	ErrInvalidRate   = errors.New("Suku bunga harus lebih dari 0%.")
	ErrRateTooHigh   = errors.New("Suku bunga maksimal 30%.")
	ErrInvalidTenor  = errors.New("Jangka waktu harus antara 12 dan 360 bulan.")
	ErrTenorNotWhole = errors.New("Jangka waktu harus berupa bilangan bulat (bulan).")
)

const (
	MaxRatePercent = 30.0
	MinTenorMonths = 12
	MaxTenorMonths = 360
)

// Input is the user-adjustable simulation input.
type Input struct {
	Price             int64   // rupiah
	DPPercent         float64 // 0 <= dp < 100
	AnnualRatePercent float64 // > 0 and <= 30
	TenorMonths       int     // 12..360
}

// Result holds amounts in whole rupiah.
type Result struct {
	DownPayment int64
	Principal   int64
	Monthly     int64 // rounded up to the next rupiah
	Total       int64 // Monthly * TenorMonths
}

// Calculate validates in and returns the simulation. A rate of 0 is an error
// because the annuity formula divides by the rate.
func Calculate(in Input) (Result, error) {
	switch {
	case in.Price <= 0:
		return Result{}, ErrInvalidPrice
	case math.IsNaN(in.DPPercent) || in.DPPercent < 0 || in.DPPercent >= 100:
		return Result{}, ErrInvalidDP
	case math.IsNaN(in.AnnualRatePercent) || in.AnnualRatePercent <= 0:
		return Result{}, ErrInvalidRate
	case in.AnnualRatePercent > MaxRatePercent:
		return Result{}, ErrRateTooHigh
	case in.TenorMonths < MinTenorMonths || in.TenorMonths > MaxTenorMonths:
		return Result{}, ErrInvalidTenor
	}

	dp := int64(math.Round(float64(in.Price) * in.DPPercent / 100))
	principal := in.Price - dp
	r := in.AnnualRatePercent / 100 / 12
	n := float64(in.TenorMonths)
	monthly := int64(math.Ceil(float64(principal) * r / (1 - math.Pow(1+r, -n))))

	return Result{
		DownPayment: dp,
		Principal:   principal,
		Monthly:     monthly,
		Total:       monthly * int64(in.TenorMonths),
	}, nil
}
