include .env
export

MIGRATE=migrate -path migrations -database "$(DATABASE_URL)"

.PHONY: run test sqlc migrate-up migrate-down

run:
	go run ./cmd/api

test:
	go test ./...

sqlc:
	sqlc generate

migrate-up:
	$(MIGRATE) up

migrate-down:
	$(MIGRATE) down 1
