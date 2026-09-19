package httpx

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type errorBody struct {
	Code    string            `json:"code"`
	Message string            `json:"message"`
	Fields  map[string]string `json:"fields,omitempty"`
}

type errorEnvelope struct {
	Error errorBody `json:"error"`
}

func writeError(c *gin.Context, status int, code, message string, fields map[string]string) {
	c.JSON(status, errorEnvelope{
		Error: errorBody{
			Code:    code,
			Message: message,
			Fields:  fields,
		},
	})
}

func ValidationError(c *gin.Context, fields map[string]string) {
	writeError(c, http.StatusBadRequest, "VALIDATION_ERROR", "Some fields need attention.", fields)
}

func Unauthenticated(c *gin.Context) {
	writeError(c, http.StatusUnauthorized, "UNAUTHENTICATED", "You must be logged in.", nil)
}

func EmailNotVerified(c *gin.Context) {
	writeError(c, http.StatusForbidden, "EMAIL_NOT_VERIFIED", "Please verify your email address.", nil)
}

func ForbiddenOrigin(c *gin.Context) {
	writeError(c, http.StatusForbidden, "FORBIDDEN_ORIGIN", "Request origin not allowed.", nil)
}

func NotFound(c *gin.Context) {
	writeError(c, http.StatusNotFound, "NOT_FOUND", "The requested resource was not found.", nil)
}

func Conflict(c *gin.Context, message string) {
	writeError(c, http.StatusConflict, "CONFLICT", message, nil)
}

func TokenExpired(c *gin.Context) {
	writeError(c, http.StatusGone, "TOKEN_EXPIRED", "This link has expired or already been used.", nil)
}

func RateLimited(c *gin.Context) {
	writeError(c, http.StatusTooManyRequests, "RATE_LIMITED", "Too many requests. Please slow down.", nil)
}

func InternalError(c *gin.Context) {
	writeError(c, http.StatusInternalServerError, "INTERNAL", "Something went wrong. Please try again.", nil)
}
