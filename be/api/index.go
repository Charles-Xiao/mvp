package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// Create a Gin engine instance
var engine = gin.New()

func init() {
	// Define your routes here
	engine.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, Vercel!",
		})
	})

	engine.GET("/greet", func(c *gin.Context) {
		name := c.DefaultQuery("name", "Guest")
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, " + name + "!",
		})
	})

	// Handle 404 Not Found
	engine.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Not Found",
		})
	})
}

// Handle is the entry point for Vercel Serverless Functions
func Handle(w http.ResponseWriter, r *http.Request) {
	engine.ServeHTTP(w, r)
}
