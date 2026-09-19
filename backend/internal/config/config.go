package config

import (
	"fmt"
	"os"
)

type Config struct {
	DatabaseURL  string
	Port         string
	Env          string
	AppURL       string
	ResendAPIKey string
}

func Load() (*Config, error) {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	env := os.Getenv("ENV")
	if env == "" {
		env = "development"
	}

	return &Config{
		DatabaseURL:  dbURL,
		Port:         port,
		Env:          env,
		AppURL:       os.Getenv("APP_URL"),
		ResendAPIKey: os.Getenv("RESEND_API_KEY"),
	}, nil
}
