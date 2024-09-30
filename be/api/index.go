package handler

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/supabase-community/postgrest-go"
	"github.com/supabase-community/supabase-go"
)

// Create a Gin engine instance
var engine = gin.New()
var supabaseUrl = os.Getenv("SUPABASE_URL")
var supabaseKey = os.Getenv("SUPABASE_KEY")
var supabaseClient *supabase.Client

type Article struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Subtitle  string `json:"subtitle"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
	Section   string `json:"section"`
}

func init() {

	var err error
	supabaseClient, err = supabase.NewClient(supabaseUrl, supabaseKey, nil)
	if err != nil {
		log.Fatalf("Error initializing Supabase client: %v", err)
	}

	// url: https://mvp-be.vercel.app/hello
	engine.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, Vercel!",
		})
	})
	// url: https://mvp-be.vercel.app/greet?name=Charles
	engine.GET("/greet", func(c *gin.Context) {
		name := c.DefaultQuery("name", "Guest")
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, " + name + "!",
		})
	})

	// url: https://mvp-be.vercel.app/articles
	engine.GET("/articles", func(c *gin.Context) {
		var articles []Article
		_, err := supabaseClient.From("articles").
			Select("id, title, subtitle, content, created_at, section", "", false).
			Order("section", &postgrest.OrderOpts{Ascending: true}).
			ExecuteTo(&articles)
		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching articles"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data":  articles,
			"error": nil,
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
